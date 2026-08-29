import { createFileRoute } from "@tanstack/react-router";
import { DakPhraser } from "@/components/omni/DakPhraser";
import { PageShell } from "@/components/omni/primitives";

export const Route = createFileRoute("/dakphraser")({
  head: () => ({
    meta: [
      { title: "DakPhraser — AI Paraphraser & Rewriter" },
      {
        name: "description",
        content:
          "Rewrite any text with DakPhraser: formal, casual, concise, academic or creative tones, multiple variants and one-tap copy.",
      },
      { property: "og:title", content: "DakPhraser — AI Paraphraser & Rewriter" },
      {
        property: "og:description",
        content: "AI rewriting in seven tones with side-by-side variants and instant copy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DakPhraserPage,
});

function DakPhraserPage() {
  return (
    <PageShell
      eyebrow="DakPhraser"
      title="Rewrite anything, in your tone"
      description="Paste your text, choose a tone and let DakPhraser produce polished rewrites that keep your meaning intact."
    >
      <DakPhraser />
    </PageShell>
  );
}
