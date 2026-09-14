import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Clock, N as Lightbulb, X as ArrowLeft, Y as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { m as guides, n as Route } from "./router-C5t8w-YE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides_._slug-BLduvolL.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/guides_.$slug.tsx?tsr-split=component";
function GuidePage() {
	const guide = Route.useLoaderData();
	const Icon = guide.icon;
	const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/guides",
				className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 11,
					columnNumber: 9
				}, this), "All guides"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid h-14 w-14 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 18,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 17,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-[11px] font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-surface-2 px-3 py-1.5",
								children: guide.category
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 21,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 23,
										columnNumber: 15
									}, this),
									guide.minutes,
									" min read"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 20,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-6 text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl",
						children: guide.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: guide.excerpt
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "plush mt-9 space-y-9 p-6 sm:p-10",
				children: guide.sections.map((section) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-extrabold tracking-[-0.03em]",
						children: section.heading
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this),
					section.paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-[15px] leading-7 text-muted-foreground",
						children: p
					}, i, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 47
					}, this)),
					section.tips && /* @__PURE__ */ (void 0)("ul", {
						className: "mt-4 space-y-2 rounded-2xl bg-surface-2/70 p-4",
						children: section.tips.map((tip, i) => /* @__PURE__ */ (void 0)("li", {
							className: "flex gap-2.5 text-sm text-foreground",
							children: [/* @__PURE__ */ (void 0)(Lightbulb, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("span", { children: tip }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 21
							}, this)]
						}, i, true, {
							fileName: _jsxFileName,
							lineNumber: 41,
							columnNumber: 47
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 30
					}, this)
				] }, section.heading, true, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 40
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mt-14 text-lg font-bold",
				children: "Keep reading"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-3",
				children: related.map((g) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/guides/$slug",
					params: { slug: g.slug },
					className: "plush flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[var(--shadow-plush-lg)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid h-10 w-10 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(g.icon, { className: "h-4.5 w-4.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-3 text-sm font-bold leading-snug",
							children: g.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary",
							children: ["Read ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 20
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 13
						}, this)
					]
				}, g.slug, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 27
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 9,
		columnNumber: 10
	}, this);
}
//#endregion
export { GuidePage as component };
