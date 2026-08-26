import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import jsQR from "jsqr";
import { CelebrationModal } from "./CelebrationModal";

export function ScanTab() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0;
    let stopped = false;

    const tick = () => {
      const video = videoRef.current;
      if (!stopped && video && video.readyState === video.HAVE_ENOUGH_DATA && !resultRef.current) {
        const canvas = (canvasRef.current ??= document.createElement("canvas"));
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx && canvas.width && canvas.height) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(img.data, img.width, img.height);
          if (code?.data) {
            resultRef.current = code.data;
            setResult(code.data);
            if (!localStorage.getItem("qrm-scanned")) {
              localStorage.setItem("qrm-scanned", "1");
              confetti({ particleCount: 160, spread: 90, origin: { y: 0.7 } });
              setCelebrate(true);
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        raf = requestAnimationFrame(tick);
      } catch {
        setError("Camera access denied or unavailable.");
      }
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const isLink = !!result && /^https?:\/\//i.test(result);

  const closeResult = () => {
    setResult(null);
    setCopied(false);
    resultRef.current = null;
  };

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <video ref={videoRef} playsInline muted className="h-[420px] w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-3xl border-2 border-primary/70 bg-primary/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
        </div>
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-card p-6 text-center text-sm text-muted-foreground">
            {error}
          </div>
        )}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Point your camera at a QR code to scan it
      </p>

      {result && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 p-6-sm"
          onClick={closeResult}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-lg"
          >
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Scan result
            </h3>
            <p className="mt-3 break-all text-sm text-foreground">{result}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(result);
                  setCopied(true);
                }}
                className="flex-1 rounded-full border border-input bg-secondary px-4 py-3 text-sm font-semibold text-foreground transition active:scale-[0.98]"
              >
                {copied ? "Copied!" : "Copy Text"}
              </button>
              {isLink && (
                <a
                  href={result}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
                >
                  Open Link
                </a>
              )}
            </div>
            <button
              onClick={closeResult}
              className="mt-3 w-full text-xs text-muted-foreground"
            >
              Scan again
            </button>
          </div>
        </div>
      )}

      <CelebrationModal
        open={celebrate}
        onClose={() => setCelebrate(false)}
        title="First Scan Completed!"
      />
    </div>
  );
}
