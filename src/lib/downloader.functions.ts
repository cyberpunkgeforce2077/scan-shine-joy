import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  url: z.string().min(5).max(2000),
  quality: z.string().max(16).optional(),
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

const COBALT_INSTANCES = [
  "https://api.cobalt.tools",
  "https://dwnld.nichind.dev",
  "https://cobalt-api.kwiatekmiki.com",
  "https://cobalt-backend.canine.tools",
];

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

async function cobaltCall(base: string, url: string, quality: string) {
  const res = await fetch(base, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ url, videoQuality: quality, filenameStyle: "basic" }),
  });
  if (!res.ok && res.status !== 400) return null;
  return (await res.json()) as CobaltJson;
}

async function tryCobalt(
  url: string,
  platform: string,
  quality: string,
): Promise<MediaResult | null> {
  for (const base of COBALT_INSTANCES) {
    try {
      const json = await cobaltCall(base, url, quality);
      if (!json || json.status === "error") continue;

      const formats: MediaFormat[] = [];
      if (json.status === "picker" && json.picker?.length) {
        for (const p of json.picker) {
          if (!p.url) continue;
          const isAudio = p.type === "audio";
          formats.push({
            quality: isAudio ? "audio" : "auto",
            label: isAudio ? "Audio" : "Media",
            ext: isAudio ? "mp3" : "mp4",
            url: p.url,
          });
        }
        if (json.audio) {
          formats.push({ quality: "audio", label: "Audio", ext: "mp3", url: json.audio });
        }
      } else if (
        (json.status === "tunnel" || json.status === "redirect" || json.status === "stream") &&
        json.url
      ) {
        formats.push({ quality: "auto", label: "Best available", ext: "mp4", url: json.url });
      }

      if (!formats.length) continue;
      const title = json.filename?.replace(/\.[a-z0-9]+$/i, "") || `${platform} media`;
      return { platform, title, formats };
    } catch {
      // try the next instance
    }
  }
  return null;
}

export const resolveMedia = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<MediaResult> => {
    const url = data.url.trim();
    if (!/^https?:\/\//i.test(url)) throw new Error("Paste a full link starting with https://");
    const platform = detectPlatform(url);
    if (!platform)
      throw new Error("That link isn't supported. Use a YouTube, Instagram or TikTok link.");

    const result = await tryCobalt(url, platform, toCobaltQuality(data.quality));
    if (result) return result;
    throw new Error("No downloadable media was found at that link.");
  });
