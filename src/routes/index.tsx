import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChatHome } from "@/components/omni/ChatHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OmniSuite — Ask Vladimir, your AI tech navigator" },
      {
        name: "description",
        content:
          "Chat with an AI tech navigator and jump into QR, document scanning, OCR and downloader tools — all in one dark, private workspace.",
      },
      { property: "og:title", content: "OmniSuite — Ask Vladimir, your AI tech navigator" },
      {
        property: "og:description",
        content: "AI chat plus private in-browser tools for QR codes, documents, OCR and media.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatRoute,
});

function ChatRoute() {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handler = () => setResetKey((v) => v + 1);
    window.addEventListener("omni-new-chat", handler);
    return () => window.removeEventListener("omni-new-chat", handler);
  }, []);

  return <ChatHome resetKey={resetKey} />;
}
