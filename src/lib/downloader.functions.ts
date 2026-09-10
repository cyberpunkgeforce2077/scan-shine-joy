import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  url: z.string().min(5).max(2000),
  quality: z.string().max(16).optional(),
  format: z.enum(["all", "video", "audio"]).optional(),
});

export type MediaFormat = {
  quality: string; // "1080p" | "720p" | "480p" | "audio" | ...
  label: string;
  ext: string;
  url: string;
  size?: string;
};

export type MediaResult = {
  platform: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  author?: string;
  formats: MediaFormat[];
};

const HOSTS: { test: RegExp; name: string }[] = [
  { test: /(?:youtube\.com|youtu\.be)/i, name: "YouTube" },
  { test: /instagram\.com/i, name: "Instagram" },
  { test: /tiktok\.com/i, name: "TikTok" },
  { test: /facebook\.com|fb\.watch/i, name: "Facebook" },
  { test: /(?:twitter\.com|x\.com)/i, name: "X" },
];

export function detectPlatform(url: string): string | null {
  return HOSTS.find((h) => h.test.test(url))?.name ?? null;
}

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Cobalt v10 — all instances speak the same JSON protocol. We try the
// official endpoint first, then roll through keyless public instances.
// Instances moved to API-key auth in mid-2026 (YouTube scraping fallout);
// set COBALT_API_KEY to use them (Authorization: Api-Key …) — without
// a key, keyless instances are the only option.

const COBALT_INSTANCES = [
  "https://dwnld.nichind.dev",
  "https://api.cobalt.tools",
  "https://cobalt-api.kwiatekmiki.com",
  "https://cobalt-backend.canine.tools",
];

const COBALT_API_KEY = process.env["COBALT_API_KEY"];
// https://github.com/imputnet/cobalt/blob/main/docs/api.md#authentication
const AUTHORIZATION_HEADER = COBALT_API_KEY ? { Authorization: `Api-Key ${COBALT_API_KEY}` } : {};

interface CobaltJson {
  status?: string;
  url?: string;
  filename?: string;
  error?: { code?: string };
  picker?: { url?: string; type?: string }[];
  audio?: string;
}

const API_QUALITIES = ["144", "240", "360", "480", "720", "1080", "1440", "2160"];

function toCobaltQuality(raw: string | undefined): string {
  const digits = String(raw ?? "720").replace(/[^0-9]/g, "");
  return API_QUALITIES.includes(digits) ? digits : "720";
}

async function cobaltCall(base: string, url: string, quality: string, format: "video" | "audio") {
  const res = await fetch(base, {
    method: "POST",
    headers: { ...DEFAULT_HEADERS, ...AUTHORIZATION_HEADER },
    body: JSON.stringify({
      url,
      videoQuality: quality,
      downloadMode: format === "audio" ? "audio" : "auto",
      audioFormat: "mp3",
      filenameStyle: "basic",
    }),
  });
  if (!res.ok && res.status !== 400) return null;
  return (await res.json()) as CobaltJson;
}

async function tryCobalt(
  url: string,
  platform: string,
  quality: string,
  format: "video" | "audio",
): Promise<{ result: MediaResult | null; errorCode: string }> {
  let lastErrorCode = "";
  for (const base of COBALT_INSTANCES) {
    try {
      const json = await cobaltCall(base, url, quality, format);
      if (!json || json.status === "error") {
        if (json?.error?.code) lastErrorCode = json.error.code;
        continue;
      }

      const formats: MediaFormat[] = [];
      if (format === "audio") {
        const audioUrl =
          json.audio ??
          (json.status === "tunnel" || json.status === "redirect" || json.status === "stream"
            ? json.url
            : undefined) ??
          json.picker?.find((p) => p.type === "audio")?.url;
        if (audioUrl) {
          formats.push({ quality: "audio", label: "MP3 audio", ext: "mp3", url: audioUrl });
        }
      } else if (json.status === "picker" && json.picker?.length) {
        for (const p of json.picker) {
          if (!p.url) continue;
          if (p.type !== "audio") {
            formats.push({ quality: "auto", label: "Video", ext: "mp4", url: p.url });
          }
        }
      } else if (
        (json.status === "tunnel" || json.status === "redirect" || json.status === "stream") &&
        json.url
      ) {
        formats.push({ quality: "auto", label: "Best available", ext: "mp4", url: json.url });
      }

      if (!formats.length) continue;
      const title = json.filename?.replace(/\.[a-z0-9]+$/i, "") || `${platform} media`;
      return { result: { platform, title, formats }, errorCode: "" };
    } catch {
      // try the next instance
    }
  }
  return { result: null, errorCode: lastErrorCode };
}

export const resolveMedia = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<MediaResult> => {
    const url = data.url.trim();
    if (!/^https?:\/\//i.test(url)) throw new Error("Paste a full link starting with https://");
    const platform = detectPlatform(url);
    if (!platform)
      throw new Error("That link isn't supported. Use a YouTube, Instagram or TikTok link.");

    const format = data.format ?? "all";
    const youTubeBlocked = (code: string) =>
      code === "content.no_valid_content" || code === "error.api.auth.jwt.missing";
    if (format === "video" || format === "audio") {
      const { result, errorCode } = await tryCobalt(
        url,
        platform,
        toCobaltQuality(data.quality),
        format,
      );
      if (result) return result;
      if (platform === "YouTube" && youTubeBlocked(errorCode))
        throw new Error(
          "YouTube is currently blocking the free download instances. Add a COBALT_API_KEY environment variable (from an instance host who offers one) to restore YouTube downloads, or try again later.",
        );
    } else {
      const [video, audio] = await Promise.all([
        tryCobalt(url, platform, toCobaltQuality(data.quality), "video"),
        tryCobalt(url, platform, toCobaltQuality(data.quality), "audio"),
      ]);
      const formats = [...(video?.result?.formats ?? []), ...(audio?.result?.formats ?? [])];
      if (formats.length) {
        return {
          platform,
          title: video?.result?.title ?? audio?.result?.title ?? `${platform} media`,
          formats,
        };
      }
      if (platform === "YouTube" && youTubeBlocked(video?.errorCode ?? audio?.errorCode ?? ""))
        throw new Error(
          "YouTube is currently blocking the free download instances. Add a COBALT_API_KEY environment variable (from an instance host who offers one) to restore YouTube downloads, or try again later.",
        );
    }
    throw new Error("No downloadable media was found at that link.");
  });
