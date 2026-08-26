import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { QrCode } from "lucide-react";
import { QRGenerator } from "@/components/QRGenerator";
import { ScanTab } from "@/components/ScanTab";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QR Master — Custom QR Code Generator" },
      {
        name: "description",
        content:
          "Design custom QR codes with gradients, dot shapes, corner styles and a center logo. Export high-res PNG or SVG, or copy to clipboard.",
      },
      { property: "og:title", content: "QR Master — Custom QR Code Generator" },
      {
        property: "og:description",
        content:
          "Design custom QR codes with gradients, dot shapes, corner styles and a center logo. Export high-res PNG or SVG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<"create" | "scan">("create");
  const [scanMode, setScanMode] = useState<"camera" | "upload">("camera");

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)]">
            <QrCode className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              QR Master
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              Design, customize and export QR codes
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="mb-6 grid max-w-xs grid-cols-2 gap-1 rounded-2xl border border-border bg-card/70 p-1 backdrop-blur">
        {(["create", "scan"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
              tab === t
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ClientOnly fallback={<div className="h-96 rounded-3xl border border-border bg-card" />}>
        {tab === "create" ? (
          <QRGenerator />
        ) : (
          <div className="max-w-md space-y-5">
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card/70 p-1">
              {(["camera", "upload"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setScanMode(m)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
                    scanMode === m
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "upload" ? "Upload file" : "Camera"}
                </button>
              ))}
            </div>
            {scanMode === "camera" ? <ScanTab /> : <FileScanTab />}
          </div>
        )}
      </ClientOnly>
    </main>
  );
}
