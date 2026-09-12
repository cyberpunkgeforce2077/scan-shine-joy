import { C as require_jsx_runtime, S as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageShell } from "./primitives-Cm9ujvXC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ocr-BNBkEJvt.js
var import_jsx_runtime = require_jsx_runtime();
function OcrPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "OCR",
		title: "Extract words from any document",
		description: "Snap or upload a page and get clean, editable text side by side with the original.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plush h-96" }) })
	});
}
//#endregion
export { OcrPage as component };
