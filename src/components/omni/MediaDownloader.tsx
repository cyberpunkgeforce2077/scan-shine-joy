import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ClipboardPaste, Download, Link2, Loader2, Music4, Sparkles } from "lucide-react";
import { detectPlatform, resolveMedia, type MediaResult } from "@/lib/downloader.functions";
import { cn } from "@/lib/utils";

const QUALITIES = ["480p", "720p", "1080p"] as const;
type Quality = (typeof QUALITIES)[number];

export function MediaDownloader() {
  const run = useServerFn(resolveMedia);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [quality, setQuality] = useState<Quality>("720p");

  const platform = detectPlatform(url);

  const videos = useMemo(
    () => result?.formats.filter((f) => f.quality !== "audio") ?? [],
    [result],
  );
  const audio = useMemo(() => result?.formats.find((f) => f.quality === "audio"), [result]);

  const available = useMemo(() => {
    const set = new Set(videos.map((f) => f.quality));
    return QUALITIES.filter((q) => set.has(q));
  }, [videos]);

  const chosen = useMemo(() => {
    if (!videos.length) return null;
    return videos.find((f) => f.quality === quality) ?? videos[0] ?? null;
  }, [videos, quality]);

  async function generate() {
    if (!url.trim() || busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await run({ data: { url: url.trim() } });
      setResult(res);
      const set = new Set(res.formats.map((f) => f.quality));
      const preferred = (["1080p", "720p", "480p"] as Quality[]).find((q) => set.has(q));
      if (preferred) setQuality(preferred);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not process that link.");
    } finally {
      setBusy(false);
    }
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      setError("Clipboard access was blocked by your browser.");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="plush-raised p-5 sm:p-6">
        <h2 className="text-base font-bold">Paste a link</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Works with YouTube, Instagram, TikTok, Facebook and X.
        </p>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Platform
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => {
            const active = (platform ?? source) === p;
            return (
              <button
                key={p}
                onClick={() => setSource(p)}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95",
                  active
                    ? "bg-primary-container text-primary-container-foreground"
                    : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            );
          })}
        </div>


        <div className="mt-4 flex items-center gap-2 rounded-full bg-surface-2/70 px-4 py-2.5">
          <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            inputMode="url"
            placeholder="https://youtube.com/watch?v=…"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button
            onClick={pasteFromClipboard}
            aria-label="Paste link"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground active:scale-90"
          >
            <ClipboardPaste className="h-4 w-4" />
          </button>
        </div>

        {url.trim() && (
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            {platform ? `Detected: ${platform}` : "Unsupported link — try YouTube, Instagram or TikTok."}
          </p>
        )}

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Quality
        </p>
        <div className="mt-2 flex gap-1.5">
          {QUALITIES.map((q) => {
            const disabled = result ? !available.includes(q) : false;
            return (
              <button
                key={q}
                disabled={disabled}
                onClick={() => setQuality(q)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13px] font-semibold transition active:scale-95 disabled:opacity-40",
                  quality === q && !disabled
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]"
                    : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
                )}
              >
                {q}
              </button>
            );
          })}
        </div>

        <button
          onClick={generate}
          disabled={busy || !url.trim()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {busy ? "Fetching…" : "Generate"}
        </button>

        <p className="mt-4 text-xs text-muted-foreground">
          Free to use. Please only download content you own or have the rights to.
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        {!result && !busy && !error && (
          <div className="plush grid min-h-64 place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
                <Download className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">Your download appears here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste a link, pick 480p, 720p or 1080p, then hit Generate.
              </p>
            </div>
          </div>
        )}

        {busy && (
          <div className="plush animate-pulse space-y-3 p-5">
            <div className="h-32 rounded-2xl bg-surface-2" />
            <div className="h-3 w-2/3 rounded-full bg-surface-2" />
            <div className="h-3 w-1/3 rounded-full bg-surface-2" />
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="plush overflow-hidden p-5"
          >
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                loading="lazy"
                className="mb-4 aspect-video w-full rounded-2xl object-cover"
              />
            )}
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              {result.platform}
            </span>
            <h3 className="mt-1 text-sm font-semibold leading-snug">{result.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {[result.author, result.duration].filter(Boolean).join(" · ")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {chosen && (
                <a
                  href={chosen.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  Download {chosen.quality} {chosen.ext.toUpperCase()}
                  {chosen.size ? ` · ${chosen.size}` : ""}
                </a>
              )}
              {audio && (
                <a
                  href={audio.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95"
                >
                  <Music4 className="h-4 w-4" /> Audio only
                </a>
              )}
            </div>

            {videos.length > 1 && (
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  All formats
                </p>
                {videos.map((f, i) => (
                  <a
                    key={i}
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex items-center justify-between rounded-2xl bg-surface-2/70 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2"
                  >
                    <span>
                      {f.label} · {f.ext.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">{f.size ?? "Download"}</span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
