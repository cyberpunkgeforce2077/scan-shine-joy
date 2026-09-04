import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({ url: z.string().min(5).max(2000) });

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

const normalizeQuality = (raw: string): string => {
  const s = String(raw || "").toLowerCase();
  if (/1080|full ?hd|fhd/.test(s)) return "1080p";
  if (/720|hd\b/.test(s)) return "720p";
  if (/480|sd\b/.test(s)) return "480p";
  if (/360/.test(s)) return "360p";
  if (/audio|mp3|m4a/.test(s)) return "audio";
  return raw || "auto";
};

// Public cobalt (v10) instances. The old api.cobalt.tools/api/json (v7) was shut
// down in Nov 2024, so we POST to the v10 root endpoint of community instances.
const COBALT_INSTANCES = [
  "https://dwnld.nichind.dev",
  "https://cobalt-api.kwiatekmiki.com",
  "https://cobalt-backend.canine.tools",
];

async function cobaltCall(base: string, url: string) {
  const res = await fetch(base, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ url, videoQuality: "1080", filenameStyle: "basic" }),
  });
  if (!res.ok && res.status !== 400) return null;
  return (await res.json()) as {
    status?: string;
    url?: string;
    filename?: string;
    error?: { code?: string };
    picker?: { url?: string; type?: string }[];
    audio?: string;
  };
}

async function tryCobalt(url: string, platform: string): Promise<MediaResult | null> {
  for (const base of COBALT_INSTANCES) {
    try {
      const json = await cobaltCall(base, url);
      if (!json) continue;
      const formats: MediaFormat[] = [];
      if (
        (json.status === "redirect" || json.status === "tunnel" || json.status === "stream") &&
        json.url
      ) {
        formats.push({ quality: "auto", label: "Best available", ext: "mp4", url: json.url });
      }
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

    const key = process.env["RAPIDAPI_KEY"];
    if (!key) {
      const cobalt = await tryCobalt(url, platform);
      if (cobalt) return cobalt;
      throw new Error(
        "The downloader isn't connected to an extraction service yet. Add a RAPIDAPI_KEY to enable downloads.",
      );
    }
    const host = process.env["RAPIDAPI_HOST"] || "auto-download-all-in-one.p.rapidapi.com";


    const res = await fetch(`https://${host}/v1/social/autolink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": key,
        "x-rapidapi-host": host,
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const body = await res.text();
      const fallback = await tryCobalt(url, platform);
      if (fallback) return fallback;
      if (res.status === 429)
        throw new Error("The download service is rate-limited right now. Try again in a minute.");
      if (res.status === 401 || res.status === 403)
        throw new Error(
          "The download service rejected the API key — make sure your RapidAPI account is subscribed to the Auto Download All in One API.",
        );
      throw new Error(body?.slice(0, 300) || `Could not read that link (${res.status}).`);
    }


    const json = (await res.json()) as {
      title?: string;
      thumbnail?: string;
      duration?: number | string;
      author?: string;
      error?: boolean | string;
      medias?: {
        url?: string;
        quality?: string;
        extension?: string;
        formattedSize?: string;
        type?: string;
      }[];
    };

    if (json.error && typeof json.error === "string") throw new Error(json.error);

    const medias = json.medias ?? [];
    const formats: MediaFormat[] = medias
      .filter((m) => typeof m.url === "string" && m.url)
      .map((m) => {
        const quality = normalizeQuality(m.quality ?? m.type ?? "");
        return {
          quality,
          label: m.quality || quality,
          ext: (m.extension || (quality === "audio" ? "mp3" : "mp4")).replace(/^\./, ""),
          url: m.url as string,
          ...(m.formattedSize ? { size: m.formattedSize } : {}),
        };
      });

    if (!formats.length) {
      const fallback = await tryCobalt(url, platform);
      if (fallback) return fallback;
      throw new Error("No downloadable media was found at that link.");
    }


    const seconds = Number(json.duration);
    const duration =
      Number.isFinite(seconds) && seconds > 0
        ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`
        : undefined;

    return {
      platform,
      title: json.title?.trim() || `${platform} media`,
      ...(json.thumbnail ? { thumbnail: json.thumbnail } : {}),
      ...(duration ? { duration } : {}),
      ...(json.author ? { author: json.author } : {}),
      formats,
    };
  });
