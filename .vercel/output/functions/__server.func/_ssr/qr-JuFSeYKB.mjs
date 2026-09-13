import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, S as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as PillButton, t as PageShell } from "./primitives-Bdr2XZvz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-JuFSeYKB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/qr.tsx?tsr-split=component";
function QRPage() {
	const [tab, setTab] = (0, import_react.useState)("create");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageShell, {
		eyebrow: "QR Studio",
		title: "Create and scan QR codes",
		description: "Styled generation with logos and gradients, plus camera and file scanning — all local to your device.",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-7 flex gap-2 rounded-2xl border border-white/10 bg-[#1e1f20] p-1.5 shadow-sm",
			children: ["create", "scan"].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PillButton, {
				variant: tab === t ? "primary" : "outline",
				onClick: () => setTab(t),
				className: "flex-1 capitalize",
				children: t
			}, t, false, {
				fileName: _jsxFileName,
				lineNumber: 8,
				columnNumber: 49
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 7,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "plush h-96" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 29
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 10
	}, this);
}
//#endregion
export { QRPage as component };
