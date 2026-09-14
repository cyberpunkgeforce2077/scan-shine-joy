import { r as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as LoaderCircle } from "../_libs/lucide-react.mjs";
import { g as supabase } from "./router-BhOmXnNM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-B3zYPrTt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallback() {
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(() => {
			setTimeout(() => {
				if (window.opener) window.close();
				else window.location.href = "/";
			}, 500);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen w-full items-center justify-center bg-black text-[#e3e3e3]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-[#8ab4f8]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium",
				children: "Completing sign in..."
			})]
		})
	});
}
//#endregion
export { AuthCallback as component };
