import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mic, Plus, SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import { askAssistant } from "@/lib/ask.functions";
import { Sparkle } from "@/components/omni/Sparkle";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const STORE_KEY = "omni-ask-history";

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

export function ChatHome({ resetKey = 0 }: { resetKey?: number }) {
  const ask = useServerFn(askAssistant);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const { reply } = await ask({ data: { messages: next.slice(-10) } });
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
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-40 pt-24">
      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="relative grid place-items-center">
            <span className="absolute h-20 w-20 rounded-full bg-primary/25 blur-2xl" />
            <Sparkle className="relative h-12 w-12" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
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
                className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[88%] whitespace-pre-wrap rounded-3xl text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary px-4 py-3 text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {m.content}
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
        className="fixed inset-x-0 bottom-0 z-40 px-4 pb-5"
      >
        <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[28px] border border-border bg-card px-3 py-2.5 shadow-[var(--shadow-plush-lg)]">
          <button
            type="button"
            aria-label="Attach file"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
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
            placeholder="Ask Vladimir"
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Voice input"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-90 disabled:opacity-40"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
