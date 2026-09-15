import { r as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, G as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Mail, k as LogOut, t as X } from "../_libs/lucide-react.mjs";
import { i as useAuth } from "./router-BSOQQ5vt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BSEXaNcj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { profile, signOut, updateProfile } = useAuth();
	const [username, setUsername] = (0, import_react.useState)(profile?.username || "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (profile?.username) setUsername(profile.username);
	}, [profile]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background pt-20 px-4 pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-4 border border-black/10 dark:border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-foreground",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/" }),
					className: "p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-3xl",
							children: profile?.username?.charAt(0).toUpperCase() || "U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-sm font-medium text-primary hover:underline",
							children: "Change Logo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: "w-full rounded-xl bg-background px-4 py-3 text-foreground border border-black/10 dark:border-white/10 focus:border-primary focus:outline-none transition-colors"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: async () => {
								if (!username.trim() || username === profile?.username) return;
								setSaving(true);
								await updateProfile({ username: username.trim() });
								setSaving(false);
							},
							disabled: saving,
							className: "flex-1 rounded-full bg-foreground py-3 font-medium text-background hover:bg-foreground/90 transition-colors disabled:opacity-50",
							children: saving ? "Saving..." : "Save Changes"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							signOut();
							navigate({ to: "/" });
						},
						className: "w-full flex items-center justify-center gap-2 rounded-full border border-red-500/30 text-red-400 py-3 font-medium hover:bg-red-500/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-6 border border-black/10 dark:border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-foreground mb-4",
					children: "Contact Creator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mb-6",
					children: "Have feedback or need support? Reach out directly via email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "mailto:cyberpunkgeforce2077@gmail.com",
					className: "w-full flex items-center justify-center gap-2 rounded-full bg-surface-2 text-foreground py-3 font-medium hover:bg-surface-3 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" }), " cyberpunkgeforce2077@gmail.com"]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
