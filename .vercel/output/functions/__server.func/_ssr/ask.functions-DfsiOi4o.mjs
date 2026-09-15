import { i as createServerFn } from "./server-CIdmJJo9.mjs";
import { t as createServerRpc } from "./createServerRpc-O0VIvzrM.mjs";
import { a as stringType, i as objectType, n as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask.functions-DfsiOi4o.js
var MessageSchema = objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().min(1).max(4e3),
	images: arrayType(objectType({
		data: stringType().min(1),
		mime: stringType().min(1)
	})).max(4).optional()
});
var Input = objectType({ messages: MessageSchema.array().min(1).max(20) });
var askAssistant_createServerFn_handler = createServerRpc({
	id: "27da268bb0f60c91c31c1d6ee9a955fbefc393d080d285bc0f1bb193e0e91f4c",
	name: "askAssistant",
	filename: "src/lib/ask.functions.ts"
}, (opts) => askAssistant.__executeServer(opts));
var askAssistant = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(askAssistant_createServerFn_handler, async ({ data }) => {
	const geminiKey = process.env["GEMINI_API_KEY"];
	const genericKey = process.env["AI_API_KEY"];
	const lovableKey = process.env["LOVABLE_API_KEY"];
	const key = geminiKey || genericKey || lovableKey;
	if (!key) throw new Error("AI is not configured for this deployment. Set a GEMINI_API_KEY environment variable.");
	const defaultBase = geminiKey ? "https://generativelanguage.googleapis.com/v1beta/openai" : "https://ai.gateway.lovable.dev/v1";
	const baseUrl = (process.env["AI_BASE_URL"] || defaultBase).replace(/\/$/, "");
	const model = process.env["AI_MODEL"] || (geminiKey ? "gemini-3.6-flash" : "google/gemini-3.7-flash");
	const usingLovable = baseUrl.includes("ai.gateway.lovable.dev");
	const res = await fetch(`${baseUrl}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...usingLovable ? {
				"Lovable-API-Key": key,
				"X-Lovable-AIG-SDK": "fetch"
			} : { Authorization: `Bearer ${key}` }
		},
		body: JSON.stringify({
			model,
			messages: [{
				role: "system",
				content: "You are the OmniSuite tech navigator: a calm, friendly expert who helps everyday people fix computer, phone and internet problems. Give short, ordered, practical steps in plain language. Never invent product details. If something is risky, say so plainly. If the user shares an image, look at it and help with what you see."
			}, ...data.messages.map((m) => {
				const images = m.images ?? [];
				if (images.length === 0) return {
					role: m.role,
					content: m.content
				};
				return {
					role: m.role,
					content: [{
						type: "text",
						text: m.content
					}, ...images.map((img) => ({
						type: "image_url",
						image_url: { url: `data:${img.mime};base64,${img.data}` }
					}))]
				};
			})]
		})
	});
	if (!res.ok) {
		const body = await res.text();
		let message = body;
		try {
			message = JSON.parse(body)?.error?.message ?? JSON.parse(body)?.message ?? body;
		} catch {}
		if (res.status === 429) throw new Error("The assistant is busy right now — wait a moment and try again.");
		throw new Error(message || `The assistant could not answer (${res.status}).`);
	}
	const reply = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!reply) throw new Error("The assistant returned an empty answer. Try again.");
	return { reply };
});
var TitleInput = objectType({ prompt: stringType().min(1).max(1e3) });
var askTitle_createServerFn_handler = createServerRpc({
	id: "403e6fc7056360f2335111efcf60abddbd95ba4ce54e505cdd70f7bf1a0b74e6",
	name: "askTitle",
	filename: "src/lib/ask.functions.ts"
}, (opts) => askTitle.__executeServer(opts));
var askTitle = createServerFn({ method: "POST" }).inputValidator((data) => TitleInput.parse(data)).handler(askTitle_createServerFn_handler, async ({ data }) => {
	const geminiKey = process.env["GEMINI_API_KEY"];
	const genericKey = process.env["AI_API_KEY"];
	const lovableKey = process.env["LOVABLE_API_KEY"];
	const key = geminiKey || genericKey || lovableKey;
	if (!key) return { title: data.prompt.slice(0, 30) };
	const defaultBase = geminiKey ? "https://generativelanguage.googleapis.com/v1beta/openai" : "https://ai.gateway.lovable.dev/v1";
	const baseUrl = (process.env["AI_BASE_URL"] || defaultBase).replace(/\/$/, "");
	const model = process.env["AI_MODEL"] || (geminiKey ? "gemini-3.6-flash" : "google/gemini-3.7-flash");
	const usingLovable = baseUrl.includes("ai.gateway.lovable.dev");
	try {
		const res = await fetch(`${baseUrl}/chat/completions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...usingLovable ? {
					"Lovable-API-Key": key,
					"X-Lovable-AIG-SDK": "fetch"
				} : { Authorization: `Bearer ${key}` }
			},
			body: JSON.stringify({
				model,
				messages: [{
					role: "system",
					content: "You are a title generator. Return a very short, intriguing 2-4 word title for the user's query. Do not use quotes or formatting."
				}, {
					role: "user",
					content: data.prompt
				}]
			})
		});
		if (!res.ok) return { title: data.prompt.slice(0, 30) };
		return { title: (await res.json()).choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, "") ?? data.prompt.slice(0, 30) };
	} catch {
		return { title: data.prompt.slice(0, 30) };
	}
});
//#endregion
export { askAssistant_createServerFn_handler, askTitle_createServerFn_handler };
