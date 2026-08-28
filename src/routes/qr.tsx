import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { useState } from "react";
import { QRGenerator } from "@/components/QRGenerator";
import { ScanTab } from "@/components/ScanTab";
import { FileScanTab } from "@/components/FileScanTab";
import { PageShell, PillButton } from "@/components/omni/primitives";

export const Route = createFileRoute("/qr")({
  head: () => ({
    meta: [
      { title: "QR Studio — OmniSuite" },
      {
        name: "description",
        content:
          "Design styled QR codes with gradients, logos and custom shapes, or scan codes with your camera or an uploaded image.",
      },
      { property: "og:title", content: "QR Studio — OmniSuite" },
      {
        property: "og:description",
        content: "Create and scan QR codes entirely in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QRPage,
});

function QRPage() {
  const [tab, setTab] = useState<"create" | "scan">("create");
  const [scanMode, setScanMode] = useState<"camera" | "upload">("camera");

  return (
    <PageShell
      eyebrow="QR Studio"
      title="Create and scan QR codes"
      description="Styled generation with logos and gradients, plus camera and file scanning — all local to your device."
    >
      <div className="mb-6 flex gap-2">
        {(["create", "scan"] as const).map((t) => (
          <PillButton
            key={t}
            variant={tab === t ? "primary" : "outline"}
            onClick={() => setTab(t)}
            className="capitalize"
          >
            {t}
          </PillButton>
        ))}
      </div>

      <ClientOnly fallback={<div className="plush h-96" />}>
        {tab === "create" ? (
          <QRGenerator />
        ) : (
          <div className="max-w-md space-y-5">
            <div className="flex gap-2">
              {(["camera", "upload"] as const).map((m) => (
                <PillButton
                  key={m}
                  variant={scanMode === m ? "tonal" : "ghost"}
                  onClick={() => setScanMode(m)}
                >
                  {m === "upload" ? "Upload file" : "Camera"}
                </PillButton>
              ))}
            </div>
            {scanMode === "camera" ? <ScanTab /> : <FileScanTab />}
          </div>
        )}
      </ClientOnly>
    </PageShell>
  );
}
