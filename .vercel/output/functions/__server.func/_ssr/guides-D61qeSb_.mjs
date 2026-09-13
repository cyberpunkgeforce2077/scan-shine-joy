import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as SearchX, m as Search, t as X, z as Clock } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { h as searchGuides, m as guides } from "./router-QuomdOc7.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as SectionHeading, r as PlushCard } from "./primitives-CKxsCs7-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-D61qeSb_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/guides.tsx?tsr-split=component";
var CATEGORIES = ["All", ...Array.from(new Set(guides.map((g) => g.category)))];
function GuidesPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const results = (0, import_react.useMemo)(() => {
		const matched = searchGuides(query);
		return category === "All" ? matched : matched.filter((g) => g.category === category);
	}, [query, category]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Guides",
				title: "Fix it yourself, confidently",
				description: "Short, practical walkthroughs for everyday computer problems — no jargon, no fluff."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "plush flex items-center gap-3 rounded-2xl px-5 py-3 transition-shadow focus-within:shadow-[var(--shadow-plush-lg)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4.5 w-4.5 shrink-0 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 20,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search guides — try Wi-Fi, backup, slow…",
							"aria-label": "Search guides",
							className: "w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 21,
							columnNumber: 11
						}, this),
						query && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setQuery(""),
							"aria-label": "Clear search",
							className: "grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-surface-2 hover:text-foreground",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 23,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 22,
							columnNumber: 21
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setCategory(c),
					className: cn("min-h-10 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-200 active:scale-95", category === c ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
					children: c
				}, c, false, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 30
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 7
			}, this),
			results.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: results.map((guide, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PlushCard, {
					delay: Math.min(i, 8) * .06,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/guides/$slug",
						params: { slug: guide.slug },
						className: "flex h-full flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(guide.icon, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 40,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 39,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mt-4 text-lg font-bold leading-snug",
								children: guide.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 flex-1 text-sm text-muted-foreground",
								children: guide.excerpt
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-surface-2 px-2.5 py-1",
									children: guide.category
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 47,
											columnNumber: 21
										}, this),
										guide.minutes,
										" min read"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 46,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 15
					}, this)
				}, guide.slug, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 38
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 29
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "plush mx-auto mt-12 max-w-md p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchX, { className: "mx-auto h-10 w-10 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-4 text-lg font-bold",
						children: [
							"No guides match “",
							query,
							"”"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try a broader word — or ask the assistant for a personal answer."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							setQuery("");
							setCategory("All");
						},
						className: "mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition active:scale-95",
						children: "Show all guides"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { GuidesPage as component };
