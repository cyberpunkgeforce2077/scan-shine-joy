import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as createServerFn } from "./server-DlXSfxAW.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
import { B as Download, C as Music4, H as Copy, M as LoaderCircle, N as Link2, W as ClipboardPaste, f as Sparkles, q as Check, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useNetworkStatus } from "./router-DTYw8Swk.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BBaNq9dH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as PageShell } from "./primitives-KMHgUwZj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloader-DIMZmKMP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = objectType({
	url: stringType().min(5).max(2e3),
	quality: stringType().max(16).optional(),
	format: enumType([
		"all",
		"video",
		"audio"
	]).optional()
});
var HOSTS = [
	{
		test: /(?:youtube\.com|youtu\.be)/i,
		name: "YouTube"
	},
	{
		test: /instagram\.com/i,
		name: "Instagram"
	},
	{
		test: /tiktok\.com/i,
		name: "TikTok"
	},
	{
		test: /facebook\.com|fb\.watch/i,
		name: "Facebook"
	},
	{
		test: /(?:twitter\.com|x\.com)/i,
		name: "X"
	}
];
function detectPlatform(url) {
	return HOSTS.find((h) => h.test.test(url))?.name ?? null;
}
var resolveMedia = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("14ae22d27d71df7228d88a7c4c1f3146df415ef2241f0b9a43524c75f415bcd9"));
var QUALITIES = [
	"480p",
	"720p",
	"1080p"
];
var FORMAT_MODES = [
	"all",
	"video",
	"audio"
];
var PLATFORMS = [
	"YouTube",
	"Instagram",
	"TikTok",
	"Facebook",
	"X"
];
var PLACEHOLDERS = {
	YouTube: "https://youtube.com/watch?v=…",
	Instagram: "https://instagram.com/reel/…",
	TikTok: "https://tiktok.com/@user/video/…",
	Facebook: "https://facebook.com/watch/?v=…",
	X: "https://x.com/user/status/…"
};
function MediaDownloader() {
	const { isOnline, checkConnection } = useNetworkStatus();
	const run = useServerFn(resolveMedia);
	const [url, setUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const [copiedLink, setCopiedLink] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [quality, setQuality] = (0, import_react.useState)("720p");
	const [format, setFormat] = (0, import_react.useState)("all");
	const [source, setSource] = (0, import_react.useState)("YouTube");
	const platform = detectPlatform(url);
	const videos = (0, import_react.useMemo)(() => result?.formats.filter((f) => f.ext !== "mp3") ?? [], [result]);
	const audio = (0, import_react.useMemo)(() => result?.formats.find((f) => f.quality === "audio"), [result]);
	const available = (0, import_react.useMemo)(() => {
		const set = new Set(videos.map((f) => f.quality));
		return QUALITIES.filter((q) => set.has(q));
	}, [videos]);
	const chosen = (0, import_react.useMemo)(() => {
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
			const res = await run({ data: {
				url: url.trim(),
				quality,
				format
			} });
			setResult(res);
			const set = new Set(res.formats.map((f) => f.quality));
			const preferred = [
				"1080p",
				"720p",
				"480p"
			].find((q) => set.has(q));
			if (preferred) setQuality(preferred);
		} catch (caught) {
			const message = caught instanceof Error ? caught.message : "The download service could not resolve that link.";
			setError(message);
			toast.error(message, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4 text-destructive" }) });
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
	async function triggerDirectDownload(fileUrl, filename) {
		if (!isOnline) {
			toast.error("You are currently offline. Downloading media requires an active connection.");
			return;
		}
		setDownloading(true);
		toast.info("Starting direct download…");
		try {
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
		} catch {}
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
	async function copyDirectLink(linkUrl) {
		try {
			await navigator.clipboard.writeText(linkUrl);
			setCopiedLink(linkUrl);
			toast.success("Direct download link copied to clipboard!");
			setTimeout(() => setCopiedLink(null), 2e3);
		} catch {
			toast.error("Could not copy link to clipboard.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plush-raised p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold",
						children: "Paste a link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Works with YouTube, Instagram, TikTok, Facebook and X."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Platform"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: PLATFORMS.map((p) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSource(p),
								className: cn("rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95", (platform ?? source) === p ? "bg-primary-container text-primary-container-foreground" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
								children: p
							}, p);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2 rounded-full bg-surface-2/70 px-4 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: url,
								onChange: (e) => setUrl(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && generate(),
								inputMode: "url",
								placeholder: PLACEHOLDERS[platform ?? source],
								className: "w-full bg-transparent text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: pasteFromClipboard,
								"aria-label": "Paste link",
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground active:scale-90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPaste, { className: "h-4 w-4" })
							})
						]
					}),
					url.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-medium text-muted-foreground",
						children: platform ? `Detected: ${platform}` : "Unsupported link — try YouTube, Instagram or TikTok."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Quality"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex gap-1.5",
						children: QUALITIES.map((q) => {
							const disabled = result ? !available.includes(q) : false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled,
								onClick: () => setQuality(q),
								className: cn("rounded-full px-5 py-2.5 text-[13px] font-semibold transition active:scale-95 disabled:opacity-40", quality === q && !disabled ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
								children: q
							}, q);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Format"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: FORMAT_MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFormat(mode),
							className: cn("rounded-full px-4 py-2.5 text-[13px] font-semibold transition active:scale-95", format === mode ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
							children: mode === "all" ? "Video + MP3" : mode === "video" ? "Video" : "MP3 audio"
						}, mode))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: generate,
						disabled: busy || !url.trim() || !isOnline,
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), busy ? "Fetching…" : "Generate Download Link"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Free to use. Please only download content you own or have the rights to."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive",
						children: error
					}),
					!result && !busy && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "plush grid min-h-64 place-items-center p-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold",
								children: "Your direct download appears here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Paste a link, pick 480p, 720p or 1080p, then hit Generate."
							})
						] })
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "plush animate-pulse space-y-3 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 rounded-2xl bg-surface-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-2/3 rounded-full bg-surface-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 rounded-full bg-surface-2" })
						]
					}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "plush overflow-hidden p-5",
						children: [
							result.thumbnail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: result.thumbnail,
								alt: result.title,
								loading: "lazy",
								className: "mb-4 aspect-video w-full rounded-2xl object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wide text-primary",
								children: result.platform
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-sm font-semibold leading-snug",
								children: result.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [result.author, result.duration].filter(Boolean).join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-2",
								children: [chosen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => triggerDirectDownload(chosen.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}.${chosen.ext}`),
									disabled: downloading,
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
									children: [
										downloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }),
										"Download ",
										chosen.label,
										" ",
										chosen.ext.toUpperCase(),
										chosen.size ? ` · ${chosen.size}` : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => copyDirectLink(chosen.url),
									title: "Copy direct download link",
									className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-3 text-xs font-semibold transition hover:bg-surface-2/80 active:scale-95",
									children: [copiedLink === chosen.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copiedLink === chosen.url ? "Copied" : "Copy Direct Link"]
								})] }), audio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => triggerDirectDownload(audio.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}.mp3`),
									disabled: downloading,
									className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music4, { className: "h-4 w-4" }), " Download MP3"]
								})]
							}),
							videos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-2 border-t border-white/5 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "All formats & direct links"
								}), videos.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-2xl bg-surface-2/70 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										f.label,
										" · ",
										f.ext.toUpperCase()
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => copyDirectLink(f.url),
											title: "Copy direct link",
											className: "p-1 text-muted-foreground hover:text-foreground transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => triggerDirectDownload(f.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}_${f.quality}.${f.ext}`),
											className: "rounded-full bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 text-xs font-semibold transition",
											children: f.size ?? "Download"
										})]
									})]
								}, i))]
							})
						]
					})
				]
			})]
		})
	});
}
function DownloaderPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "Downloader",
		title: "Grab any video from a link",
		description: "Paste a YouTube, Instagram or TikTok link, choose your quality and download it free.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaDownloader, {})
	});
}
//#endregion
export { DownloaderPage as component };
