import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { CreateTab } from "@/components/CreateTab";
import { ScanTab } from "@/components/ScanTab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QR Master — Create & Scan QR Codes" },
      {
        name: "description",
        content:
          "Design custom QR codes with your own colors and dot styles, download high-res PNGs, and scan codes with your camera.",
      },
      { property: "og:title", content: "QR Master — Create & Scan QR Codes" },
      {
        property: "og:description",
        content:
          "Design custom QR codes with your own colors and dot styles, download high-res PNGs, and scan codes with your camera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<"create" | "scan">("create");

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 pb-16 pt-10">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">QR Master</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create and scan, beautifully.</p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1">
        {(["create", "scan"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ClientOnly fallback={<div className="h-96 rounded-3xl border border-border bg-card" />}>
        {tab === "create" ? <CreateTab /> : <ScanTab />}
      </ClientOnly>
    </main>
  );
}
