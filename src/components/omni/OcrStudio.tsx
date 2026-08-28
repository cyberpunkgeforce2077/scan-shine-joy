import { useRef, useState } from "react";
import { Camera, Copy, Download, Loader2, ScanText } from "lucide-react";
import { toast } from "sonner";
import { Dropzone } from "./Dropzone";
import { PillButton } from "./primitives";

export function OcrStudio() {
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);

  const run = async (files: File[]) => {
    const file = files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please choose an image of a document.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setText("");
    setProgress(0);
    setBusy(true);
    try {
      const { default: Tesseract } = await import("tesseract.js");
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      const value = result.data.text.trim();
      setText(value);
      if (!value) toast.error("No readable text found. Try a sharper, brighter photo.");
      else toast.success("Text extracted");
    } catch {
      toast.error("Extraction failed. Please try another image.");
    } finally {
      setBusy(false);
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
          onFiles={run}
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
              run(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {busy && (
        <div className="plush flex items-center gap-3 p-4">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <div className="flex-1">
            <p className="text-xs font-semibold">Reading text… {progress}%</p>
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
              placeholder="Extracted text will appear here…"
              className="scrollbar-soft min-h-[320px] flex-1 resize-none rounded-2xl bg-surface-1 p-4 text-sm leading-relaxed text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex flex-wrap gap-2">
              <PillButton onClick={copy} disabled={!text}>
                <Copy className="h-4 w-4" /> Copy text
              </PillButton>
              <PillButton variant="tonal" onClick={download} disabled={!text}>
                <Download className="h-4 w-4" /> Download .txt
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
