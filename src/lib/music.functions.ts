import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { TrackComposition } from "./audioSynthesizer";

const MusicInput = z.object({
  prompt: z.string().min(1).max(1000),
  lyrics: z.string().max(2000).optional(),
  genre: z.string().default("Lo-Fi"),
  mood: z.string().default("Relaxing"),
  tempo: z.number().min(60).max(180).default(96),
  durationSeconds: z.number().min(10).max(120).default(30),
});

const LyricsInput = z.object({
  prompt: z.string().min(1).max(1000),
  genre: z.string().default("Lo-Fi"),
  mood: z.string().default("Relaxing"),
});

export type GeneratedMusicResult = {
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  durationSeconds: number;
  lyrics?: string;
  description: string;
  audioBase64?: string; // Direct audio if generated via Lyria
  mimeType?: string;
  composition: TrackComposition;
  engine: "lyria" | "gemini-synthesizer" | "algorithmic";
};

export const generateLyrics = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LyricsInput.parse(data))
  .handler(async ({ data }) => {
    const geminiKey = process.env["GEMINI_API_KEY"];
    const systemPrompt = `You are an expert songwriter. Write highly engaging, structured lyrics (Verse, Chorus) based on the user's prompt, genre, and mood. Keep it relatively short (for a 30 second to 1 minute clip). No markdown formatting or headers, just the pure lyrics.`;
    const userPrompt = `Write ${data.mood} ${data.genre} lyrics about: "${data.prompt}".`;

    if (geminiKey) {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: geminiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
          maxOutputTokens: 400,
        },
      });
      return response.text() || "";
    }

    const key = process.env["AI_API_KEY"] || process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("No API key available for lyric generation.");

    const defaultBase = "https://ai.gateway.lovable.dev/v1";
    const baseUrl = (process.env["AI_BASE_URL"] || defaultBase).replace(/\/$/, "");
    const model = "google/gemini-2.5-flash";

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to generate lyrics");
    }
    const json = await res.json();
    return json.choices?.[0]?.message?.content || "";
  });

export const generateMusicTrack = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => MusicInput.parse(data))
  .handler(async ({ data }): Promise<GeneratedMusicResult> => {
    const geminiKey = process.env["GEMINI_API_KEY"];
    const { prompt, lyrics: providedLyrics, genre, mood, tempo, durationSeconds } = data;

    const fullPrompt = providedLyrics ? `${prompt}. Lyrics: "${providedLyrics}"` : prompt;

    // 1. If GEMINI_API_KEY is available, attempt Lyria 3 first
    if (geminiKey) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: geminiKey });

        // Call Lyria Clip stream
        const response = await ai.models.generateContentStream({
          model: "lyria-3-clip-preview",
          contents: `Create a ${durationSeconds}-second ${mood} ${genre} track. Details: ${fullPrompt}. Tempo: ${tempo} BPM.`,
        });

        let audioBase64 = "";
        let lyrics = "";
        let mimeType = "audio/wav";

        for await (const chunk of response) {
          const parts = chunk.candidates?.[0]?.content?.parts;
          if (!parts) continue;

          for (const part of parts) {
            if (part.inlineData?.data) {
              if (!audioBase64 && part.inlineData.mimeType) {
                mimeType = part.inlineData.mimeType;
              }
              audioBase64 += part.inlineData.data;
            }
            if (part.text && !lyrics) {
              lyrics = part.text;
            }
          }
        }

        if (audioBase64.length > 500) {
          return {
            title: deriveTitle(prompt, genre),
            genre,
            mood,
            bpm: tempo,
            key: "Concert Pitch",
            durationSeconds,
            lyrics: lyrics || `Instrumental: ${genre} - ${mood}`,
            description: `Generated natively with Google DeepMind Lyria 3 engine based on: "${prompt}".`,
            audioBase64,
            mimeType,
            engine: "lyria",
            composition: createAlgorithmicComposition(
              prompt,
              genre,
              mood,
              tempo,
              durationSeconds,
              providedLyrics,
            ),
          };
        }
      } catch (lyriaError) {
        console.warn(
          "[Music Engine] Lyria model bypassed/fallback to Gemini Composer:",
          lyriaError,
        );
      }
    }

    // 2. Intelligent AI Musical Composition via Gemini
    if (geminiKey || process.env["AI_API_KEY"] || process.env["LOVABLE_API_KEY"]) {
      try {
        const key = geminiKey || process.env["AI_API_KEY"] || process.env["LOVABLE_API_KEY"];
        const defaultBase = geminiKey
          ? "https://generativelanguage.googleapis.com/v1beta/openai"
          : "https://ai.gateway.lovable.dev/v1";
        const baseUrl = (process.env["AI_BASE_URL"] || defaultBase).replace(/\/$/, "");
        const model = geminiKey ? "gemini-3.8-flash" : "google/gemini-3.7-flash";

        const systemPrompt = `You are an expert music producer, sound designer, and music theorist.
When given a user prompt, compose a complete structured song representation formatted as pure JSON.
The JSON must follow this exact typescript structure:
{
  "title": "Creative Song Title",
  "key": "C Major" (or minor/dorian/pentatonic etc.),
  "bpm": number (between 70 and 150),
  "description": "Brief description of the sound design, mood, and musical motifs",
  "lyrics": "Evocative lyrics, spoken word, or instrumental notes",
  "chords": [
    ["C3", "E3", "G3", "B3"],
    ["A2", "C3", "E3", "G3"],
    ["F2", "A2", "C3", "E3"],
    ["G2", "B2", "D3", "F3"]
  ],
  "melody": [
    {"note": "E4", "beat": 0, "duration": 0.5},
    {"note": "G4", "beat": 1, "duration": 0.5},
    {"note": "C5", "beat": 2, "duration": 1.0}
  ],
  "bassline": [
    {"note": "C2", "beat": 0, "duration": 1.5},
    {"note": "A1", "beat": 4, "duration": 1.5}
  ],
  "drums": {
    "kick": [0, 2, 4, 6, 8, 10, 12, 14],
    "snare": [2, 6, 10, 14],
    "hihat": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  }
}
Notes must be in scientific pitch notation (e.g. C2 to C6). Return ONLY valid JSON, with NO markdown code fences.`;

        const res = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content: `Compose a ${durationSeconds}-second ${mood} ${genre} track. User prompt: "${fullPrompt}". Requested tempo: ${tempo} BPM.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 4000,
            response_format: { type: "json_object" },
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const rawText = json.choices?.[0]?.message?.content || "";
          let parsed;
          try {
            const cleanedText = rawText.replace(/```json\s*|```/g, "").trim();
            parsed = JSON.parse(cleanedText);
          } catch (e) {
            const match = rawText.match(/\{[\s\S]*\}/);
            if (match) {
              parsed = JSON.parse(match[0]);
            } else {
              throw e;
            }
          }

          const composition: TrackComposition = {
            title: parsed.title || deriveTitle(prompt, genre),
            genre,
            mood,
            bpm: parsed.bpm || tempo,
            key: parsed.key || "C Major",
            durationSeconds,
            lyrics: parsed.lyrics || `Instrumental: ${genre} (${mood})`,
            description: parsed.description || `Generated AI composition for "${prompt}".`,
            chords:
              Array.isArray(parsed.chords) && parsed.chords.length > 0 ? parsed.chords : undefined,
            melody:
              Array.isArray(parsed.melody) && parsed.melody.length > 0 ? parsed.melody : undefined,
            bassline:
              Array.isArray(parsed.bassline) && parsed.bassline.length > 0
                ? parsed.bassline
                : undefined,
            drums: parsed.drums || undefined,
          } as TrackComposition;

          return {
            title: composition.title,
            genre,
            mood,
            bpm: composition.bpm,
            key: composition.key,
            durationSeconds,
            lyrics: composition.lyrics,
            description: composition.description || `AI composed track for: "${prompt}"`,
            composition,
            engine: "gemini-synthesizer",
          };
        }
      } catch (geminiError) {
        console.warn(
          "[Music Engine] AI parsing failed, falling back to algorithmic composer:",
          geminiError,
        );
      }
    }

    // 3. Algorithmic High-Fidelity Music Engine (Always succeeds offline or online)
    const composition = createAlgorithmicComposition(
      prompt,
      genre,
      mood,
      tempo,
      durationSeconds,
      providedLyrics,
    );
    return {
      title: composition.title,
      genre,
      mood,
      bpm: composition.bpm,
      key: composition.key,
      durationSeconds,
      lyrics: composition.lyrics,
      description: composition.description || `Algorithmic synthesis tailored for "${prompt}".`,
      composition,
      engine: "algorithmic",
    };
  });

function deriveTitle(prompt: string, genre: string): string {
  const words = prompt.trim().split(/\s+/).slice(0, 4);
  if (words.length > 0) {
    const capitalized = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
    return capitalized.length > 25 ? capitalized.slice(0, 25) + "…" : capitalized;
  }
  return `${genre} Odyssey`;
}

function createAlgorithmicComposition(
  prompt: string,
  genre: string,
  mood: string,
  tempo: number,
  durationSeconds: number,
  providedLyrics?: string,
): TrackComposition {
  const g = genre.toLowerCase();
  let key = "C Major";
  let chords: string[][] = [
    ["C3", "E3", "G3", "B3"],
    ["A2", "C3", "E3", "G3"],
    ["F2", "A2", "C3", "E3"],
    ["G2", "B2", "D3", "F3"],
  ];
  let bassline = [
    { note: "C2", beat: 0, duration: 1.5 },
    { note: "C2", beat: 2, duration: 1.5 },
    { note: "A1", beat: 4, duration: 1.5 },
    { note: "A1", beat: 6, duration: 1.5 },
    { note: "F1", beat: 8, duration: 1.5 },
    { note: "F1", beat: 10, duration: 1.5 },
    { note: "G1", beat: 12, duration: 1.5 },
    { note: "G1", beat: 14, duration: 1.5 },
  ];
  let melody = [
    { note: "E4", beat: 0, duration: 0.5, velocity: 0.85 },
    { note: "G4", beat: 1, duration: 0.5, velocity: 0.75 },
    { note: "C5", beat: 2, duration: 1.0, velocity: 0.9 },
    { note: "B4", beat: 3.5, duration: 0.5, velocity: 0.7 },
    { note: "A4", beat: 4, duration: 1.5, velocity: 0.8 },
    { note: "C5", beat: 6, duration: 1.0, velocity: 0.85 },
    { note: "F4", beat: 8, duration: 0.5, velocity: 0.7 },
    { note: "A4", beat: 9, duration: 0.5, velocity: 0.75 },
    { note: "C5", beat: 10, duration: 1.5, velocity: 0.9 },
    { note: "D5", beat: 12, duration: 1.0, velocity: 0.85 },
    { note: "B4", beat: 14, duration: 1.5, velocity: 0.8 },
  ];
  let drums = {
    kick: [0, 2, 4, 6, 8, 10, 12, 14],
    snare: [2, 6, 10, 14],
    hihat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  };

  if (g.includes("synthwave") || g.includes("cyberpunk") || g.includes("80s")) {
    key = "D Minor";
    chords = [
      ["D3", "F3", "A3", "C4"],
      ["Bb2", "D3", "F3", "A3"],
      ["C3", "E3", "G3", "Bb3"],
      ["A2", "C#3", "E3", "G3"],
    ];
    bassline = [
      { note: "D2", beat: 0, duration: 0.4 },
      { note: "D2", beat: 0.5, duration: 0.4 },
      { note: "D2", beat: 1, duration: 0.4 },
      { note: "D2", beat: 1.5, duration: 0.4 },
      { note: "Bb1", beat: 4, duration: 0.4 },
      { note: "Bb1", beat: 4.5, duration: 0.4 },
      { note: "C2", beat: 8, duration: 0.4 },
      { note: "C2", beat: 8.5, duration: 0.4 },
      { note: "A1", beat: 12, duration: 0.4 },
      { note: "A1", beat: 12.5, duration: 0.4 },
    ];
    melody = [
      { note: "A4", beat: 0, duration: 0.5, velocity: 0.9 },
      { note: "D5", beat: 1, duration: 1.0, velocity: 0.95 },
      { note: "F5", beat: 2.5, duration: 0.5, velocity: 0.9 },
      { note: "E5", beat: 4, duration: 1.5, velocity: 0.85 },
      { note: "D5", beat: 6, duration: 1.0, velocity: 0.8 },
      { note: "F5", beat: 8, duration: 0.5, velocity: 0.9 },
      { note: "G5", beat: 9, duration: 0.5, velocity: 0.9 },
      { note: "A5", beat: 10, duration: 1.5, velocity: 1.0 },
      { note: "E5", beat: 12, duration: 1.5, velocity: 0.85 },
      { note: "C#5", beat: 14, duration: 1.5, velocity: 0.8 },
    ];
    drums = {
      kick: [0, 4, 8, 12], // 4-on-the-floor
      snare: [2, 6, 10, 14],
      hihat: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5],
    };
  } else if (g.includes("ambient") || g.includes("cinematic") || g.includes("meditation")) {
    key = "Eb Major";
    chords = [
      ["Eb3", "G3", "Bb3", "D4"],
      ["C3", "Eb3", "G3", "Bb3"],
      ["Ab2", "C3", "Eb3", "G3"],
      ["Bb2", "D3", "F3", "Ab3"],
    ];
    bassline = [
      { note: "Eb2", beat: 0, duration: 3.8 },
      { note: "C2", beat: 4, duration: 3.8 },
      { note: "Ab1", beat: 8, duration: 3.8 },
      { note: "Bb1", beat: 12, duration: 3.8 },
    ];
    melody = [
      { note: "G4", beat: 1, duration: 2.0, velocity: 0.7 },
      { note: "Bb4", beat: 4, duration: 2.5, velocity: 0.75 },
      { note: "Eb5", beat: 8, duration: 2.0, velocity: 0.8 },
      { note: "D5", beat: 11, duration: 3.0, velocity: 0.65 },
    ];
    drums = {
      kick: [0, 8],
      snare: [8],
      hihat: [2, 6, 10, 14],
    };
  } else if (g.includes("lo-fi") || g.includes("chill") || g.includes("jazz")) {
    key = "F Major 7th";
    chords = [
      ["F3", "A3", "C4", "E4"],
      ["D3", "F3", "A3", "C4"],
      ["G3", "Bb3", "D4", "F4"],
      ["C3", "E3", "G3", "Bb3"],
    ];
    bassline = [
      { note: "F2", beat: 0, duration: 1.8 },
      { note: "D2", beat: 4, duration: 1.8 },
      { note: "G2", beat: 8, duration: 1.8 },
      { note: "C2", beat: 12, duration: 1.8 },
    ];
    melody = [
      { note: "C5", beat: 0.5, duration: 1.0, velocity: 0.8 },
      { note: "A4", beat: 2.5, duration: 0.5, velocity: 0.75 },
      { note: "F4", beat: 3.5, duration: 1.0, velocity: 0.8 },
      { note: "E4", beat: 5, duration: 1.5, velocity: 0.7 },
      { note: "G4", beat: 7, duration: 0.5, velocity: 0.65 },
      { note: "D4", beat: 8.5, duration: 1.5, velocity: 0.7 },
      { note: "Bb4", beat: 11, duration: 1.0, velocity: 0.75 },
      { note: "A4", beat: 13, duration: 2.0, velocity: 0.8 },
    ];
    drums = {
      kick: [0, 2.5, 8, 10.5],
      snare: [4, 12],
      hihat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    };
  }

  return {
    title: deriveTitle(prompt, genre),
    genre,
    mood,
    bpm: tempo,
    key,
    durationSeconds,
    lyrics: providedLyrics || `Instrumental track: ${genre} style, exploring ${mood} tones.`,
    description: `Organic polyphonic arrangement featuring ${chords.length}-part harmony, dynamic bass, and rhythm section.`,
    chords,
    melody,
    bassline,
    drums,
  };
}
