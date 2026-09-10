import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { C as require_jsx_runtime, G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn } from "./server-B3ytGRYy.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-BoUwIbRd.mjs";
import { U as Check, g as RefreshCw, k as LoaderCircle, l as Sparkles, o as Trash2, r as WandSparkles, z as Copy } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as cn } from "./router-B_r7yHXA.mjs";
import { t as PageShell } from "./primitives-CX7J9ehW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dakphraser-UnWdAhwM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[1.05fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "plush-raised p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold",
						children: "Your text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-medium text-muted-foreground",
						children: [words(text), " words"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: text,
					onChange: (e) => setText(e.target.value),
					rows: 10,
					maxLength: 8e3,
					placeholder: "Paste or type the text you want DakPhraser to rewrite…",
					className: "mt-3 w-full resize-y rounded-3xl bg-surface-2/70 p-4 text-sm leading-relaxed outline-none ring-primary/30 transition focus:ring-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Tone"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTone(t.id),
						className: cn("rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95", tone === t.id ? "bg-primary-container text-primary-container-foreground" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
						children: t.label
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Variants"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-1.5",
					children: [
						1,
						2,
						3,
						4
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCount(n),
						className: cn("h-10 w-10 rounded-full text-sm font-bold transition active:scale-90", count === n ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: submit,
							disabled: busy || !text.trim(),
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4" }), busy ? "Paraphrasing…" : "Paraphrase"]
						}),
						results.length > 0 && !busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: submit,
							className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Regenerate"]
						}),
						text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setText("");
								setResults([]);
								setError(null);
							},
							className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold text-muted-foreground transition active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Clear"]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive",
					children: error
				}),
				!results.length && !busy && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "plush grid min-h-64 place-items-center p-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm font-semibold",
							children: "Rewrites appear here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Pick a tone, choose how many versions you want, then hit Paraphrase."
						})
					] })
				}),
				busy && Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plush animate-pulse space-y-2 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 rounded-full bg-surface-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded-full bg-surface-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 rounded-full bg-surface-2" })
					]
				}, i)),
				results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold uppercase tracking-wide text-primary",
								children: ["Version ", i + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => copy(r, i),
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-2 text-xs font-semibold transition active:scale-95",
								children: [copied === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), copied === i ? "Copied" : "Copy"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed",
							children: r
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [words(r), " words"]
						})
					]
				}, i))
			]
		})]
	});
}
function DakPhraserPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "DakPhraser",
		title: "Rewrite anything, in your tone",
		description: "Paste your text, choose a tone and let DakPhraser produce polished rewrites that keep your meaning intact.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DakPhraser, {})
	});
}
//#endregion
export { DakPhraserPage as component };
