import { useCallback, useRef, useState } from "react";
import jsQR from "jsqr";
import confetti from "canvas-confetti";
import { Upload, FileImage, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { CelebrationModal } from "./CelebrationModal";

const ACCEPT = ".png,.jpg,.jpeg,.webp,.pdf";

function scanCanvas(canvas: HTMLCanvasElement): string | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !canvas.width || !canvas.height) return null;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const first = jsQR(img.data, img.width, img.height, { inversionAttempts: "attemptBoth" });
  return first?.data ?? null;
}

async function renderImageToCanvas(file: File, scale: number) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function renderPdfFirstPage(file: File, scale: number) {
  const pdfjs = await import("pdfjs-dist");
  const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  return canvas;
}

export function FileScanTab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const reset = () => {
    setPreview(null);
    setFileName(null);
    setResult(null);
    setError(null);
    setCopied(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = useCallback(async (file: File) => {
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isImage = /\.(png|jpe?g|webp)$/i.test(file.name) || file.type.startsWith("image/");
    if (!isPdf && !isImage) {
      reset();
      setError("Unsupported file type. Use PNG, JPG, WEBP or PDF.");
      return;
    }

    setResult(null);
    setError(null);
    setCopied(false);
    setLoading(true);
    setProgress(10);
    setFileName(file.name);

    try {
      const scales = isPdf ? [2, 3, 1] : [1, 2, 0.5];
      let found: string | null = null;
      let previewSet = false;

      for (let i = 0; i < scales.length; i++) {
        const scale = scales[i] ?? 1;
        const canvas = isPdf
          ? await renderPdfFirstPage(file, scale)
          : await renderImageToCanvas(file, scale);
        if (!previewSet) {
          setPreview(canvas.toDataURL("image/png"));
          previewSet = true;
        }
        setProgress(20 + ((i + 1) / scales.length) * 70);
        found = scanCanvas(canvas);
        if (found) break;
      }

      setProgress(100);
      if (found) {
        setResult(found);
        if (!localStorage.getItem("qrm-file-scanned")) {
          localStorage.setItem("qrm-file-scanned", "1");
          confetti({ particleCount: 160, spread: 90, origin: { y: 0.7 } });
          setCelebrate(true);
        }
      } else {
        setError("No QR code detected in this file. Please try a clearer image.");
      }
    } catch {
      setError("Could not read this file. Please try another one.");
    } finally {
      setLoading(false);
    }
  }, []);

  const isLink = !!result && /^https?:\/\//i.test(result);

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) void handleFile(file);
        }}
        className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
          dragging ? "border-primary bg-primary/10" : "border-border bg-card"
        }`}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-foreground">
          {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
        </div>
        <p className="mt-4 text-sm font-semibold text-foreground">
          {loading ? "Scanning file…" : "Drag & drop a file here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP or PDF — scanned locally on your device</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="mt-5 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98] disabled:opacity-60"
        >
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />

        {loading && (
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {preview && (
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <FileImage className="h-4 w-4 text-muted-foreground" />
            <span className="truncate text-xs text-muted-foreground">{fileName}</span>
          </div>
          <img src={preview} alt={`Preview of ${fileName}`} className="max-h-80 w-full object-contain bg-secondary" />
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-destructive/40 bg-destructive/10 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-foreground">{error}</p>
          </div>
          <button
            onClick={() => {
              reset();
              inputRef.current?.click();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-input bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" /> Upload another file
          </button>
        </div>
      )}

      {result && (
        <div className="rounded-3xl border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Scan result</h3>
          <p className="mt-3 break-all text-sm text-foreground">{result}</p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(result);
                setCopied(true);
              }}
              className="flex-1 rounded-2xl border border-input bg-secondary px-4 py-3 text-sm font-semibold text-foreground transition active:scale-[0.98]"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
            {isLink && (
              <a
                href={result}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Open Link
              </a>
            )}
          </div>
          <button onClick={reset} className="mt-3 w-full text-xs text-muted-foreground">
            Scan another file
          </button>
        </div>
      )}

      <CelebrationModal open={celebrate} onClose={() => setCelebrate(false)} title="First File Scanned!" />
    </div>
  );
}
