import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { C as require_jsx_runtime, G as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn } from "./server-Bi_VMfDL.mjs";
import { a as stringType, i as objectType, n as enumType, t as arrayType } from "../_libs/zod.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-C5zIjrah.mjs";
import { B as CodeXml, C as MicOff, F as FileText, G as Bot, J as ArrowUpRight, K as BookOpen, L as Download, S as Mic, U as Check, _ as QrCode, f as SendHorizontal, h as ScanText, k as LoaderCircle, t as X, u as ShieldCheck, v as Plus, z as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAuth, i as Sparkle, r as cn } from "./router-Bvs9SwUi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4sEBt8H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var STORE_KEY = "omni-ask-history";
var MAX_IMAGE_SIZE = 4194304;
var ACCEPTED_TYPES = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif"
];
var QUICK_ACTIONS = [
	{
		label: "Code",
		description: "Build, debug, or explain code",
		icon: CodeXml,
		prompt: "Help me generate code for a small web project."
	},
	{
		label: "AI Tools",
		description: "Find the right AI workflow",
		icon: Bot,
		prompt: "What AI tools should I try for everyday work?"
	},
	{
		label: "Guides",
		description: "Practical tech walkthroughs",
		icon: BookOpen,
		to: "/guides"
	},
	{
		label: "QR",
		description: "Create or scan a QR code",
		icon: QrCode,
		to: "/qr"
	},
	{
		label: "Docs",
		description: "Turn photos into PDFs",
		icon: FileText,
		to: "/scanner"
	},
	{
		label: "OCR",
		description: "Extract text from an image",
		icon: ScanText,
		to: "/ocr"
	},
	{
		label: "Downloader",
		description: "Save media from a link",
		icon: Download,
		to: "/downloader"
	}
];
function ChatHome({ resetKey = 0 }) {
	const ask = useServerFn(askAssistant);
	const navigate = useNavigate();
	const { profile } = useAuth();
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [copiedMessage, setCopiedMessage] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORE_KEY);
			if (raw) setMessages(JSON.parse(raw));
		} catch {}
		inputRef.current?.focus({ preventScroll: true });
	}, []);
	(0, import_react.useEffect)(() => {
		if (resetKey === 0) return;
		setMessages([]);
		try {
			localStorage.removeItem(STORE_KEY);
		} catch {}
		inputRef.current?.focus({ preventScroll: true });
	}, [resetKey]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-20)));
		} catch {}
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve({
				data: reader.result.split(",")[1] ?? "",
				mime: file.type
			});
		};
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file."));
		reader.readAsDataURL(file);
	});
	const handleFiles = (0, import_react.useCallback)(async (files) => {
		const arr = Array.from(files);
		for (const file of arr) {
			if (!ACCEPTED_TYPES.includes(file.type)) {
				toast.error("Only PNG, JPEG, WebP, and GIF images are supported.");
				continue;
			}
			if (file.size > MAX_IMAGE_SIZE) {
				toast.error("Image must be under 4 MB.");
				continue;
			}
			try {
				const att = await readFileAsBase64(file);
				setAttachments((prev) => prev.length >= 4 ? prev : [...prev, att]);
			} catch {
				toast.error("Could not load that image.");
			}
		}
	}, []);
	const toggleVoice = (0, import_react.useCallback)(() => {
		if (listening) {
			recognitionRef.current?.stop();
			return;
		}
		const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!Ctor) {
			toast.error("Voice input isn't supported in this browser. Try Chrome or Edge.");
			return;
		}
		const rec = new Ctor();
		rec.lang = "en-US";
		rec.interimResults = true;
		rec.continuous = false;
		const finalText = "";
		rec.onresult = (e) => {
			let interim = "";
			const len = e.results.length;
			for (let i = e.resultIndex; i < len; i++) {
				const transcript = e.results[i]?.[0]?.transcript ?? "";
				interim += transcript;
			}
			setInput(finalText + interim);
		};
		rec.onerror = () => {
			toast.error("Voice input failed. Check your microphone permission.");
			setListening(false);
		};
		rec.onend = () => {
			setListening(false);
			recognitionRef.current = null;
		};
		recognitionRef.current = rec;
		setListening(true);
		rec.start();
	}, [listening]);
	const removeAttachment = (index) => setAttachments((prev) => prev.filter((_, i) => i !== index));
	async function send(text) {
		const question = text.trim();
		if (!question && attachments.length === 0 || busy) return;
		const userMsg = {
			role: "user",
			content: question || "(image attached)",
			images: attachments.length > 0 ? attachments : void 0
		};
		const next = [...messages, userMsg];
		setMessages(next);
		setInput("");
		setAttachments([]);
		setBusy(true);
		try {
			const { reply } = await ask({ data: { messages: next.slice(-10).map((m) => ({
				role: m.role,
				content: m.content,
				images: m.images
			})) } });
			setMessages([...next, {
				role: "assistant",
				content: reply
			}]);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
			setMessages(next);
		} finally {
			setBusy(false);
			inputRef.current?.focus();
		}
	}
	const empty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-40 pt-28 sm:px-6",
		children: [empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-1 flex-col items-center justify-center pb-10 pt-6 text-center sm:-translate-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative grid h-[76px] w-[76px] place-items-center rounded-[26px] border border-primary/15 bg-primary-container shadow-[var(--shadow-plush)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute h-14 w-14 rounded-full bg-primary/20 blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "relative h-11 w-11" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-7 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Private by design"]
				}),
				profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm font-semibold text-muted-foreground",
					children: [
						"Welcome back, ",
						profile.username,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-xl text-3xl font-extrabold tracking-[-0.06em] sm:text-5xl",
					children: "What are we building today?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-[15px]",
					children: "Ask Vladimir can help you think, create, and move faster — or open a focused tool when you already know what you need."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid w-full max-w-3xl grid-cols-2 gap-2 text-left sm:grid-cols-4",
					children: QUICK_ACTIONS.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if ("to" in action && action.to) navigate({ to: action.to });
							else send(action.prompt);
						},
						className: "group min-h-[82px] rounded-2xl border border-border/80 bg-card/80 p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-[var(--shadow-plush)] active:translate-y-0 active:scale-[0.98]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-7 w-7 place-items-center rounded-lg bg-primary-container text-primary-container-foreground transition-transform group-hover:scale-105",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 text-muted-foreground/60 transition group-hover:text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-[13px] font-bold text-foreground",
								children: action.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-[11px] leading-4 text-muted-foreground",
								children: action.description
							})
						]
					}, action.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-sage" }), "Runs privately in your browser"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-5",
			children: [
				messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("max-w-[88%] rounded-3xl text-sm leading-relaxed", m.role === "user" ? "bg-primary px-4 py-3 text-primary-foreground" : "border border-border/70 bg-card/70 px-4 py-3 text-foreground shadow-sm"),
						children: [
							m.images && m.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 flex flex-wrap gap-2",
								children: m.images.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `data:${img.mime};base64,${img.data}`,
									alt: "attachment",
									className: "h-28 w-28 rounded-2xl object-cover"
								}, idx))
							}),
							m.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between gap-4 border-b border-border/60 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3 w-3" }), " Vladimir"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-label": "Copy response",
									onClick: () => {
										navigator.clipboard?.writeText(m.content);
										setCopiedMessage(i);
										window.setTimeout(() => setCopiedMessage(null), 1600);
									},
									className: "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground",
									children: [copiedMessage === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copiedMessage === i ? "Copied" : "Copy"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "whitespace-pre-wrap",
								children: m.content
							})
						]
					})
				}, i)),
				busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Thinking…"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				send(input);
			},
			className: "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-5",
			children: [attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-2 flex w-full max-w-3xl flex-wrap gap-2",
				children: attachments.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `data:${img.mime};base64,${img.data}`,
						alt: "preview",
						className: "h-16 w-16 rounded-xl border border-border object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => removeAttachment(i),
						"aria-label": "Remove attachment",
						className: "absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-background shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
					})]
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[26px] border border-border/90 bg-card/96 px-3 py-2.5 shadow-[var(--shadow-plush-lg)] backdrop-blur-xl transition-shadow focus-within:border-primary/30 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_12%,transparent),var(--shadow-plush-lg)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: ACCEPTED_TYPES.join(","),
						multiple: true,
						className: "hidden",
						onChange: (e) => {
							if (e.target.files) handleFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Attach file",
						onClick: () => fileInputRef.current?.click(),
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
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
						placeholder: listening ? "Listening…" : "Ask Vladimir",
						className: "max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm leading-6 outline-none placeholder:text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Voice input",
						onClick: toggleVoice,
						className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl transition active:scale-90", listening ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
						children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy || !input.trim() && attachments.length === 0,
						"aria-label": "Send",
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-90 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendHorizontal, { className: "h-4 w-4" })
					})
				]
			})]
		})]
	});
}
function ChatRoute() {
	const [resetKey, setResetKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const handler = () => setResetKey((v) => v + 1);
		window.addEventListener("omni-new-chat", handler);
		return () => window.removeEventListener("omni-new-chat", handler);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatHome, { resetKey });
}
//#endregion
export { ChatRoute as component };
