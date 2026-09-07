import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mic, MicOff, Plus, SendHorizonal, Sparkle, X } from "lucide-react";
import { toast } from "sonner";
import { askAssistant } from "@/lib/ask.functions";
import { cn } from "@/lib/utils";
import {
  useWorkspace,
  getSessionMessages,
  type Attachment,
  type ChatMessage,
} from "@/components/omni/WorkspaceContext";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

const PILLS = [
  { label: "Help me generate code", prompt: "Help me generate code for a small web project." },
  { label: "Explore AI tools", prompt: "What AI tools should I try for everyday work?" },
  { label: "Hub", to: "/hub" as const },
  { label: "Guides", to: "/guides" as const },
  { label: "QR", to: "/qr" as const },
  { label: "Docs", to: "/scanner" as const },
  { label: "OCR", to: "/ocr" as const },
  { label: "Downloader", to: "/downloader" as const },
];

interface SpeechRecognitionEventLike {
  results: { [index: number]: { [index: number]: { transcript: string } } };
  resultIndex: number;
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function ChatHome() {
  const ask = useServerFn(askAssistant);
  const navigate = useNavigate();
  const { sessions, activeSessionId, updateMessages } = useWorkspace();
  const messages = getSessionMessages(sessions, activeSessionId);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSessionId]);

  const readFileAsBase64 = (file: File): Promise<Attachment> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1] ?? "";
        resolve({ data: base64, mime: file.type });
      };
      reader.onerror = () => reject(new Error("Could not read file."));
      reader.readAsDataURL(file);
    });

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    for (const file of arr) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error("Only PNG, JPEG, WebP, and GIF images are supported.");
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("Image must be under 4 MB.");
        continue;
      }
      try {
        const att = await readFileAsBase64(file);
        setAttachments((prev) => (prev.length >= 4 ? prev : [...prev, att]));
      } catch {
        toast.error("Could not load that image.");
      }
    }
  }, []);

  const toggleVoice = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Ctor =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!Ctor) {
      toast.error("Voice input isn't supported in this browser. Try Chrome or Edge.");
      return;
    }
    const rec = new (Ctor as new () => SpeechRecognitionLike)();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      const len = e.results.length;
      for (let i = e.resultIndex; i < len; i++) {
        const transcript = e.results[i]?.[0]?.transcript ?? "";
        interim += transcript;
      }
      setInput(finalText + interim);
    };
    rec.onerror = () => {
      toast.error("Voice input failed. Check your microphone permission.");
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }, [listening]);

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  async function send(text: string) {
    const question = text.trim();
    if ((!question && attachments.length === 0) || busy) return;
    const userMsg: ChatMessage = {
      role: "user",
      content: question || "(image attached)",
      images: attachments.length > 0 ? attachments : undefined,
    };
    const next: ChatMessage[] = [...messages, userMsg];
    updateMessages(next);
    setInput("");
    setAttachments([]);
    setBusy(true);
    try {
      const { reply } = await ask({
        data: {
          messages: next.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
            images: m.images,
          })),
        },
      });
      updateMessages([...next, { role: "assistant", content: reply }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
      updateMessages(next);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const empty = messages.length === 0;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col px-4 pb-40 pt-8">
      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center pt-12 text-center">
          <span className="relative grid place-items-center">
            <span className="absolute h-20 w-20 rounded-full bg-cyan-400/25 blur-2xl" />
            <Sparkle className="relative h-12 w-12" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
            Where should we start?
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PILLS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  if ("to" in p && p.to) void navigate({ to: p.to });
                  else void send(p.prompt!);
                }}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-400 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-100 active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-5 pt-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[88%] rounded-3xl text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-cyan-500/20 px-4 py-3 text-cyan-50 ring-1 ring-cyan-300/25"
                    : "text-slate-200",
                )}
              >
                {m.images && m.images.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {m.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`data:${img.mime};base64,${img.data}`}
                        alt="attachment"
                        className="h-28 w-28 rounded-2xl object-cover"
                      />
                    ))}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="fixed inset-x-0 bottom-0 z-40 px-4 pb-5"
      >
        {attachments.length > 0 && (
          <div className="mx-auto mb-2 flex w-full max-w-3xl flex-wrap gap-2">
            {attachments.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`data:${img.mime};base64,${img.data}`}
                  alt="preview"
                  className="h-16 w-16 rounded-xl border border-white/[0.08] object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  aria-label="Remove attachment"
                  className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-900 shadow"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[28px] border border-white/[0.08] bg-[#0c1320]/70 px-3 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,102,255,0.25)] backdrop-blur-2xl">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) void handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            aria-label="Attach file"
            onClick={() => fileInputRef.current?.click()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-400 transition hover:text-cyan-200 active:scale-90"
          >
            <Plus className="h-5 w-5" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder={listening ? "Listening…" : "Ask Nexus"}
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            aria-label="Voice input"
            onClick={toggleVoice}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full transition active:scale-90",
              listening ? "bg-cyan-400/30 text-cyan-100" : "text-slate-400 hover:text-cyan-200",
            )}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            type="submit"
            disabled={busy || (!input.trim() && attachments.length === 0)}
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-400/20 text-cyan-100 ring-1 ring-cyan-300/30 transition hover:bg-cyan-400/30 active:scale-90 disabled:opacity-40"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
