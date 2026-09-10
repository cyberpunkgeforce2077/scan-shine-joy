import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { C as require_jsx_runtime, G as require_react, S as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PillButton, t as PageShell } from "./primitives-CX7J9ehW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-Drde9uvi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QRPage() {
	const [tab, setTab] = (0, import_react.useState)("create");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		eyebrow: "QR Studio",
		title: "Create and scan QR codes",
		description: "Styled generation with logos and gradients, plus camera and file scanning — all local to your device.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-7 flex gap-2 rounded-2xl border border-border/70 bg-card/65 p-1.5 shadow-sm",
			children: ["create", "scan"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
				variant: tab === t ? "primary" : "outline",
				onClick: () => setTab(t),
				className: "flex-1 capitalize",
				children: t
			}, t))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plush h-96" }) })]
	});
}
//#endregion
export { QRPage as component };
