import { x as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as PageShell } from "./primitives-KMHgUwZj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music-DCf55FXH.js
var import_jsx_runtime = require_jsx_runtime();
function MusicPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "Headliner AI",
		title: "Turn Words Into Music",
		description: "Type a description or mood and synthesize full polyphonic beats, ambient soundscapes, and original songs instantly.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "plush h-96" }) })
	});
}
//#endregion
export { MusicPage as component };
