import { i as createServerFn } from "./server-B3ytGRYy.mjs";
import { t as createServerRpc } from "./createServerRpc-DiQR2LFd.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloader.functions-CFZoL4MV.js
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
		headers: DEFAULT_HEADERS,
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
	for (const base of COBALT_INSTANCES) try {
		const json = await cobaltCall(base, url, quality, format);
		if (!json || json.status === "error") continue;
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
			platform,
			title: json.filename?.replace(/\.[a-z0-9]+$/i, "") || `${platform} media`,
			formats
		};
	} catch {}
	return null;
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
	if (format === "video" || format === "audio") {
		const result = await tryCobalt(url, platform, toCobaltQuality(data.quality), format);
		if (result) return result;
	} else {
		const [video, audio] = await Promise.all([tryCobalt(url, platform, toCobaltQuality(data.quality), "video"), tryCobalt(url, platform, toCobaltQuality(data.quality), "audio")]);
		const formats = [...video?.formats ?? [], ...audio?.formats ?? []];
		if (formats.length) return {
			platform,
			title: video?.title ?? audio?.title ?? `${platform} media`,
			formats
		};
	}
	throw new Error("No downloadable media was found at that link.");
});
//#endregion
export { resolveMedia_createServerFn_handler };
