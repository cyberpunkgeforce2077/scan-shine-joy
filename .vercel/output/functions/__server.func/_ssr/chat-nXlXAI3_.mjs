import { r as __toESM } from "../_runtime.mjs";
import { G as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn } from "./server-DblU4vTt.mjs";
import { a as stringType, i as objectType, n as enumType, t as arrayType } from "../_libs/zod.mjs";
import { C as MessageSquare, K as ArrowRight, R as Copy, S as MicOff, U as Bot, V as Check, c as Trash2, m as Search, p as SendHorizontal, t as X, u as Sparkles, x as Mic, y as Plus, z as Clock } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as createNewConversation, c as getConversation, d as searchConversations, f as setActiveConversationId, l as listConversations, o as deleteConversation, p as syncConversationsWithSupabase, r as useNetworkStatus, s as getActiveConversationId, u as saveConversation } from "./router-QuomdOc7.mjs";
import { n as createSsrRpc, r as useServerFn, t as OnlineRequiredBanner } from "./OnlineRequiredBanner-qobfX0xX.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-nXlXAI3_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var MessageSchema = objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().min(1).max(4e3),
	images: arrayType(objectType({
		data: stringType().min(1),
		mime: stringType().min(1)
	})).max(4).optional()
});
var Input = objectType({ messages: MessageSchema.array().min(1).max(20) });
/** Public assistant — no sign-in required. */
var askAssistant = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("27da268bb0f60c91c31c1d6ee9a955fbefc393d080d285bc0f1bb193e0e91f4c"));
var TitleInput = objectType({ prompt: stringType().min(1).max(1e3) });
var askTitle = createServerFn({ method: "POST" }).inputValidator((data) => TitleInput.parse(data)).handler(createSsrRpc("403e6fc7056360f2335111efcf60abddbd95ba4ce54e505cdd70f7bf1a0b74e6"));
var _jsxFileName$3 = "/app/applet/src/components/omni/FormattedText.tsx";
function FormattedText({ content }) {
	const parts = content.split(/(```[\s\S]*?```)/g);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3 text-[14px] leading-relaxed text-foreground/95",
		children: parts.map((part, index) => {
			if (part.startsWith("```") && part.endsWith("```")) {
				const lines = part.slice(3, -3).trim().split("\n");
				const firstLine = lines[0]?.trim() || "";
				const isLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
				const language = isLang ? firstLine : "code";
				const code = isLang ? lines.slice(1).join("\n") : lines.join("\n");
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CodeSnippet, {
					code,
					language
				}, index, false, {
					fileName: _jsxFileName$3,
					lineNumber: 18,
					columnNumber: 18
				}, this);
			}
			const paragraphs = part.split(/\n\n+/);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: paragraphs.map((p, pIdx) => {
					const trimmed = p.trim();
					if (!trimmed) return null;
					if (trimmed.startsWith("### ")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "font-display text-base font-semibold text-foreground pt-2",
						children: trimmed.slice(4)
					}, pIdx, false, {
						fileName: _jsxFileName$3,
						lineNumber: 32,
						columnNumber: 19
					}, this);
					if (trimmed.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-lg font-semibold text-foreground pt-2",
						children: trimmed.slice(3)
					}, pIdx, false, {
						fileName: _jsxFileName$3,
						lineNumber: 42,
						columnNumber: 19
					}, this);
					if (trimmed.startsWith("# ")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl font-bold text-foreground pt-3",
						children: trimmed.slice(2)
					}, pIdx, false, {
						fileName: _jsxFileName$3,
						lineNumber: 52,
						columnNumber: 19
					}, this);
					if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
						const items = trimmed.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, ""));
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "list-disc space-y-1 pl-5 text-sm leading-relaxed",
							children: items.map((item, iIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineMarkdown, { text: item }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 67,
								columnNumber: 25
							}, this) }, iIdx, false, {
								fileName: _jsxFileName$3,
								lineNumber: 66,
								columnNumber: 23
							}, this))
						}, pIdx, false, {
							fileName: _jsxFileName$3,
							lineNumber: 64,
							columnNumber: 19
						}, this);
					}
					if (/^\d+\.\s+/.test(trimmed)) {
						const items = trimmed.split(/\n\d+\.\s+/).map((item) => item.replace(/^\d+\.\s+/, ""));
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
							className: "list-decimal space-y-1 pl-5 text-sm leading-relaxed",
							children: items.map((item, iIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineMarkdown, { text: item }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 83,
								columnNumber: 25
							}, this) }, iIdx, false, {
								fileName: _jsxFileName$3,
								lineNumber: 82,
								columnNumber: 23
							}, this))
						}, pIdx, false, {
							fileName: _jsxFileName$3,
							lineNumber: 80,
							columnNumber: 19
						}, this);
					}
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineMarkdown, { text: trimmed }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 92,
							columnNumber: 19
						}, this)
					}, pIdx, false, {
						fileName: _jsxFileName$3,
						lineNumber: 91,
						columnNumber: 17
					}, this);
				})
			}, index, false, {
				fileName: _jsxFileName$3,
				lineNumber: 24,
				columnNumber: 11
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
function InlineMarkdown({ text }) {
	const segments = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: segments.map((segment, i) => {
		if (segment.startsWith("`") && segment.endsWith("`") && segment.length > 2) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
			className: "rounded-md border border-border/80 bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-foreground",
			children: segment.slice(1, -1)
		}, i, false, {
			fileName: _jsxFileName$3,
			lineNumber: 112,
			columnNumber: 13
		}, this);
		if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
			className: "font-bold text-foreground",
			children: segment.slice(2, -2)
		}, i, false, {
			fileName: _jsxFileName$3,
			lineNumber: 122,
			columnNumber: 13
		}, this);
		return segment;
	}) }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 108,
		columnNumber: 5
	}, this);
}
function CodeSnippet({ code, language }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = () => {
		navigator.clipboard?.writeText(code);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "group relative my-3 overflow-hidden rounded-2xl border border-border/90 bg-surface-1 shadow-[var(--shadow-plush)]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between border-b border-border/80 bg-surface-2/70 px-4 py-2 text-[11px] font-bold text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "uppercase tracking-wider text-primary",
				children: language
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 145,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: copy,
				className: "inline-flex min-h-7 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-surface-3 hover:text-foreground active:scale-95",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5 text-sage" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 151,
					columnNumber: 21
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 151,
					columnNumber: 67
				}, this), copied ? "Copied" : "Copy"]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 146,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 144,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
			className: "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: code }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 156,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 155,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 143,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/omni/ConversationSearchModal.tsx";
function ConversationSearchModal({ open, onClose, onSelectConversation, onNewChat }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const inputRef = (0, import_react.useRef)(null);
	const refreshList = () => {
		setConversations(listConversations());
	};
	(0, import_react.useEffect)(() => {
		if (open) {
			refreshList();
			setQuery("");
			setTimeout(() => inputRef.current?.focus(), 60);
		}
	}, [open]);
	(0, import_react.useEffect)(() => {
		const handleUpdate = () => refreshList();
		window.addEventListener("omni-conversations-updated", handleUpdate);
		return () => window.removeEventListener("omni-conversations-updated", handleUpdate);
	}, []);
	const searchResults = (0, import_react.useMemo)(() => {
		return searchConversations(query, conversations);
	}, [query, conversations]);
	const handleSelect = (conv) => {
		setActiveConversationId(conv.id);
		onSelectConversation?.(conv);
		onClose();
	};
	const handleDelete = (e, convId) => {
		e.stopPropagation();
		deleteConversation(convId);
		toast.success("Conversation deleted");
		refreshList();
	};
	const handleCreateNew = () => {
		const newConv = createNewConversation();
		onNewChat?.();
		onSelectConversation?.(newConv);
		onClose();
	};
	const formatTime = (timestamp) => {
		const diff = Date.now() - timestamp;
		if (diff < 6e4) return "Just now";
		if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
		if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
		return new Date(timestamp).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		});
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "search-conversations-title",
		className: "fixed inset-0 z-[70] flex items-start justify-center p-3 pt-16 sm:p-6 sm:pt-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "fixed inset-0 bg-background/70 backdrop-blur-md transition-opacity",
			onClick: onClose
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 90,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative flex max-h-[80vh] w-full max-w-2xl flex-col rounded-3xl border border-border/90 bg-card/95 shadow-[var(--shadow-plush-lg)] backdrop-blur-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/70 p-3 sm:p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-container text-primary shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 100,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 99,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							ref: inputRef,
							type: "text",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Escape") onClose();
								if (e.key === "Enter" && searchResults[0]) handleSelect(searchResults[0].conversation);
							},
							placeholder: "Search past AI conversations, topics, or code…",
							className: "flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 102,
							columnNumber: 11
						}, this),
						query && /* @__PURE__ */ (void 0)("button", {
							onClick: () => setQuery(""),
							className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: onClose,
							className: "grid h-8 w-8 place-items-center rounded-xl text-muted-foreground hover:bg-surface-2 hover:text-foreground active:scale-95",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 128,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 124,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-border/60 bg-surface-1/50 px-4 py-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-muted-foreground",
						children: query ? `${searchResults.length} match${searchResults.length === 1 ? "" : "es"}` : `${conversations.length} saved conversation${conversations.length === 1 ? "" : "s"}`
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 134,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: handleCreateNew,
						className: "inline-flex items-center gap-1.5 rounded-lg font-bold text-primary hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 143,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "New Topic" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 144,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 133,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-2 space-y-1 sm:p-3",
					children: searchResults.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center justify-center py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 153,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 152,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-sm font-semibold text-foreground",
								children: query ? "No matching conversations found" : "No past conversations yet"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 155,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground max-w-xs",
								children: query ? "Try searching for a different keyword or prompt." : "Start chatting to save your consultations automatically."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 158,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleCreateNew,
								className: "mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:brightness-105",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 167,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Start fresh conversation" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 168,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 163,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 151,
						columnNumber: 13
					}, this) : searchResults.map(({ conversation: conv, matchedSnippet }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => handleSelect(conv),
						className: "group flex cursor-pointer items-start justify-between gap-3 rounded-2xl border border-transparent p-3 transition hover:border-primary/30 hover:bg-surface-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-3 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-surface-2 text-muted-foreground group-hover:bg-primary-container group-hover:text-primary transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 180,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 179,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "truncate text-xs font-bold text-foreground sm:text-sm",
											children: conv.title
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 184,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground",
											children: [
												conv.messages.length,
												" msg",
												conv.messages.length === 1 ? "" : "s"
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 187,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 183,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed",
										children: matchedSnippet
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 192,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-2 flex items-center gap-3 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 198,
												columnNumber: 25
											}, this), formatTime(conv.updatedAt)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 197,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5",
											children: ["Open ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 202,
												columnNumber: 30
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 201,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 196,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 182,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 178,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"aria-label": "Delete conversation",
							onClick: (e) => handleDelete(e, conv.id),
							title: "Delete conversation",
							className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground opacity-60 hover:bg-destructive/10 hover:text-destructive hover:opacity-100 transition active:scale-95",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 215,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 208,
							columnNumber: 17
						}, this)]
					}, conv.id, true, {
						fileName: _jsxFileName$2,
						lineNumber: 173,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 149,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-t border-border/70 px-4 py-2.5 text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3 w-3 text-amber" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 225,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Encrypted in-browser storage" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 226,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 224,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-[10px]",
						children: "ESC to close"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 228,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 223,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 96,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 83,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/omni/ChatHome.tsx";
function ChatHome({ resetKey = 0 }) {
	const { isOnline, checkConnection } = useNetworkStatus();
	const ask = useServerFn(askAssistant);
	const getTitle = useServerFn(askTitle);
	const [activeConvId, setActiveConvId] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [copiedIndex, setCopiedIndex] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		syncConversationsWithSupabase();
		const activeId = getActiveConversationId();
		if (activeId) {
			const found = getConversation(activeId);
			if (found) {
				setActiveConvId(found.id);
				setMessages(found.messages);
			}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const handleConvChanged = (e) => {
			const targetId = e.detail?.id;
			if (targetId) {
				const found = getConversation(targetId);
				if (found) {
					setActiveConvId(found.id);
					setMessages(found.messages);
				}
			} else {
				setActiveConvId(null);
				setMessages([]);
			}
		};
		const handleOpenSearch = () => setSearchOpen(true);
		const handleNewChat = () => {
			setActiveConvId(null);
			setMessages([]);
			setActiveConversationId(null);
			inputRef.current?.focus({ preventScroll: true });
		};
		window.addEventListener("omni-conversation-changed", handleConvChanged);
		window.addEventListener("omni-open-search", handleOpenSearch);
		window.addEventListener("omni-new-chat", handleNewChat);
		return () => {
			window.removeEventListener("omni-conversation-changed", handleConvChanged);
			window.removeEventListener("omni-open-search", handleOpenSearch);
			window.removeEventListener("omni-new-chat", handleNewChat);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (resetKey === 0) return;
		setActiveConvId(null);
		setMessages([]);
		setActiveConversationId(null);
		inputRef.current?.focus({ preventScroll: true });
	}, [resetKey]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const handleSelectConversation = (conv) => {
		setActiveConvId(conv.id);
		setMessages(conv.messages);
		setActiveConversationId(conv.id);
		setSearchOpen(false);
	};
	const toggleVoice = (0, import_react.useCallback)(() => {
		if (listening) {
			recognitionRef.current?.stop();
			return;
		}
		const win = window;
		const Ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
		if (!Ctor) {
			toast.error("Voice input isn't supported in this browser.");
			return;
		}
		const rec = new Ctor();
		rec.lang = "en-US";
		rec.interimResults = true;
		rec.continuous = false;
		const finalText = input;
		rec.onresult = (e) => {
			let interim = "";
			for (let i = e.resultIndex; i < e.results.length; i++) interim += e.results[i]?.[0]?.transcript ?? "";
			setInput(finalText + interim);
		};
		rec.onerror = () => {
			setListening(false);
		};
		rec.onend = () => {
			setListening(false);
			recognitionRef.current = null;
		};
		recognitionRef.current = rec;
		setListening(true);
		rec.start();
	}, [listening, input]);
	async function send(text) {
		const question = text.trim();
		if (!question || busy) return;
		if (!isOnline) {
			toast.error("Vlad Bot requires an active internet connection. Please check your network or use offline tools.");
			return;
		}
		const userMsg = {
			role: "user",
			content: question,
			timestamp: Date.now()
		};
		let targetConvId = activeConvId;
		let baseMessages = messages;
		if (!targetConvId) {
			targetConvId = createNewConversation(question).id;
			setActiveConvId(targetConvId);
			setActiveConversationId(targetConvId);
			baseMessages = [];
		}
		const next = [...baseMessages, userMsg];
		setMessages(next);
		setInput("");
		setBusy(true);
		try {
			const { reply } = await ask({ data: { messages: next.slice(-10).map((m) => ({
				role: m.role,
				content: m.content
			})) } });
			const assistantMsg = {
				role: "assistant",
				content: reply,
				timestamp: Date.now()
			};
			const finalMessages = [...next, assistantMsg];
			setMessages(finalMessages);
			const existingConv = getConversation(targetConvId);
			if (existingConv) {
				const titleToSave = existingConv.title;
				if (baseMessages.length === 0) getTitle({ data: { prompt: question } }).then((res) => {
					const conv = getConversation(targetConvId);
					if (conv) saveConversation({
						...conv,
						title: res.title
					});
				}).catch(() => {});
				saveConversation({
					...existingConv,
					messages: finalMessages,
					title: titleToSave
				});
			}
		} catch (err) {
			toast.error("Error generating response.");
			setMessages(next);
		} finally {
			setBusy(false);
			inputRef.current?.focus();
		}
	}
	const empty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "flex min-h-screen w-full flex-col pt-12 pb-32",
		children: [
			!isOnline && /* @__PURE__ */ (void 0)("div", {
				className: "mx-auto w-full max-w-2xl px-4 pt-2 pb-4",
				children: /* @__PURE__ */ (void 0)(OnlineRequiredBanner, {
					featureName: "Vlad Bot",
					offlineAlternative: "Your offline chat history is still available, and you can freely use on-device tools (QR Code Studio, Document Scanner, Local OCR).",
					onRetry: () => void checkConnection()
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 235,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 234,
				columnNumber: 9
			}, this),
			empty ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col items-center justify-center -mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center gap-2 mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-center text-4xl sm:text-5xl font-medium tracking-tight text-[#e3e3e3]",
						children: "What can I help with today?"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 247,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[#8ab4f8] font-medium text-lg tracking-wide",
						children: "Vlad Bot"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 250,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 246,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 244,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-4xl px-4 flex-1 space-y-8 pb-32 pt-8",
				children: [
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start"),
						children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-[85%] rounded-3xl rounded-tr-md bg-[#282a2c] px-5 py-3.5 text-[15px] leading-relaxed text-[#e3e3e3]",
							children: m.content
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 261,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full text-[15px] leading-relaxed text-[#e3e3e3]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid h-8 w-8 place-items-center rounded-full bg-[#1e1f20] text-[#8e8e8e] shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bot, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 268,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 267,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 overflow-x-hidden min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormattedText, { content: m.content }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 271,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-4 flex gap-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => {
												navigator.clipboard?.writeText(m.content);
												setCopiedIndex(i);
												window.setTimeout(() => setCopiedIndex(null), 1600);
											},
											className: "grid h-8 w-8 place-items-center rounded-full hover:bg-[#282a2c] text-[#c4c7c5] transition",
											children: copiedIndex === i ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4 text-green-400" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 282,
												columnNumber: 29
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 284,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 273,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 272,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 270,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 266,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 265,
							columnNumber: 17
						}, this)
					}, i, false, {
						fileName: _jsxFileName$1,
						lineNumber: 256,
						columnNumber: 13
					}, this)),
					busy && /* @__PURE__ */ (void 0)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (void 0)("div", { className: "h-8 w-8 rounded-full bg-gradient-to-tr from-[#D7A2F6] to-[#8FA2ED] animate-spin shrink-0" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 297,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { className: "h-4 w-32 mt-2 rounded bg-[#282a2c] animate-pulse" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 298,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 296,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: endRef }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 301,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 254,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#000000] via-[#000000] to-transparent pb-6 pt-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						send(input);
					},
					className: "mx-auto w-full max-w-[800px] px-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-h-[56px] w-full items-end gap-3 rounded-[28px] bg-[#1e1f20] p-2 shadow-[0_0_20px_rgba(215,162,246,0.15)] ring-1 ring-white/10 transition-all duration-300 focus-within:bg-[#282a2c] focus-within:shadow-[0_0_30px_rgba(215,162,246,0.25)] focus-within:ring-[#D7A2F6]/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "grid h-12 w-12 shrink-0 place-items-center rounded-full text-[#c4c7c5] hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-[0.97] mb-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "file",
									className: "hidden",
									multiple: true,
									accept: "*/*"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 316,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 317,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 315,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								ref: inputRef,
								value: input,
								onChange: (e) => setInput(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										send(input);
									}
								},
								rows: 1,
								placeholder: "Ask anything...",
								className: "flex-1 max-h-32 resize-none bg-transparent py-3.5 text-[#e3e3e3] placeholder-[#c4c7c5] outline-none text-[17px] leading-tight"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 320,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 shrink-0 mb-0.5",
								children: input.trim() ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: busy,
									"aria-label": "Send query",
									className: "grid h-12 w-12 place-items-center rounded-full bg-[#1e1f20] hover:bg-white/10 text-[#c4c7c5] transition-all duration-200 cursor-pointer active:scale-[0.97]",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SendHorizontal, { className: "h-6 w-6" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 343,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 337,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: toggleVoice,
									className: "grid h-12 w-12 place-items-center rounded-full text-[#c4c7c5] hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-[0.97]",
									children: listening ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MicOff, { className: "h-6 w-6 text-red-400" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 352,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mic, { className: "h-6 w-6" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 354,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 346,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 335,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 314,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 307,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 306,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConversationSearchModal, {
				open: searchOpen,
				onClose: () => setSearchOpen(false),
				onSelectConversation: handleSelectConversation,
				onNewChat: () => {
					setActiveConvId(null);
					setMessages([]);
					setActiveConversationId(null);
					setSearchOpen(false);
				}
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 363,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 232,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/chat.tsx?tsr-split=component";
function ChatRoute() {
	const [resetKey, setResetKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const handler = () => setResetKey((v) => v + 1);
		window.addEventListener("omni-new-chat", handler);
		return () => window.removeEventListener("omni-new-chat", handler);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatHome, { resetKey }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 10,
		columnNumber: 10
	}, this);
}
//#endregion
export { ChatRoute as component };
