import { r as __toESM } from "../_runtime.mjs";
import { G as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Mail, k as LogOut, t as X } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as useAuth } from "./router-DugpHCLv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BPrhavIX.js
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
		className: "flex min-h-screen flex-col bg-background pt-20 px-4 pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-4 border border-black/10 dark:border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-semibold text-foreground",
					children: "Settings"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/" }),
					className: "p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10",
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
							className: "grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-3xl",
							children: profile?.username?.charAt(0).toUpperCase() || "U"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "text-sm font-medium text-primary hover:underline",
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
							className: "text-sm font-medium text-muted-foreground",
							children: "Name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: "w-full rounded-xl bg-background px-4 py-3 text-foreground border border-black/10 dark:border-white/10 focus:border-primary focus:outline-none transition-colors"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
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
							className: "flex-1 rounded-full bg-foreground py-3 font-medium text-background hover:bg-foreground/90 transition-colors disabled:opacity-50",
							children: saving ? "Saving..." : "Save Changes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 43,
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
							lineNumber: 62,
							columnNumber: 13
						}, this), " Sign out"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 56,
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
			className: "mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-6 border border-black/10 dark:border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-semibold text-foreground mb-4",
					children: "Contact Creator"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mb-6",
					children: "Have feedback or need support? Reach out directly via email."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: "mailto:cyberpunkgeforce2077@gmail.com",
					className: "w-full flex items-center justify-center gap-2 rounded-full bg-surface-2 text-foreground py-3 font-medium hover:bg-surface-3 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 11
					}, this), " cyberpunkgeforce2077@gmail.com"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 67,
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
