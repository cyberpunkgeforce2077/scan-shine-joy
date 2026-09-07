import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus AI — Immersive Workspace" },
      {
        name: "description",
        content:
          "Chat with an AI tech navigator and jump into QR, document scanning, OCR and downloader tools — all in one dark, immersive workspace.",
      },
      { property: "og:title", content: "Nexus AI — Immersive Workspace" },
      {
        property: "og:description",
        content: "AI chat with session history plus private in-browser tools for QR codes, documents, OCR and media.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});
