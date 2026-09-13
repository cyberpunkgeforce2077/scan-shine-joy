import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, x as useRouter, y as Link, z as isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, o as getServerFnById } from "./server-DblU4vTt.mjs";
import { K as ArrowRight, O as LoaderCircle, _ as RefreshCw, d as ShieldCheck, r as WifiOff } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useNetworkStatus } from "./router-QuomdOc7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OnlineRequiredBanner-qobfX0xX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _jsxFileName = "/app/applet/src/components/omni/OnlineRequiredBanner.tsx";
function OnlineRequiredBanner({ featureName, description, compact = false, className = "", onRetrySuccess }) {
	const { isChecking, checkConnection } = useNetworkStatus();
	const handleRetry = async () => {
		if (await checkConnection()) {
			toast.success("Connection restored! You are back online.");
			onRetrySuccess?.();
		} else toast.error("Still offline. Please check your Wi-Fi or mobile data.");
	};
	if (compact) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#1e1f20] border border-amber-500/30 text-xs text-[#e3e3e3] ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WifiOff, { className: "h-4 w-4 text-amber-400 shrink-0" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
					className: "text-amber-300",
					children: "Offline:"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 13
				}, this),
				" ",
				featureName,
				" requires an internet connection."
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: handleRetry,
			disabled: isChecking,
			className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#e3e3e3] font-medium transition active:scale-95 disabled:opacity-50",
			children: [isChecking ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3 w-3 animate-spin text-amber-400" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-3 w-3" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retry" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-3xl bg-[#1e1f20] border border-amber-500/30 p-6 sm:p-8 text-[#e3e3e3] shadow-xl ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WifiOff, { className: "h-7 w-7 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-lg font-bold text-[#e3e3e3]",
						children: "Internet connection required"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider",
						children: "Offline"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-[#c4c7c5] leading-relaxed",
					children: description || `${featureName} connects to cloud intelligence and requires an active internet connection.`
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: handleRetry,
					disabled: isChecking,
					className: "flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#1e1f20] px-5 py-2.5 text-sm font-semibold transition active:scale-95 disabled:opacity-60",
					children: [isChecking ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 13
					}, this), "Check connection"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2.5 text-sm font-medium text-[#e3e3e3] transition active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Explore offline tools" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "ml-auto text-xs text-[#8e8e8e] hidden md:flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Local tools (QR, Scanner, OCR) remain fully functional" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 84,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 63,
		columnNumber: 5
	}, this);
}
//#endregion
export { createSsrRpc as n, useServerFn as r, OnlineRequiredBanner as t };
