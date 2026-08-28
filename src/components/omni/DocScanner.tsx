import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Camera, FileDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dropzone } from "./Dropzone";
import { PillButton } from "./primitives";
import { cn } from "@/lib/utils";

export type FilterId = "document" | "grayscale" | "magic" | "original";

export const FILTERS: { id: FilterId; label: string; hint: string }[] = [
  { id: "document", label: "Document B&W", hint: "High-contrast scan look" },
  { id: "magic", label: "Magic Color", hint: "Boosted contrast, keeps color" },
  { id: "grayscale", label: "Grayscale", hint: "Neutral gray tones" },
  { id: "original", label: "Original", hint: "No processing" },
];

export type Page = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
};

/** Applies the selected look to raw pixel data and returns a data URL. */
export function processImage(img: HTMLImageElement, filter: FilterId): string {
  const maxDim = 2000;
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  if (filter === "original") return canvas.toDataURL("image/jpeg", 0.92);

  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;

  if (filter === "document") {
    // Local adaptive threshold using a coarse luminance grid (fast + robust).
    const lum = new Float32Array(w * h);
    for (let i = 0, p = 0; i < px.length; i += 4, p++) {
      lum[p] = 0.299 * px[i]! + 0.587 * px[i + 1]! + 0.114 * px[i + 2]!;
    }
    const block = Math.max(16, Math.round(Math.min(w, h) / 16));
    const cols = Math.ceil(w / block);
    const rows = Math.ceil(h / block);
    const means = new Float32Array(cols * rows);
    for (let by = 0; by < rows; by++) {
      for (let bx = 0; bx < cols; bx++) {
        let sum = 0;
        let count = 0;
        for (let y = by * block; y < Math.min(h, (by + 1) * block); y++) {
          for (let x = bx * block; x < Math.min(w, (bx + 1) * block); x++) {
            sum += lum[y * w + x]!;
            count++;
          }
        }
        means[by * cols + bx] = count ? sum / count : 255;
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const p = y * w + x;
        const mean = means[Math.floor(y / block) * cols + Math.floor(x / block)]!;
        const v = lum[p]! < mean - 8 ? 0 : 255;
        const i = p * 4;
        px[i] = v;
        px[i + 1] = v;
        px[i + 2] = v;
      }
    }
  } else if (filter === "grayscale") {
    for (let i = 0; i < px.length; i += 4) {
      const v = 0.299 * px[i]! + 0.587 * px[i + 1]! + 0.114 * px[i + 2]!;
      px[i] = v;
      px[i + 1] = v;
      px[i + 2] = v;
    }
  } else {
    // magic color: contrast + saturation lift with white-point correction
    for (let i = 0; i < px.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const v = px[i + c]!;
        px[i + c] = Math.max(0, Math.min(255, (v - 128) * 1.45 + 128 + 18));
      }
    }
  }

  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.92);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function DocScanner() {
  const [sources, setSources] = useState<Page[]>([]);
  const [filter, setFilter] = useState<FilterId>("document");
  const [rendered, setRendered] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) {
      toast.error("Please add image files.");
      return;
    }
    const pages = await Promise.all(
      imgs.map(async (file) => {
        const src = await new Promise<string>((res) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result as string);
          fr.readAsDataURL(file);
        });
        const img = await loadImage(src);
        return {
          id: `${file.name}-${crypto.randomUUID()}`,
          name: file.name,
          src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        } satisfies Page;
      }),
    );
    setSources((prev) => [...prev, ...pages]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBusy(true);
      const next: Record<string, string> = {};
      for (const page of sources) {
        const img = await loadImage(page.src);
        next[page.id] = processImage(img, filter);
      }
      if (!cancelled) {
        setRendered(next);
        setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sources, filter]);

  const move = (index: number, dir: -1 | 1) => {
    setSources((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      const a = next[index]!;
      next[index] = next[target]!;
      next[target] = a;
      return next;
    });
  };

  const exportPdf = async () => {
    if (!sources.length) return;
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();
      sources.forEach((page, i) => {
        if (i > 0) doc.addPage();
        const data = rendered[page.id] ?? page.src;
        const ratio = Math.min(pw / page.width, ph / page.height);
        const w = page.width * ratio;
        const h = page.height * ratio;
        doc.addImage(data, "JPEG", (pw - w) / 2, (ph - h) / 2, w, h);
      });
      doc.save("omnisuite-scan.pdf");
      toast.success("PDF exported");
    } catch {
      toast.error("Could not build the PDF.");
    } finally {
      setBusy(false);
    }
  };

  const downloadPage = (page: Page) => {
    const a = document.createElement("a");
    a.href = rendered[page.id] ?? page.src;
    a.download = `${page.name.replace(/\.[^.]+$/, "")}-scan.jpg`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Dropzone
          accept="image/*"
          multiple
          onFiles={addFiles}
          title="Drop document photos here"
          hint="PNG, JPG or WebP — multiple pages supported"
        />
        <div className="plush flex flex-col justify-center gap-3 p-6">
          <p className="text-sm font-bold">Use your camera</p>
          <p className="text-xs text-muted-foreground">
            Snap a page directly; it is converted to a clean scan on device.
          </p>
          <PillButton onClick={() => cameraRef.current?.click()} className="self-start">
            <Camera className="h-4 w-4" /> Take a picture
          </PillButton>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            title={f.hint}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95",
              filter === f.id
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]"
                : "bg-surface-2 text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <PillButton variant="tonal" onClick={exportPdf} disabled={!sources.length || busy}>
            <FileDown className="h-4 w-4" /> Export combined PDF
          </PillButton>
        </div>
      </div>

      {busy && <p className="text-xs text-muted-foreground">Processing pages…</p>}

      {sources.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((page, i) => (
            <div key={page.id} className="plush overflow-hidden p-3">
              <div className="overflow-hidden rounded-2xl bg-surface-2">
                <img
                  src={rendered[page.id] ?? page.src}
                  alt={`Scanned page ${i + 1}`}
                  className="h-56 w-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-semibold text-muted-foreground">
                  Page {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Move up"
                    onClick={() => move(i, -1)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 hover:bg-surface-3"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    aria-label="Move down"
                    onClick={() => move(i, 1)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 hover:bg-surface-3"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    aria-label="Download page"
                    onClick={() => downloadPage(page)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 hover:bg-surface-3"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    aria-label="Remove page"
                    onClick={() => setSources((prev) => prev.filter((p) => p.id !== page.id))}
                    className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-destructive hover:bg-surface-3"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
