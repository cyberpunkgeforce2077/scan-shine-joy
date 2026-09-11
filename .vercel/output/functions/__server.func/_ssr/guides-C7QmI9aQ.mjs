import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { C as require_jsx_runtime, G as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Clock, m as SearchX, p as Search, t as X } from "../_libs/lucide-react.mjs";
import { o as guides, r as cn, s as searchGuides } from "./router-CFXhTJTK.mjs";
import { i as SectionHeading, r as PlushCard } from "./primitives-Cgutrqag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-C7QmI9aQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = ["All", ...Array.from(new Set(guides.map((g) => g.category)))];
function GuidesPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const results = (0, import_react.useMemo)(() => {
		const matched = searchGuides(query);
		return category === "All" ? matched : matched.filter((g) => g.category === category);
	}, [query, category]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Guides",
				title: "Fix it yourself, confidently",
				description: "Short, practical walkthroughs for everyday computer problems — no jargon, no fluff."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plush flex items-center gap-3 rounded-2xl px-5 py-3 transition-shadow focus-within:shadow-[var(--shadow-plush-lg)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4.5 w-4.5 shrink-0 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search guides — try Wi-Fi, backup, slow…",
							"aria-label": "Search guides",
							className: "w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setQuery(""),
							"aria-label": "Clear search",
							className: "grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-surface-2 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setCategory(c),
					className: cn("min-h-10 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-200 active:scale-95", category === c ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]" : "bg-surface-2/80 text-muted-foreground hover:text-foreground"),
					children: c
				}, c))
			}),
			results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: results.map((guide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlushCard, {
					delay: Math.min(i, 8) * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/guides/$slug",
						params: { slug: guide.slug },
						className: "flex h-full flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(guide.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-bold leading-snug",
								children: guide.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 flex-1 text-sm text-muted-foreground",
								children: guide.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-surface-2 px-2.5 py-1",
									children: guide.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										guide.minutes,
										" min read"
									]
								})]
							})
						]
					})
				}, guide.slug))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plush mx-auto mt-12 max-w-md p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 text-lg font-bold",
						children: [
							"No guides match “",
							query,
							"”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try a broader word — or ask the assistant for a personal answer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setQuery("");
							setCategory("All");
						},
						className: "mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition active:scale-95",
						children: "Show all guides"
					})
				]
			})
		]
	});
}
//#endregion
export { GuidesPage as component };
