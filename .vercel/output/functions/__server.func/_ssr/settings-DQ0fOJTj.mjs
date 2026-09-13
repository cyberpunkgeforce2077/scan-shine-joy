import { r as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, G as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as LogOut, T as Mail, t as X } from "../_libs/lucide-react.mjs";
import { r as useAuth } from "./router-Cg81w7KV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DQ0fOJTj.js
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
		className: "flex min-h-screen flex-col bg-[#000000] pt-20 px-4 pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-4 border border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-[#e3e3e3]",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/" }),
					className: "p-2 text-[#8e8e8e] hover:text-[#e3e3e3] transition-colors rounded-full hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-20 w-20 place-items-center rounded-full bg-[#D7A2F6] text-[#202124] font-bold text-3xl",
							children: profile?.username?.charAt(0).toUpperCase() || "U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-sm font-medium text-[#8ab4f8] hover:underline",
							children: "Change Logo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium text-[#c4c7c5]",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: "w-full rounded-xl bg-[#000000] px-4 py-3 text-[#e3e3e3] border border-white/10 focus:border-[#8ab4f8] focus:outline-none transition-colors"
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
							className: "flex-1 rounded-full bg-[#e3e3e3] py-3 font-medium text-[#1e1f20] hover:bg-white transition-colors disabled:opacity-50",
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
			className: "mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-6 border border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-[#e3e3e3] mb-4",
					children: "Contact Creator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[#c4c7c5] mb-6",
					children: "Have feedback or need support? Reach out directly via email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "mailto:cyberpunkgeforce2077@gmail.com",
					className: "w-full flex items-center justify-center gap-2 rounded-full bg-[#282a2c] text-[#e3e3e3] py-3 font-medium hover:bg-[#333538] transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" }), " cyberpunkgeforce2077@gmail.com"]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
