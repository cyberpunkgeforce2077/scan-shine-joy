import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
  images: z
    .array(
      z.object({
        data: z.string().min(1),
        mime: z.string().min(1),
      }),
    )
    .max(4)
    .optional(),
});

const Input = z.object({
  messages: MessageSchema.array().min(1).max(20),
});

export type AskResult = { reply: string };

/** Public assistant — no sign-in required. */
export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<AskResult> => {
    const geminiKey = process.env["GEMINI_API_KEY"];
    const genericKey = process.env["AI_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const key = geminiKey || genericKey || lovableKey;
    if (!key) {
      throw new Error(
        "AI is not configured for this deployment. Set a GEMINI_API_KEY environment variable.",
      );
    }
    const defaultBase = geminiKey
      ? "https://generativelanguage.googleapis.com/v1beta/openai"
      : "https://ai.gateway.lovable.dev/v1";
    const baseUrl = (process.env["AI_BASE_URL"] || defaultBase).replace(/\/$/, "");
    const model =
      process.env["AI_MODEL"] || (geminiKey ? "gemini-3.6-flash" : "google/gemini-3.7-flash");
    const usingLovable = baseUrl.includes("ai.gateway.lovable.dev");

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(usingLovable
          ? { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" }
          : { Authorization: `Bearer ${key}` }),
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are the OmniSuite tech navigator: a calm, friendly expert who helps everyday people fix computer, phone and internet problems. Give short, ordered, practical steps in plain language. Never invent product details. If something is risky, say so plainly. If the user shares an image, look at it and help with what you see.",
          },
          ...data.messages.map((m) => {
            const images = m.images ?? [];
            if (images.length === 0) return { role: m.role, content: m.content };
            return {
              role: m.role,
              content: [
                { type: "text", text: m.content },
                ...images.map((img) => ({
                  type: "image_url",
                  image_url: { url: `data:${img.mime};base64,${img.data}` },
                })),
              ],
            };
          }),
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
        throw new Error("The assistant is busy right now — wait a moment and try again.");
      throw new Error(message || `The assistant could not answer (${res.status}).`);
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!reply) throw new Error("The assistant returned an empty answer. Try again.");
    return { reply };
  });
