import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const VideoInput = z.object({
  prompt: z.string().min(1).max(2000),
  aspectRatio: z.enum(["16:9", "9:16"]).default("16:9"),
  duration: z.enum(["5s", "10s"]).default("5s"),
});

export const generateVideo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => VideoInput.parse(data))
  .handler(async ({ data }) => {
    const geminiKey = process.env["GEMINI_API_KEY"];
    if (!geminiKey) {
      throw new Error("Missing GEMINI_API_KEY. Please set your API key in Settings > Secrets.");
    }

    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const interaction = await ai.interactions.create(
      {
        model: "gemini-omni-1.1-flash",
        input: data.prompt,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: "video",
          aspect_ratio: data.aspectRatio,
          duration: data.duration,
        },
      },
      { timeout: 300000 }
    );

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      return {
        videoBase64: videoPart.data,
        mimeType: videoPart.mime_type || "video/mp4",
      };
    }

    throw new Error("No video generated.");
  });
