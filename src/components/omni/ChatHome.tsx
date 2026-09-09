import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mic, MicOff, Plus, SendHorizonal, X } from "lucide-react";
import { toast } from "sonner";
import { askAssistant } from "@/lib/ask.functions";
import { Sparkle } from "@/components/omni/Sparkle";
import { cn } from "@/lib/utils";

type Attachment = { data: string; mime: string };
type Msg = { role: "user" | "assistant"; content: string; images?: Attachment[] };

const STORE_KEY = "omni-ask-history";
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

/* Minimal typings for the Web Speech API (not in standard TS DOM lib) */
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

export function ChatHome({ resetKey = 0 }: { resetKey?: number }) {
  const ask = useServerFn(askAssistant);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setMessages(JSON.parse(raw) as Msg[]);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (resetKey === 0) return;
    setMessages([]);
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  }, [resetKey]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* ignore */
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    const finalText = "";
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
    const userMsg: Msg = {
      role: "user",
      content: question || "(image attached)",
      images: attachments.length > 0 ? attachments : undefined,
    };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
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
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setMessages(next);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const empty = messages.length === 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-40 pt-28 sm:px-6">
      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-12 text-center">
          <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-primary/10 bg-primary-container shadow-[var(--shadow-plush)]">
            <span className="absolute h-14 w-14 rounded-full bg-primary/20 blur-xl" />
            <Sparkle className="relative h-11 w-11" />
          </span>
          <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
            Your private assistant
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.05em] sm:text-5xl">
            Where should we start?
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Choose a starting point or ask anything you need help with.
          </p>
          <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {PILLS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  if ("to" in p && p.to) void navigate({ to: p.to });
                  else void send(p.prompt!);
                }}
                className="min-h-11 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:text-foreground hover:shadow-[var(--shadow-plush)] active:translate-y-0 active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[88%] rounded-3xl text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary px-4 py-3 text-primary-foreground"
                    : "border border-border/70 bg-card/70 px-4 py-3 text-foreground shadow-sm",
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
        className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-5"
      >
        {attachments.length > 0 && (
          <div className="mx-auto mb-2 flex w-full max-w-3xl flex-wrap gap-2">
            {attachments.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`data:${img.mime};base64,${img.data}`}
                  alt="preview"
                  className="h-16 w-16 rounded-xl border border-border object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  aria-label="Remove attachment"
                  className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-background shadow"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[26px] border border-border bg-card/95 px-3 py-2.5 shadow-[var(--shadow-plush-lg)] backdrop-blur-xl">
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
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-90"
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
            placeholder={listening ? "Listening…" : "Ask Vladimir"}
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Voice input"
            onClick={toggleVoice}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition active:scale-90",
              listening
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            type="submit"
            disabled={busy || (!input.trim() && attachments.length === 0)}
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-90 disabled:opacity-40"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
