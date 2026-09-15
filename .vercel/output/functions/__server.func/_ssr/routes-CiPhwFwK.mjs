import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as BookOpen, P as Image, R as Download, T as MessageSquare, _ as Scan, s as Type, y as QrCode } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CiPhwFwK.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var tools = [
	{
		id: "chat",
		name: "Vlad Bot",
		description: "Chat with an advanced AI assistant.",
		icon: MessageSquare,
		href: "/chat",
		color: "from-blue-500/20 to-purple-500/20",
		iconColor: "text-blue-400"
	},
	{
		id: "downloader",
		name: "Media Downloader",
		description: "Download videos from social media directly.",
		icon: Download,
		href: "/downloader",
		color: "from-green-500/20 to-emerald-500/20",
		iconColor: "text-green-400"
	},
	{
		id: "scanner",
		name: "Doc Scanner",
		description: "Scan documents securely in browser.",
		icon: Scan,
		href: "/scanner",
		color: "from-orange-500/20 to-amber-500/20",
		iconColor: "text-orange-400"
	},
	{
		id: "qr",
		name: "QR Code",
		description: "Generate styled QR codes instantly.",
		icon: QrCode,
		href: "/qr",
		color: "from-pink-500/20 to-rose-500/20",
		iconColor: "text-pink-400"
	},
	{
		id: "ocr",
		name: "OCR Extractor",
		description: "Extract text from any image locally.",
		icon: Image,
		href: "/ocr",
		color: "from-cyan-500/20 to-blue-500/20",
		iconColor: "text-cyan-400"
	},
	{
		id: "dakphraser",
		name: "Dakphraser",
		description: "Advanced text manipulation and phrasing.",
		icon: Type,
		href: "/dakphraser",
		color: "from-purple-500/20 to-indigo-500/20",
		iconColor: "text-purple-400"
	},
	{
		id: "guides",
		name: "Setup Guides",
		description: "Configuration and setup walkthroughs.",
		icon: BookOpen,
		href: "/guides",
		color: "from-yellow-500/20 to-orange-500/20",
		iconColor: "text-yellow-400"
	}
];
function AppSelector() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "flex min-h-screen w-full flex-col pt-12 pb-32 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "text-center mb-10 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3 font-display",
					children: "Welcome to OmniSuite"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-primary font-medium text-base sm:text-lg tracking-wide",
					children: "Intelligent creation & privacy-first device tools"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
				children: tools.map((tool, i) => {
					const Icon = tool.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .04 },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: tool.href,
							className: "group relative flex flex-col items-center justify-center p-8 h-64 rounded-3xl bg-card border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-md transition-all overflow-hidden cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 19
								}, this),
								tool.badge && /* @__PURE__ */ (void 0)("div", {
									className: "absolute top-4 right-4 z-20",
									children: /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400",
										children: tool.badge
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 95,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 34
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative z-10 flex flex-col items-center text-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid h-16 w-16 place-items-center rounded-2xl bg-surface-1 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-300",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-8 w-8 ${tool.iconColor}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 101,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-xl font-semibold text-foreground mb-2",
										children: tool.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-muted-foreground line-clamp-2 px-2",
										children: tool.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 105,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 17
						}, this)
					}, tool.id, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 10
	}, this);
}
//#endregion
export { AppSelector as component };
