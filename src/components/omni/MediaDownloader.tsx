import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Check,
  ClipboardPaste,
  Copy,
  Download,
  ExternalLink,
  Link2,
  Loader2,
  Music4,
  Sparkles,
} from "lucide-react";
import { detectPlatform, resolveMedia, type MediaResult } from "@/lib/downloader.functions";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { cn } from "@/lib/utils";

const QUALITIES = ["480p", "720p", "1080p"] as const;
type Quality = (typeof QUALITIES)[number];
const FORMAT_MODES = ["all", "video", "audio"] as const;
type FormatMode = (typeof FORMAT_MODES)[number];

const PLATFORMS = ["YouTube", "Instagram", "TikTok", "Facebook", "X"] as const;
type Platform = (typeof PLATFORMS)[number];

const PLACEHOLDERS: Record<Platform, string> = {
  YouTube: "https://youtube.com/watch?v=…",
  Instagram: "https://instagram.com/reel/…",
  TikTok: "https://tiktok.com/@user/video/…",
  Facebook: "https://facebook.com/watch/?v=…",
  X: "https://x.com/user/status/…",
};

export function MediaDownloader() {
  const { isOnline, checkConnection } = useNetworkStatus();
  const run = useServerFn(resolveMedia);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [quality, setQuality] = useState<Quality>("720p");
  const [format, setFormat] = useState<FormatMode>("all");
  const [source, setSource] = useState<Platform>("YouTube");

  const platform = detectPlatform(url) as Platform | null;

  const videos = useMemo(() => result?.formats.filter((f) => f.ext !== "mp3") ?? [], [result]);
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
    if (!isOnline) {
      setError("Media Downloader requires an active internet connection to fetch media.");
      return;
    }
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await run({ data: { url: url.trim(), quality, format } });
      setResult(res);
      const set = new Set(res.formats.map((f) => f.quality));
      const preferred = (["1080p", "720p", "480p"] as Quality[]).find((q) => set.has(q));
      if (preferred) setQuality(preferred);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "The download service could not resolve that link.";
      setError(message);
      toast.error(message, {
        icon: <ExternalLink className="h-4 w-4 text-destructive" />,
      });
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

  async function triggerDirectDownload(fileUrl: string, filename: string) {
    if (!isOnline) {
      toast.error("You are currently offline. Downloading media requires an active connection.");
      return;
    }
    setDownloading(true);
    toast.info("Starting direct download…");
    try {
      // Attempt blob download to force direct file save on device
      const res = await fetch(fileUrl, { mode: "cors" });
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
        toast.success("Download started!");
        setDownloading(false);
        return;
      }
    } catch {
      // Fall through to direct link navigation
    }

    // Direct link fallback
    const a = document.createElement("a");
    a.href = fileUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success("Download link opened!");
    setDownloading(false);
  }

  async function copyDirectLink(linkUrl: string) {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopiedLink(linkUrl);
      toast.success("Direct download link copied to clipboard!");
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      toast.error("Could not copy link to clipboard.");
    }
  }

  return (
    <div className="space-y-4">
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
              placeholder={PLACEHOLDERS[platform ?? source]}
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
              {platform
                ? `Detected: ${platform}`
                : "Unsupported link — try YouTube, Instagram or TikTok."}
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

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Format
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FORMAT_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setFormat(mode)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-[13px] font-semibold transition active:scale-95",
                  format === mode
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]"
                    : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
                )}
              >
                {mode === "all" ? "Video + MP3" : mode === "video" ? "Video" : "MP3 audio"}
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={busy || !url.trim() || !isOnline}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? "Fetching…" : "Generate Download Link"}
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
                <p className="mt-4 text-sm font-semibold">Your direct download appears here</p>
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

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {chosen && (
                  <>
                    <button
                      onClick={() =>
                        triggerDirectDownload(
                          chosen.url,
                          `${result.title.replace(/[^a-z0-9]/gi, "_")}.${chosen.ext}`,
                        )
                      }
                      disabled={downloading}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50"
                    >
                      {downloading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Download {chosen.label} {chosen.ext.toUpperCase()}
                      {chosen.size ? ` · ${chosen.size}` : ""}
                    </button>
                    <button
                      onClick={() => copyDirectLink(chosen.url)}
                      title="Copy direct download link"
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-3 text-xs font-semibold transition hover:bg-surface-2/80 active:scale-95"
                    >
                      {copiedLink === chosen.url ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copiedLink === chosen.url ? "Copied" : "Copy Direct Link"}
                    </button>
                  </>
                )}
                {audio && (
                  <button
                    onClick={() =>
                      triggerDirectDownload(
                        audio.url,
                        `${result.title.replace(/[^a-z0-9]/gi, "_")}.mp3`,
                      )
                    }
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-50"
                  >
                    <Music4 className="h-4 w-4" /> Download MP3
                  </button>
                )}
              </div>

              {videos.length > 1 && (
                <div className="mt-5 space-y-2 border-t border-black/5 dark:border-white/5 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    All formats & direct links
                  </p>
                  {videos.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-2xl bg-surface-2/70 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2"
                    >
                      <span>
                        {f.label} · {f.ext.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyDirectLink(f.url)}
                          title="Copy direct link"
                          className="p-1 text-muted-foreground hover:text-foreground transition"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            triggerDirectDownload(
                              f.url,
                              `${result.title.replace(/[^a-z0-9]/gi, "_")}_${f.quality}.${f.ext}`,
                            )
                          }
                          className="rounded-full bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 text-xs font-semibold transition"
                        >
                          {f.size ?? "Download"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
