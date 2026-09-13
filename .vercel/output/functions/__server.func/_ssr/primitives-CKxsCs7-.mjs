import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-CKxsCs7-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/omni/primitives.tsx";
/** Card that gently expands and lifts as it scrolls into view / on hover. */
function PlushCard({ children, className, interactive = true, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-60px"
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
		className: cn("rounded-[24px] bg-[#1e1f20] group p-5 transition-[box-shadow,transform,border-color] duration-300 border border-transparent hover:border-white/10 shadow-sm", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
function SectionHeading({ eyebrow, title, description, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("max-w-2xl", className),
		children: [
			eyebrow && /* @__PURE__ */ (void 0)("span", {
				className: "inline-flex rounded-full bg-[#1e1f20] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8ab4f8]",
				children: eyebrow
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#e3e3e3] sm:text-4xl",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 7
			}, this),
			description && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 max-w-xl text-sm leading-relaxed text-[#c4c7c5] sm:text-[15px]",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 5
	}, this);
}
function PillButton({ children, variant = "primary", className, ...props }) {
	const variants = {
		primary: "bg-[#e3e3e3] text-[#1e1f20] shadow-sm hover:brightness-105 active:scale-[0.97]",
		tonal: "bg-[#1e1f20] text-[#e3e3e3] hover:brightness-[1.03] active:scale-[0.97]",
		ghost: "text-[#c4c7c5] hover:bg-white/10 hover:text-[#e3e3e3] active:scale-[0.97]",
		outline: "border border-white/10 bg-[#1e1f20] text-[#e3e3e3] hover:bg-white/10 active:scale-[0.97]"
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		...props,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50", variants[variant], className),
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 84,
		columnNumber: 5
	}, this);
}
function PageShell({ eyebrow, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto w-full max-w-6xl px-4 pb-32 pt-16 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.header, {
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
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				className: "mb-6 inline-flex min-h-8 items-center gap-2 rounded-full border border-white/10 bg-[#1e1f20] px-3.5 py-1 text-xs font-semibold text-[#c4c7c5] transition hover:border-white/20 hover:bg-white/10 hover:text-[#e3e3e3]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-3.5 w-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 11
				}, this), " Back to Home"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow,
				title,
				description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 110,
			columnNumber: 7
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 109,
		columnNumber: 5
	}, this);
}
//#endregion
export { SectionHeading as i, PillButton as n, PlushCard as r, PageShell as t };
