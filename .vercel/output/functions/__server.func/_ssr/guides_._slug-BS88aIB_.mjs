import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Clock, X as ArrowLeft, Y as ArrowRight, j as Lightbulb } from "../_libs/lucide-react.mjs";
import { n as Route, o as guides } from "./router-DF7gd-Cq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides_._slug-BS88aIB_.js
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	const guide = Route.useLoaderData();
	const Icon = guide.icon;
	const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guides",
				className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "All guides"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-14 w-14 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px] font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-surface-2 px-3 py-1.5",
								children: guide.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
									guide.minutes,
									" min read"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl",
						children: guide.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: guide.excerpt
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plush mt-9 space-y-9 p-6 sm:p-10",
				children: guide.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold tracking-[-0.03em]",
						children: section.heading
					}),
					section.paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[15px] leading-7 text-muted-foreground",
						children: p
					}, i)),
					section.tips && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 rounded-2xl bg-surface-2/70 p-4",
						children: section.tips.map((tip, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2.5 text-sm text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tip })]
						}, i))
					})
				] }, section.heading))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 text-lg font-bold",
				children: "Keep reading"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-3",
				children: related.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/guides/$slug",
					params: { slug: g.slug },
					className: "plush flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[var(--shadow-plush-lg)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "h-4.5 w-4.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-sm font-bold leading-snug",
							children: g.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary",
							children: ["Read ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})
					]
				}, g.slug))
			})
		]
	});
}
//#endregion
export { GuidePage as component };
