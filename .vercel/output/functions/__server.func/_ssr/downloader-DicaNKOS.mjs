import { r as __toESM } from "../_runtime.mjs";
import { G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn } from "./server-CIdmJJo9.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
import { A as LoaderCircle, B as Copy, H as ClipboardPaste, L as ExternalLink, R as Download, U as Check, d as Sparkles, j as Link2, x as Music4 } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-DgT_Vd_p.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useNetworkStatus } from "./router-fuhFPXz5.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as PageShell } from "./primitives-Jiyvg82y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloader-DicaNKOS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
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
var _jsxFileName$1 = "/app/applet/src/components/omni/MediaDownloader.tsx";
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
			toast.error(message, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-4 w-4 text-destructive" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 86,
				columnNumber: 15
			}, this) });
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 lg:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "plush-raised p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-base font-bold",
						children: "Paste a link"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 158,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Works with YouTube, Instagram, TikTok, Facebook and X."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 159,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Platform"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 163,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: PLATFORMS.map((p) => {
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setSource(p),
								className: cn("rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95", (platform ?? source) === p ? "bg-primary-container text-primary-container-foreground" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
								children: p
							}, p, false, {
								fileName: _jsxFileName$1,
								lineNumber: 170,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 166,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 flex items-center gap-2 rounded-full bg-surface-2/70 px-4 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 187,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: url,
								onChange: (e) => setUrl(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && generate(),
								inputMode: "url",
								placeholder: PLACEHOLDERS[platform ?? source],
								className: "w-full bg-transparent text-sm outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 188,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: pasteFromClipboard,
								"aria-label": "Paste link",
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground active:scale-90",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardPaste, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 201,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 196,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 186,
						columnNumber: 11
					}, this),
					url.trim() && /* @__PURE__ */ (void 0)("p", {
						className: "mt-2 text-xs font-medium text-muted-foreground",
						children: platform ? `Detected: ${platform}` : "Unsupported link — try YouTube, Instagram or TikTok."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 206,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Quality"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 213,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex gap-1.5",
						children: QUALITIES.map((q) => {
							const disabled = result ? !available.includes(q) : false;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								disabled,
								onClick: () => setQuality(q),
								className: cn("rounded-full px-5 py-2.5 text-[13px] font-semibold transition active:scale-95 disabled:opacity-40", quality === q && !disabled ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
								children: q
							}, q, false, {
								fileName: _jsxFileName$1,
								lineNumber: 220,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 216,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Format"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 237,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: FORMAT_MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFormat(mode),
							className: cn("rounded-full px-4 py-2.5 text-[13px] font-semibold transition active:scale-95", format === mode ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
							children: mode === "all" ? "Video + MP3" : mode === "video" ? "Video" : "MP3 audio"
						}, mode, false, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 240,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: generate,
						disabled: busy || !url.trim() || !isOnline,
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 262,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 262,
							columnNumber: 68
						}, this), busy ? "Fetching…" : "Generate Download Link"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 257,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Free to use. Please only download content you own or have the rights to."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 266,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 157,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					error && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive",
						children: error
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 273,
						columnNumber: 13
					}, this),
					!result && !busy && !error && /* @__PURE__ */ (void 0)("div", {
						className: "plush grid min-h-64 place-items-center p-8 text-center",
						children: /* @__PURE__ */ (void 0)("div", { children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
								children: /* @__PURE__ */ (void 0)(Download, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 282,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 281,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-sm font-semibold",
								children: "Your direct download appears here"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 284,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Paste a link, pick 480p, 720p or 1080p, then hit Generate."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 285,
								columnNumber: 17
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 280,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 279,
						columnNumber: 13
					}, this),
					busy && /* @__PURE__ */ (void 0)("div", {
						className: "plush animate-pulse space-y-3 p-5",
						children: [
							/* @__PURE__ */ (void 0)("div", { className: "h-32 rounded-2xl bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 294,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "h-3 w-2/3 rounded-full bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 295,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "h-3 w-1/3 rounded-full bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 296,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 293,
						columnNumber: 13
					}, this),
					result && /* @__PURE__ */ (void 0)(motion.div, {
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
							result.thumbnail && /* @__PURE__ */ (void 0)("img", {
								src: result.thumbnail,
								alt: result.title,
								loading: "lazy",
								className: "mb-4 aspect-video w-full rounded-2xl object-cover"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 307,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold uppercase tracking-wide text-primary",
								children: result.platform
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 314,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("h3", {
								className: "mt-1 text-sm font-semibold leading-snug",
								children: result.title
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 317,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [result.author, result.duration].filter(Boolean).join(" · ")
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 318,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-4 flex flex-wrap items-center gap-2",
								children: [chosen && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("button", {
									onClick: () => triggerDirectDownload(chosen.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}.${chosen.ext}`),
									disabled: downloading,
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
									children: [
										downloading ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 336,
											columnNumber: 25
										}, this) : /* @__PURE__ */ (void 0)(Download, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 338,
											columnNumber: 25
										}, this),
										"Download ",
										chosen.label,
										" ",
										chosen.ext.toUpperCase(),
										chosen.size ? ` · ${chosen.size}` : ""
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 325,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => copyDirectLink(chosen.url),
									title: "Copy direct download link",
									className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-3 text-xs font-semibold transition hover:bg-surface-2/80 active:scale-95",
									children: [copiedLink === chosen.url ? /* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 349,
										columnNumber: 25
									}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 351,
										columnNumber: 25
									}, this), copiedLink === chosen.url ? "Copied" : "Copy Direct Link"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 343,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 324,
									columnNumber: 19
								}, this), audio && /* @__PURE__ */ (void 0)("button", {
									onClick: () => triggerDirectDownload(audio.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}.mp3`),
									disabled: downloading,
									className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-50",
									children: [/* @__PURE__ */ (void 0)(Music4, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 368,
										columnNumber: 21
									}, this), " Download MP3"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 358,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 322,
								columnNumber: 15
							}, this),
							videos.length > 1 && /* @__PURE__ */ (void 0)("div", {
								className: "mt-5 space-y-2 border-t border-black/5 dark:border-white/5 pt-4",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "All formats & direct links"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 375,
									columnNumber: 19
								}, this), videos.map((f, i) => /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between rounded-2xl bg-surface-2/70 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2",
									children: [/* @__PURE__ */ (void 0)("span", { children: [
										f.label,
										" · ",
										f.ext.toUpperCase()
									] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 383,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("button", {
											onClick: () => copyDirectLink(f.url),
											title: "Copy direct link",
											className: "p-1 text-muted-foreground hover:text-foreground transition",
											children: /* @__PURE__ */ (void 0)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 392,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 387,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("button", {
											onClick: () => triggerDirectDownload(f.url, `${result.title.replace(/[^a-z0-9]/gi, "_")}_${f.quality}.${f.ext}`),
											className: "rounded-full bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 text-xs font-semibold transition",
											children: f.size ?? "Download"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 394,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 386,
										columnNumber: 23
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 379,
									columnNumber: 21
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 374,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 301,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 271,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 156,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 155,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/downloader.tsx?tsr-split=component";
function DownloaderPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageShell, {
		eyebrow: "Downloader",
		title: "Grab any video from a link",
		description: "Paste a YouTube, Instagram or TikTok link, choose your quality and download it free.",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaDownloader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 5,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 4,
		columnNumber: 10
	}, this);
}
//#endregion
export { DownloaderPage as component };
