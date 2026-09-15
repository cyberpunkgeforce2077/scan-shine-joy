import { r as __toESM } from "../_runtime.mjs";
import { G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { g as supabase } from "./router-DiDWxjXO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-NXNSLUdY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.callback.tsx?tsr-split=component";
function AuthCallback() {
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(() => {
			setTimeout(() => {
				if (window.opener) window.close();
				else window.location.href = "/";
			}, 500);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-screen w-full items-center justify-center bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-lg font-medium",
				children: "Completing sign in..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthCallback as component };
