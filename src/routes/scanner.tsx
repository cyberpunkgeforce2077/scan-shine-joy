import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { DocScanner } from "@/components/omni/DocScanner";
import { PageShell } from "@/components/omni/primitives";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Document Scanner — OmniSuite" },
      {
        name: "description",
        content:
          "Turn photos of pages into clean black-and-white scans, reorder them and export a combined PDF — entirely in your browser.",
      },
      { property: "og:title", content: "Document Scanner — OmniSuite" },
      {
        property: "og:description",
        content: "Photo to document: scan filters, page ordering and one-tap PDF export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScannerPage,
});

function ScannerPage() {
  return (
    <PageShell
      eyebrow="Doc Scanner"
      title="Turn photos into clean documents"
      description="Capture or upload pages, apply the crisp document look, reorder them, then export a single PDF."
    >
      <ClientOnly fallback={<div className="plush h-96" />}>
        <DocScanner />
      </ClientOnly>
    </PageShell>
  );
}
