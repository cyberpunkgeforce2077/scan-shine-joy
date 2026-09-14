import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { MusicStudio } from "@/components/omni/MusicStudio";
import { PageShell } from "@/components/omni/primitives";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Text-to-Music Studio — OmniSuite" },
      {
        name: "description",
        content:
          "Synthesize original music, beats, and soundscapes from natural text prompts with Google AI & multi-track audio generation.",
      },
      { property: "og:title", content: "Text-to-Music Studio — OmniSuite" },
      {
        property: "og:description",
        content: "Generate and download custom songs and tracks from text prompts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MusicPage,
});

function MusicPage() {
  return (
    <PageShell
      eyebrow="Headliner AI"
      title="Turn Words Into Music"
      description="Type a description or mood and synthesize full polyphonic beats, ambient soundscapes, and original songs instantly."
    >
      <ClientOnly fallback={<div className="plush h-96" />}>
        <MusicStudio />
      </ClientOnly>
    </PageShell>
  );
}
