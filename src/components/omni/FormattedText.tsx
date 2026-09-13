import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function FormattedText({ content }: { content: string }) {
  // Parse code blocks vs regular paragraphs
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 text-[14px] leading-relaxed text-foreground/95">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0]?.trim() || "";
          const isLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const language = isLang ? firstLine : "code";
          const code = isLang ? lines.slice(1).join("\n") : lines.join("\n");

          return <CodeSnippet key={index} code={code} language={language} />;
        }

        // Regular text: handle headers, bold text, bullet points, and inline code
        const paragraphs = part.split(/\n\n+/);
        return (
          <div key={index} className="space-y-2">
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              if (!trimmed) return null;

              // Headings
              if (trimmed.startsWith("### ")) {
                return (
                  <h4
                    key={pIdx}
                    className="font-display text-base font-semibold text-foreground pt-2"
                  >
                    {trimmed.slice(4)}
                  </h4>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3
                    key={pIdx}
                    className="font-display text-lg font-semibold text-foreground pt-2"
                  >
                    {trimmed.slice(3)}
                  </h3>
                );
              }
              if (trimmed.startsWith("# ")) {
                return (
                  <h2 key={pIdx} className="font-display text-xl font-bold text-foreground pt-3">
                    {trimmed.slice(2)}
                  </h2>
                );
              }

              // List items
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed
                  .split(/\n[-*]\s+/)
                  .map((item) => item.replace(/^[-*]\s+/, ""));
                return (
                  <ul key={pIdx} className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                    {items.map((item, iIdx) => (
                      <li key={iIdx}>
                        <InlineMarkdown text={item} />
                      </li>
                    ))}
                  </ul>
                );
              }

              // Numbered items
              if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed
                  .split(/\n\d+\.\s+/)
                  .map((item) => item.replace(/^\d+\.\s+/, ""));
                return (
                  <ol key={pIdx} className="list-decimal space-y-1 pl-5 text-sm leading-relaxed">
                    {items.map((item, iIdx) => (
                      <li key={iIdx}>
                        <InlineMarkdown text={item} />
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={pIdx} className="text-sm leading-relaxed">
                  <InlineMarkdown text={trimmed} />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  // Parse inline `code` and **bold**
  const segments = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return (
    <>
      {segments.map((segment, i) => {
        if (segment.startsWith("`") && segment.endsWith("`") && segment.length > 2) {
          return (
            <code
              key={i}
              className="rounded-md border border-border/80 bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-foreground"
            >
              {segment.slice(1, -1)}
            </code>
          );
        }
        if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
          return (
            <strong key={i} className="font-bold text-foreground">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return segment;
      })}
    </>
  );
}

function CodeSnippet({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative my-3 overflow-hidden rounded-2xl border border-border/90 bg-surface-1 shadow-[var(--shadow-plush)]">
      <div className="flex items-center justify-between border-b border-border/80 bg-surface-2/70 px-4 py-2 text-[11px] font-bold text-muted-foreground">
        <span className="uppercase tracking-wider text-primary">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-7 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-surface-3 hover:text-foreground active:scale-95"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-sage" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
