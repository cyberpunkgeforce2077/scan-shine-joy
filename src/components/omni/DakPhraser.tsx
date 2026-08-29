import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { Check, Copy, Loader2, RefreshCw, Sparkles, Trash2, Wand2 } from "lucide-react";
import { paraphrase } from "@/lib/dakphraser.functions";
import { cn } from "@/lib/utils";

const TONES = [
  { id: "standard", label: "Standard" },
  { id: "formal", label: "Formal" },
  { id: "casual", label: "Casual" },
  { id: "concise", label: "Concise" },
  { id: "expand", label: "Expand" },
  { id: "academic", label: "Academic" },
  { id: "creative", label: "Creative" },
] as const;

type Tone = (typeof TONES)[number]["id"];

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function DakPhraser() {
  const run = useServerFn(paraphrase);
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("standard");
  const [count, setCount] = useState(2);
  const [results, setResults] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  async function submit() {
    if (!text.trim() || busy) return;
    setBusy(true);
    setError(null);
    setResults([]);
    try {
      const res = await run({ data: { text: text.trim(), tone, variants: count } });
      setResults(res.variants);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy(value: string, i: number) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(i);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setError("Clipboard access was blocked by your browser.");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
      <div className="plush-raised p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold">Your text</h2>
          <span className="text-xs font-medium text-muted-foreground">{words(text)} words</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          maxLength={8000}
          placeholder="Paste or type the text you want DakPhraser to rewrite…"
          className="mt-3 w-full resize-y rounded-3xl bg-surface-2/70 p-4 text-sm leading-relaxed outline-none ring-primary/30 transition focus:ring-2"
        />

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tone
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-semibold transition active:scale-95",
                tone === t.id
                  ? "bg-primary-container text-primary-container-foreground"
                  : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Variants
        </p>
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={cn(
                "h-10 w-10 rounded-full text-sm font-bold transition active:scale-90",
                count === n
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]"
                  : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
              )}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={submit}
            disabled={busy || !text.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition-transform active:scale-95 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {busy ? "Paraphrasing…" : "Paraphrase"}
          </button>
          {results.length > 0 && !busy && (
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold transition active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          )}
          {text && (
            <button
              onClick={() => {
                setText("");
                setResults([]);
                setError(null);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-3 text-sm font-semibold text-muted-foreground transition active:scale-95"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="rounded-3xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        {!results.length && !busy && !error && (
          <div className="plush grid min-h-64 place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">Rewrites appear here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a tone, choose how many versions you want, then hit Paraphrase.
              </p>
            </div>
          </div>
        )}

        {busy &&
          Array.from({ length: count }).map((_, i) => (
            <div key={i} className="plush animate-pulse space-y-2 p-5">
              <div className="h-3 w-1/3 rounded-full bg-surface-2" />
              <div className="h-3 w-full rounded-full bg-surface-2" />
              <div className="h-3 w-5/6 rounded-full bg-surface-2" />
            </div>
          ))}

        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="plush p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                Version {i + 1}
              </span>
              <button
                onClick={() => copy(r, i)}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-2 text-xs font-semibold transition active:scale-95"
              >
                {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === i ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{r}</p>
            <p className="mt-3 text-xs text-muted-foreground">{words(r)} words</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
