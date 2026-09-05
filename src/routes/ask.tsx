import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/omni/primitives";
import { AskAssistant } from "@/components/omni/AskAssistant";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask OmniSuite — Free AI Tech Help, No Sign-In" },
      {
        name: "description",
        content:
          "Describe any computer, phone or Wi-Fi problem and get clear step-by-step help from the OmniSuite AI navigator. No account required.",
      },
      { property: "og:title", content: "Ask OmniSuite — Free AI Tech Help, No Sign-In" },
      {
        property: "og:description",
        content: "Clear, step-by-step answers to everyday tech problems. No account required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AskPage,
});

function AskPage() {
  return (
    <PageShell
      eyebrow="Ask"
      title="Your tech navigator"
      description="Explain the problem in your own words and get practical steps back — no sign-in, nothing stored on a server."
    >
      <AskAssistant />
    </PageShell>
  );
}
