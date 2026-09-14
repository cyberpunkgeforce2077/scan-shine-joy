import { r as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, G as require_react, x as useRouter, y as Link, z as isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, o as getServerFnById } from "./server-SmPc9qDA.mjs";
import { K as ArrowRight, O as LoaderCircle, _ as RefreshCw, d as ShieldCheck, r as WifiOff } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useNetworkStatus } from "./router-BhOmXnNM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OnlineRequiredBanner-Sk069-QD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function OnlineRequiredBanner({ featureName, description, compact = false, className = "", onRetrySuccess }) {
	const { isChecking, checkConnection } = useNetworkStatus();
	const handleRetry = async () => {
		if (await checkConnection()) {
			toast.success("Connection restored! You are back online.");
			onRetrySuccess?.();
		} else toast.error("Still offline. Please check your Wi-Fi or mobile data.");
	};
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#1e1f20] border border-amber-500/30 text-xs text-[#e3e3e3] ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-4 w-4 text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-amber-300",
					children: "Offline:"
				}),
				" ",
				featureName,
				" requires an internet connection."
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleRetry,
			disabled: isChecking,
			className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#e3e3e3] font-medium transition active:scale-95 disabled:opacity-50",
			children: [isChecking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-amber-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retry" })]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-3xl bg-[#1e1f20] border border-amber-500/30 p-6 sm:p-8 text-[#e3e3e3] shadow-xl ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-7 w-7 animate-pulse" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-[#e3e3e3]",
						children: "Internet connection required"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider",
						children: "Offline"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-[#c4c7c5] leading-relaxed",
					children: description || `${featureName} connects to cloud intelligence and requires an active internet connection.`
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleRetry,
					disabled: isChecking,
					className: "flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#1e1f20] px-5 py-2.5 text-sm font-semibold transition active:scale-95 disabled:opacity-60",
					children: [isChecking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Check connection"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2.5 text-sm font-medium text-[#e3e3e3] transition active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore offline tools" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto text-xs text-[#8e8e8e] hidden md:flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Local tools (QR, Scanner, OCR) remain fully functional" })]
				})
			]
		})]
	});
}
//#endregion
export { createSsrRpc as n, useServerFn as r, OnlineRequiredBanner as t };
