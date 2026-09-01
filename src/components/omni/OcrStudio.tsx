import { useEffect, useRef, useState } from "react";
import { Camera, Copy, Download, Loader2, RotateCcw, ScanText } from "lucide-react";
import { toast } from "sonner";
import { Dropzone } from "./Dropzone";
import { PillButton } from "./primitives";

type Worker = Awaited<ReturnType<typeof import("tesseract.js").createWorker>>;

const MAX_SIDE = 2600;
const MIN_SIDE = 1500;

type Prepped = { gray: HTMLCanvasElement; binary: HTMLCanvasElement };

// Upscale small photos, drop to grayscale, stretch contrast and produce a
// locally-binarized twin — Tesseract is far more accurate on high-contrast,
// deshadowed input than on raw camera JPEGs.
export async function preprocess(file: File): Promise<Prepped> {
  const bitmap = await createImageBitmap(file);
  const longest = Math.max(bitmap.width, bitmap.height);
  const shortest = Math.min(bitmap.width, bitmap.height);
  let scale = 1;
  if (shortest < MIN_SIDE) scale = MIN_SIDE / shortest;
  if (longest * scale > MAX_SIDE) scale = MAX_SIDE / longest;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();

  const w = canvas.width;
  const h = canvas.height;
  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;
  const gray = new Float32Array(w * h);
  const histogram = new Array<number>(256).fill(0);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const value = Math.round(
      0.299 * (data[i] ?? 0) + 0.587 * (data[i + 1] ?? 0) + 0.114 * (data[i + 2] ?? 0),
    );
    gray[p] = value;
    histogram[value] = (histogram[value] ?? 0) + 1;
  }
  // 2% / 98% percentile contrast stretch keeps shadows and paper glare in check.
  const total = gray.length;
  let low = 0;
  let high = 255;
  let acc = 0;
  for (let v = 0; v < 256; v++) {
    acc += histogram[v] ?? 0;
    if (acc > total * 0.02) {
      low = v;
      break;
    }
  }
  acc = 0;
  for (let v = 255; v >= 0; v--) {
    acc += histogram[v] ?? 0;
    if (acc > total * 0.02) {
      high = v;
      break;
    }
  }
  const span = Math.max(1, high - low);
  for (let p = 0, i = 0; p < gray.length; p++, i += 4) {
    const stretched = Math.max(0, Math.min(255, (((gray[p] ?? 0) - low) * 255) / span));
    gray[p] = stretched;
    data[i] = stretched;
    data[i + 1] = stretched;
    data[i + 2] = stretched;
    data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);

  // Adaptive (mean minus C) threshold via an integral image — removes uneven
  // lighting and shadow gradients that wreck Tesseract on phone photos.
  const integral = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) {
    let rowSum = 0;
    for (let x = 0; x < w; x++) {
      rowSum += gray[y * w + x] ?? 0;
      integral[(y + 1) * (w + 1) + (x + 1)] = (integral[y * (w + 1) + (x + 1)] ?? 0) + rowSum;
    }
  }
  const radius = Math.max(8, Math.round(Math.min(w, h) / 40));
  const binary = document.createElement("canvas");
  binary.width = w;
  binary.height = h;
  const bctx = binary.getContext("2d", { willReadFrequently: true })!;
  const bimg = bctx.createImageData(w, h);
  const bdata = bimg.data;
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(h - 1, y + radius);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(w - 1, x + radius);
      const area = (y1 - y0 + 1) * (x1 - x0 + 1);
      const sum =
        (integral[(y1 + 1) * (w + 1) + (x1 + 1)] ?? 0) -
        (integral[y0 * (w + 1) + (x1 + 1)] ?? 0) -
        (integral[(y1 + 1) * (w + 1) + x0] ?? 0) +
        (integral[y0 * (w + 1) + x0] ?? 0);
      const mean = sum / area;
      const value = (gray[y * w + x] ?? 0) < mean - 10 ? 0 : 255;
      const i = (y * w + x) * 4;
      bdata[i] = value;
      bdata[i + 1] = value;
      bdata[i + 2] = value;
      bdata[i + 3] = 255;
    }
  }
  bctx.putImageData(bimg, 0, 0);

  return { gray: canvas, binary };
}

/** Rough quality score: confidence weighted by how much plausible text came back. */
function scoreResult(text: string, confidence: number) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return -1;
  const letters = (cleaned.match(/[A-Za-z0-9]/g) ?? []).length;
  const ratio = letters / cleaned.length;
  return confidence * (0.5 + ratio) + Math.min(letters, 400) / 20;
}

const PHASES: Record<string, string> = {
  "loading tesseract core": "Loading engine",
  "initializing tesseract": "Starting engine",
  "loading language traineddata": "Downloading language data",
  "initializing api": "Preparing",
  "recognizing text": "Reading text",
};

export function OcrStudio() {
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Preparing");
  const [busy, setBusy] = useState(false);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      void workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const getWorker = async () => {
    if (workerRef.current) return workerRef.current;
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng", 1, {
      logger: (m: { status: string; progress: number }) => {
        setPhase(PHASES[m.status] ?? "Working");
        setProgress(Math.round((m.progress ?? 0) * 100));
      },
    });
    workerRef.current = worker;
    return worker;
  };

  const run = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image of a document (PNG, JPG or WebP).");
      return;
    }
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setPreview(url);
    setLastFile(file);
    setText("");
    setProgress(0);
    setPhase("Preparing image");
    setBusy(true);
    try {
      const { gray, binary } = await preprocess(file);
      const worker = await getWorker();
      await worker.setParameters({
        preserve_interword_spaces: "1",
        user_defined_dpi: "300",
      });

      // Try a few page-segmentation / image combinations and keep the best read;
      // phone photos vary wildly and no single mode wins on all of them.
      const attempts: { canvas: HTMLCanvasElement; psm: string }[] = [
        { canvas: binary, psm: "3" },
        { canvas: gray, psm: "3" },
        { canvas: binary, psm: "6" },
      ];
      let best = "";
      let bestScore = -1;
      for (const attempt of attempts) {
        setPhase("Reading text");
        await worker.setParameters({ tessedit_pageseg_mode: attempt.psm as never });
        const result = await worker.recognize(attempt.canvas);
        const cleaned = result.data.text
          .replace(/[ \t]+\n/g, "\n")
          .replace(/\n{3,}/g, "\n\n")
          .trim();
        const score = scoreResult(cleaned, result.data.confidence ?? 0);
        if (score > bestScore) {
          bestScore = score;
          best = cleaned;
        }
        // Good enough — don't burn time on the remaining passes.
        if ((result.data.confidence ?? 0) >= 82 && cleaned.length > 40) break;
      }
      const value = best;
      setText(value);
      if (!value) toast.error("No readable text found. Try a sharper, brighter photo.");
      else toast.success("Text extracted");
    } catch (error) {
      console.error(error);
      // A broken worker can't be reused — drop it so the next attempt starts clean.
      void workerRef.current?.terminate();
      workerRef.current = null;
      toast.error("Extraction failed. Please try again with another image.");
    } finally {
      setBusy(false);
      setProgress(100);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Dropzone
          accept="image/*"
          onFiles={(files) => void run(files[0])}
          icon={<ScanText className="h-6 w-6" />}
          title="Drop a document photo"
          hint="PNG, JPG or WebP — text is read on your device"
        />
        <div className="plush flex flex-col justify-center gap-3 p-6">
          <p className="text-sm font-bold">Take a picture</p>
          <p className="text-xs text-muted-foreground">
            Point at a page or book; keep it flat and well lit for the best results.
          </p>
          <PillButton onClick={() => cameraRef.current?.click()} className="self-start">
            <Camera className="h-4 w-4" /> Open camera
          </PillButton>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              void run(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {busy && (
        <div className="plush flex items-center gap-3 p-4">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <div className="flex-1">
            <p className="text-xs font-semibold">
              {phase}… {progress}%
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${Math.max(6, progress)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {preview && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="plush p-3">
            <img
              src={preview}
              alt="Uploaded document"
              className="max-h-[520px] w-full rounded-2xl object-contain"
            />
          </div>
          <div className="plush flex flex-col gap-3 p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={busy ? "Reading your document…" : "Extracted text will appear here…"}
              className="scrollbar-soft min-h-[320px] flex-1 resize-none rounded-2xl bg-surface-1 p-4 text-sm leading-relaxed text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex flex-wrap gap-2">
              <PillButton onClick={copy} disabled={!text}>
                <Copy className="h-4 w-4" /> Copy text
              </PillButton>
              <PillButton variant="tonal" onClick={download} disabled={!text}>
                <Download className="h-4 w-4" /> Download .txt
              </PillButton>
              <PillButton
                variant="tonal"
                onClick={() => void run(lastFile ?? undefined)}
                disabled={!lastFile || busy}
              >
                <RotateCcw className="h-4 w-4" /> Re-scan
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
