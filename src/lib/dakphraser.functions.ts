import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  text: z.string().min(1).max(8000),
  tone: z.enum(["standard", "formal", "casual", "concise", "expand", "academic", "creative"]),
  variants: z.number().int().min(1).max(4),
});

const TONE_BRIEF: Record<string, string> = {
  standard: "clear, natural everyday English with the same level of detail",
  formal: "polished, professional and respectful business English",
  casual: "relaxed, friendly and conversational",
  concise: "as short and tight as possible while keeping every key fact",
  expand: "richer and more detailed, adding helpful clarity without inventing facts",
  academic: "precise scholarly prose with formal vocabulary and no contractions",
  creative: "vivid and expressive with fresh imagery, keeping the original meaning",
};

export type ParaphraseResult = { variants: string[] };

export const paraphrase = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<ParaphraseResult> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this app.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are DakPhraser, an expert rewriting engine. Rewrite the user's text without changing its meaning, never adding facts, and preserving the original language. Reply as json matching {\"variants\": string[]}.",
          },
          {
            role: "user",
            content: `Rewrite the text below in a ${TONE_BRIEF[data.tone]} style. Produce exactly ${data.variants} distinct rewrite(s) as json.\n\nTEXT:\n${data.text}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      let message = body;
      try {
        message = JSON.parse(body)?.error?.message ?? JSON.parse(body)?.message ?? body;
      } catch {
        /* keep raw */
      }
      if (res.status === 429)
        throw new Error("DakPhraser is busy right now — wait a moment and try again.");
      if (res.status === 402)
        throw new Error(message || "AI credits are exhausted. Add credits to keep paraphrasing.");
      throw new Error(message || `Paraphrasing failed (${res.status}).`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = json.choices?.[0]?.message?.content ?? "";
    let variants: string[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.variants)) {
        variants = parsed.variants.filter((v: unknown): v is string => typeof v === "string");
      }
    } catch {
      if (raw.trim()) variants = [raw.trim()];
    }
    if (!variants.length) throw new Error("DakPhraser returned an empty result. Try again.");
    return { variants: variants.slice(0, data.variants) };
  });
