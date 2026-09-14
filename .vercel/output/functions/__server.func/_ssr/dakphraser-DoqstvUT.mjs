import { o as __toESM } from "../_runtime.mjs";
import { G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn } from "./server-BEVvidUz.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
import { V as Copy, W as Check, c as Trash2, d as Sparkles, i as WandSparkles, j as LoaderCircle, v as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-DU74kRGD.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as useNetworkStatus } from "./router-hmf0KEm-.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as PageShell } from "./primitives-CKxsCs7-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dakphraser-DoqstvUT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var Input = objectType({
	text: stringType().min(1).max(8e3),
	tone: enumType([
		"standard",
		"formal",
		"casual",
		"concise",
		"expand",
		"academic",
		"creative"
	]),
	variants: numberType().int().min(1).max(4)
});
var paraphrase = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("ad37d9fc47f6a79fabbfe5416fd4db00c1cf31225883df2c5573bf774f640765"));
var _jsxFileName$1 = "/app/applet/src/components/omni/DakPhraser.tsx";
var TONES = [
	{
		id: "standard",
		label: "Standard"
	},
	{
		id: "formal",
		label: "Formal"
	},
	{
		id: "casual",
		label: "Casual"
	},
	{
		id: "concise",
		label: "Concise"
	},
	{
		id: "expand",
		label: "Expand"
	},
	{
		id: "academic",
		label: "Academic"
	},
	{
		id: "creative",
		label: "Creative"
	}
];
var words = (s) => s.trim() ? s.trim().split(/\s+/).length : 0;
function DakPhraser() {
	const { isOnline, checkConnection } = useNetworkStatus();
	const run = useServerFn(paraphrase);
	const [text, setText] = (0, import_react.useState)("");
	const [tone, setTone] = (0, import_react.useState)("standard");
	const [count, setCount] = (0, import_react.useState)(2);
	const [results, setResults] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(null);
	async function submit() {
		if (!text.trim() || busy) return;
		if (!isOnline) {
			setError("DakPhraser requires an active internet connection to generate AI paraphrases.");
			return;
		}
		setBusy(true);
		setError(null);
		setResults([]);
		try {
			const res = await run({ data: {
				text: text.trim(),
				tone,
				variants: count
			} });
			setResults(res.variants);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
		} finally {
			setBusy(false);
		}
	}
	async function copy(value, i) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(i);
			setTimeout(() => setCopied(null), 1600);
		} catch {
			setError("Clipboard access was blocked by your browser.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 lg:grid-cols-[1.05fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "plush-raised p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-base font-bold",
							children: "Your text"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: [words(text), " words"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 69,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 67,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value),
						rows: 10,
						maxLength: 8e3,
						placeholder: "Paste or type the text you want DakPhraser to rewrite…",
						className: "mt-3 w-full resize-y rounded-3xl bg-surface-2/70 p-4 text-sm leading-relaxed outline-none ring-primary/30 transition focus:ring-2"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 72,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Tone"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 81,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setTone(t.id),
							className: cn("rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95", tone === t.id ? "bg-primary-container text-primary-container-foreground" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
							children: t.label
						}, t.id, false, {
							fileName: _jsxFileName$1,
							lineNumber: 86,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Variants"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 101,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex gap-1.5",
						children: [
							1,
							2,
							3,
							4
						].map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setCount(n),
							className: cn("h-10 w-10 rounded-full text-sm font-bold transition active:scale-90", count === n ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
							children: n
						}, n, false, {
							fileName: _jsxFileName$1,
							lineNumber: 106,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 104,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: submit,
								disabled: busy || !text.trim(),
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
								children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 127,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 127,
									columnNumber: 70
								}, this), busy ? "Paraphrasing…" : "Paraphrase"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 122,
								columnNumber: 13
							}, this),
							results.length > 0 && !busy && /* @__PURE__ */ (void 0)("button", {
								onClick: submit,
								className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95",
								children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 135,
									columnNumber: 17
								}, this), " Regenerate"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 131,
								columnNumber: 15
							}, this),
							text && /* @__PURE__ */ (void 0)("button", {
								onClick: () => {
									setText("");
									setResults([]);
									setError(null);
								},
								className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold text-muted-foreground transition active:scale-95",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 147,
									columnNumber: 17
								}, this), " Clear"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 139,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 121,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 66,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					error && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive",
						children: error
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 155,
						columnNumber: 13
					}, this),
					!results.length && !busy && !error && /* @__PURE__ */ (void 0)("div", {
						className: "plush grid min-h-64 place-items-center p-8 text-center",
						children: /* @__PURE__ */ (void 0)("div", { children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
								children: /* @__PURE__ */ (void 0)(Sparkles, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 164,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 163,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-sm font-semibold",
								children: "Rewrites appear here"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 166,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Pick a tone, choose how many versions you want, then hit Paraphrase."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 167,
								columnNumber: 17
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 162,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 161,
						columnNumber: 13
					}, this),
					busy && Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (void 0)("div", {
						className: "plush animate-pulse space-y-2 p-5",
						children: [
							/* @__PURE__ */ (void 0)("div", { className: "h-3 w-1/3 rounded-full bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 177,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "h-3 w-full rounded-full bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 178,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "h-3 w-5/6 rounded-full bg-surface-2" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 179,
								columnNumber: 17
							}, this)
						]
					}, i, true, {
						fileName: _jsxFileName$1,
						lineNumber: 176,
						columnNumber: 15
					}, this)),
					results.map((r, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .06 },
						className: "plush p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-bold uppercase tracking-wide text-primary",
									children: ["Version ", i + 1]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 192,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => copy(r, i),
									className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-2 text-xs font-semibold transition active:scale-95",
									children: [copied === i ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 200,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 202,
										columnNumber: 21
									}, this), copied === i ? "Copied" : "Copy"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 195,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 191,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed",
								children: r
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 207,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [words(r), " words"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 208,
								columnNumber: 15
							}, this)
						]
					}, i, true, {
						fileName: _jsxFileName$1,
						lineNumber: 184,
						columnNumber: 13
					}, this))
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 153,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/dakphraser.tsx?tsr-split=component";
function DakPhraserPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageShell, {
		eyebrow: "DakPhraser",
		title: "Rewrite anything, in your tone",
		description: "Paste your text, choose a tone and let DakPhraser produce polished rewrites that keep your meaning intact.",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DakPhraser, {}, void 0, false, {
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
export { DakPhraserPage as component };
