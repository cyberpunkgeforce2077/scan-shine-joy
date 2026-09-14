import { i as createServerFn } from "./server-DlXSfxAW.mjs";
import { t as createServerRpc } from "./createServerRpc-BtK8w0IG.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video.functions-DCWqVZzp.js
var VideoInput = objectType({
	prompt: stringType().min(1).max(2e3),
	aspectRatio: enumType(["16:9", "9:16"]).default("16:9"),
	duration: enumType(["5s", "10s"]).default("5s")
});
var generateVideo_createServerFn_handler = createServerRpc({
	id: "a173097c6b7f31070a0095ba0f762d228865703f8a3ce28634142b6bb56879dc",
	name: "generateVideo",
	filename: "src/lib/video.functions.ts"
}, (opts) => generateVideo.__executeServer(opts));
var generateVideo = createServerFn({ method: "POST" }).inputValidator((data) => VideoInput.parse(data)).handler(generateVideo_createServerFn_handler, async ({ data }) => {
	const geminiKey = process.env["GEMINI_API_KEY"];
	if (!geminiKey) throw new Error("Missing GEMINI_API_KEY. Please set your API key in Settings > Secrets.");
	const { GoogleGenAI } = await import("../_libs/@google/genai.mjs").then((n) => n.t);
	const videoPart = (await new GoogleGenAI({ apiKey: geminiKey }).interactions.create({
		model: "gemini-omni-1.1-flash",
		input: data.prompt,
		background: false,
		store: false,
		stream: false,
		response_format: {
			type: "video",
			aspect_ratio: data.aspectRatio,
			duration: data.duration
		}
	}, { timeout: 3e5 })).output_video;
	if (videoPart && videoPart.data) return {
		videoBase64: videoPart.data,
		mimeType: videoPart.mime_type || "video/mp4"
	};
	throw new Error("No video generated.");
});
//#endregion
export { generateVideo_createServerFn_handler };
