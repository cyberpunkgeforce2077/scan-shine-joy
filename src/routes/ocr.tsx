import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { OcrStudio } from "@/components/omni/OcrStudio";
import { PageShell } from "@/components/omni/primitives";

export const Route = createFileRoute("/ocr")({
  head: () => ({
    meta: [
      { title: "OCR Text Extractor — OmniSuite" },
      {
        name: "description",
        content:
          "Upload or photograph a document and pull out editable text instantly, with copy and .txt download — processed on your device.",
      },
      { property: "og:title", content: "OCR Text Extractor — OmniSuite" },
      {
        property: "og:description",
        content: "Extract editable text from photos of documents, receipts and books.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OcrPage,
});

function OcrPage() {
  return (
    <PageShell
      eyebrow="OCR"
      title="Extract words from any document"
      description="Snap or upload a page and get clean, editable text side by side with the original."
    >
      <ClientOnly fallback={<div className="plush h-96" />}>
        <OcrStudio />
      </ClientOnly>
    </PageShell>
  );
}
