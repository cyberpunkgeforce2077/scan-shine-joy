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
      if (res.status === 429)
        throw new Error("The download service is rate-limited right now. Try again in a minute.");
      if (res.status === 401 || res.status === 403)
        throw new Error("The download service rejected the API key. Check your RAPIDAPI_KEY.");
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

    if (!formats.length) throw new Error("No downloadable media was found at that link.");

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
