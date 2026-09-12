import { C as require_jsx_runtime, S as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageShell } from "./primitives-DIajX1f6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scanner-D3pSIz5O.js
var import_jsx_runtime = require_jsx_runtime();
function ScannerPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "Doc Scanner",
		title: "Turn photos into clean documents",
		description: "Capture or upload pages, apply the crisp document look, reorder them, then export a single PDF.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plush h-96" }) })
	});
}
//#endregion
export { ScannerPage as component };
