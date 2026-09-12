import { i as createServerFn } from "./server-CFi1m_jv.mjs";
import { t as createServerRpc } from "./createServerRpc-C-g26yI3.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloader.functions-BbYlh0fN.js
var Input = objectType({
	url: stringType().min(5).max(2e3),
	quality: stringType().max(16).optional(),
	format: enumType([
		"all",
		"video",
		"audio"
	]).optional()
});
var HOSTS = [
	{
		test: /(?:youtube\.com|youtu\.be)/i,
		name: "YouTube"
	},
	{
		test: /instagram\.com/i,
		name: "Instagram"
	},
	{
		test: /tiktok\.com/i,
		name: "TikTok"
	},
	{
		test: /facebook\.com|fb\.watch/i,
		name: "Facebook"
	},
	{
		test: /(?:twitter\.com|x\.com)/i,
		name: "X"
	}
];
function detectPlatform(url) {
	return HOSTS.find((h) => h.test.test(url))?.name ?? null;
}
var DEFAULT_HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json"
};
var COBALT_INSTANCES = [
	"https://dwnld.nichind.dev",
	"https://api.cobalt.tools",
	"https://cobalt-api.kwiatekmiki.com",
	"https://cobalt-backend.canine.tools"
];
var COBALT_API_KEY = process.env["COBALT_API_KEY"];
var AUTHORIZATION_HEADER = COBALT_API_KEY ? { Authorization: `Api-Key ${COBALT_API_KEY}` } : {};
var API_QUALITIES = [
	"144",
	"240",
	"360",
	"480",
	"720",
	"1080",
	"1440",
	"2160"
];
function toCobaltQuality(raw) {
	const digits = String(raw ?? "720").replace(/[^0-9]/g, "");
	return API_QUALITIES.includes(digits) ? digits : "720";
}
async function cobaltCall(base, url, quality, format) {
	const res = await fetch(base, {
		method: "POST",
		headers: {
			...DEFAULT_HEADERS,
			...AUTHORIZATION_HEADER
		},
		body: JSON.stringify({
			url,
			videoQuality: quality,
			downloadMode: format === "audio" ? "audio" : "auto",
			audioFormat: "mp3",
			filenameStyle: "basic"
		})
	});
	if (!res.ok && res.status !== 400) return null;
	return await res.json();
}
async function tryCobalt(url, platform, quality, format) {
	let lastErrorCode = "";
	for (const base of COBALT_INSTANCES) try {
		const json = await cobaltCall(base, url, quality, format);
		if (!json || json.status === "error") {
			if (json?.error?.code) lastErrorCode = json.error.code;
			continue;
		}
		const formats = [];
		if (format === "audio") {
			const audioUrl = json.audio ?? (json.status === "tunnel" || json.status === "redirect" || json.status === "stream" ? json.url : void 0) ?? json.picker?.find((p) => p.type === "audio")?.url;
			if (audioUrl) formats.push({
				quality: "audio",
				label: "MP3 audio",
				ext: "mp3",
				url: audioUrl
			});
		} else if (json.status === "picker" && json.picker?.length) for (const p of json.picker) {
			if (!p.url) continue;
			if (p.type !== "audio") formats.push({
				quality: "auto",
				label: "Video",
				ext: "mp4",
				url: p.url
			});
		}
		else if ((json.status === "tunnel" || json.status === "redirect" || json.status === "stream") && json.url) formats.push({
			quality: "auto",
			label: "Best available",
			ext: "mp4",
			url: json.url
		});
		if (!formats.length) continue;
		return {
			result: {
				platform,
				title: json.filename?.replace(/\.[a-z0-9]+$/i, "") || `${platform} media`,
				formats
			},
			errorCode: ""
		};
	} catch {}
	return {
		result: null,
		errorCode: lastErrorCode
	};
}
var resolveMedia_createServerFn_handler = createServerRpc({
	id: "14ae22d27d71df7228d88a7c4c1f3146df415ef2241f0b9a43524c75f415bcd9",
	name: "resolveMedia",
	filename: "src/lib/downloader.functions.ts"
}, (opts) => resolveMedia.__executeServer(opts));
var resolveMedia = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(resolveMedia_createServerFn_handler, async ({ data }) => {
	const url = data.url.trim();
	if (!/^https?:\/\//i.test(url)) throw new Error("Paste a full link starting with https://");
	const platform = detectPlatform(url);
	if (!platform) throw new Error("That link isn't supported. Use a YouTube, Instagram or TikTok link.");
	const format = data.format ?? "all";
	const youTubeBlocked = (code) => code === "content.no_valid_content" || code === "error.api.auth.jwt.missing";
	if (format === "video" || format === "audio") {
		const { result, errorCode } = await tryCobalt(url, platform, toCobaltQuality(data.quality), format);
		if (result) return result;
		if (platform === "YouTube" && youTubeBlocked(errorCode)) throw new Error("YouTube is currently blocking the free download instances. Add a COBALT_API_KEY environment variable (from an instance host who offers one) to restore YouTube downloads, or try again later.");
	} else {
		const [video, audio] = await Promise.all([tryCobalt(url, platform, toCobaltQuality(data.quality), "video"), tryCobalt(url, platform, toCobaltQuality(data.quality), "audio")]);
		const formats = [...video?.result?.formats ?? [], ...audio?.result?.formats ?? []];
		if (formats.length) return {
			platform,
			title: video?.result?.title ?? audio?.result?.title ?? `${platform} media`,
			formats
		};
		if (platform === "YouTube" && youTubeBlocked(video?.errorCode ?? audio?.errorCode ?? "")) throw new Error("YouTube is currently blocking the free download instances. Add a COBALT_API_KEY environment variable (from an instance host who offers one) to restore YouTube downloads, or try again later.");
	}
	throw new Error("No downloadable media was found at that link.");
});
//#endregion
export { resolveMedia_createServerFn_handler };
