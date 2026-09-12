import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { C as require_jsx_runtime, G as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { X as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as cn } from "./router-Bvs9SwUi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-Cm9ujvXC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Card that gently expands and lifts as it scrolls into view / on hover. */
function PlushCard({ children, className, interactive = true, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-60px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y: 26,
			scale: .965
		},
		animate: inView ? {
			opacity: 1,
			y: 0,
			scale: 1
		} : {},
		transition: {
			duration: .6,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		whileHover: interactive ? {
			y: -4,
			scale: 1.008
		} : {},
		className: cn("plush group p-5 transition-[box-shadow,transform,border-color] duration-300 hover:border-primary/20 hover:shadow-[var(--shadow-plush-lg)]", className),
		children
	});
}
function SectionHeading({ eyebrow, title, description, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("max-w-2xl", className),
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex rounded-full border border-primary/10 bg-primary-container px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary-container-foreground",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-extrabold tracking-[-0.045em] text-foreground sm:text-4xl",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]",
				children: description
			})
		]
	});
}
function PillButton({ children, variant = "primary", className, ...props }) {
	const variants = {
		primary: "bg-primary text-primary-foreground shadow-[var(--shadow-plush)] hover:brightness-105",
		tonal: "bg-primary-container text-primary-container-foreground hover:brightness-[1.03]",
		ghost: "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
		outline: "border border-border bg-card/70 text-foreground hover:bg-surface-2"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold tracking-[-0.01em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50", variants[variant], className),
		children
	});
}
function PageShell({ eyebrow, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-6 inline-flex items-center gap-2 text-xs font-bold text-muted-foreground transition hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Ask Vladimir"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow,
				title,
				description
			})]
		}), children]
	});
}
//#endregion
export { SectionHeading as i, PillButton as n, PlushCard as r, PageShell as t };
