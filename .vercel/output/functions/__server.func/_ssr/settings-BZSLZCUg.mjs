import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as LogOut, t as X, w as Mail } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as useAuth } from "./router-DUrBuFLi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BZSLZCUg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/settings.tsx?tsr-split=component";
function SettingsPage() {
	const { profile, signOut, updateProfile } = useAuth();
	const [username, setUsername] = (0, import_react.useState)(profile?.username || "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (profile?.username) setUsername(profile.username);
	}, [profile]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen flex-col bg-[#000000] pt-20 px-4 pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-4 border border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-semibold text-[#e3e3e3]",
					children: "Settings"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/" }),
					className: "p-2 text-[#8e8e8e] hover:text-[#e3e3e3] transition-colors rounded-full hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid h-20 w-20 place-items-center rounded-full bg-[#D7A2F6] text-[#202124] font-bold text-3xl",
							children: profile?.username?.charAt(0).toUpperCase() || "U"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "text-sm font-medium text-[#8ab4f8] hover:underline",
							children: "Change Logo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-sm font-medium text-[#c4c7c5]",
							children: "Name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: "w-full rounded-xl bg-[#000000] px-4 py-3 text-[#e3e3e3] border border-white/10 focus:border-[#8ab4f8] focus:outline-none transition-colors"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-3 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: async () => {
								if (!username.trim() || username === profile?.username) return;
								setSaving(true);
								await updateProfile({ username: username.trim() });
								setSaving(false);
							},
							disabled: saving,
							className: "flex-1 rounded-full bg-[#e3e3e3] py-3 font-medium text-[#1e1f20] hover:bg-white transition-colors disabled:opacity-50",
							children: saving ? "Saving..." : "Save Changes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 42,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							signOut();
							navigate({ to: "/" });
						},
						className: "w-full flex items-center justify-center gap-2 rounded-full border border-red-500/30 text-red-400 py-3 font-medium hover:bg-red-500/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 13
						}, this), " Sign out"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-6 border border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-semibold text-[#e3e3e3] mb-4",
					children: "Contact Creator"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-[#c4c7c5] mb-6",
					children: "Have feedback or need support? Reach out directly via email."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: "mailto:cyberpunkgeforce2077@gmail.com",
					className: "w-full flex items-center justify-center gap-2 rounded-full bg-[#282a2c] text-[#e3e3e3] py-3 font-medium hover:bg-[#333538] transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this), " cyberpunkgeforce2077@gmail.com"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
