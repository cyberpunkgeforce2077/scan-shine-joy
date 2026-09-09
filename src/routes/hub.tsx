import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText, QrCode, ScanText, ArrowRight, Wand2, Download, BookOpen } from "lucide-react";

import { PlushCard, SectionHeading } from "@/components/omni/primitives";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "OmniSuite — Private In-Browser Document Tools" },
      {
        name: "description",
        content:
          "OmniSuite turns photos into clean documents, extracts text with OCR, and builds styled QR codes — all processed privately in your browser.",
      },
      { property: "og:title", content: "OmniSuite — Private In-Browser Document Tools" },
      {
        property: "og:description",
        content: "Document scanner, OCR text extractor and QR studio. No uploads, no accounts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hub,
});

const TOOLS = [
  {
    to: "/guides",
    icon: BookOpen,
    name: "Tech Guides",
    desc: "Plain-language walkthroughs for slow PCs, overheating laptops, Wi-Fi trouble, backups and staying safe online.",
  },
  {
    to: "/scanner",
    icon: FileText,
    name: "Document Scanner",
    desc: "Photograph any page and turn it into a crisp black-and-white document, reorder pages and export a combined PDF.",
  },
  {
    to: "/ocr",
    icon: ScanText,
    name: "OCR Text Extractor",
    desc: "Pull editable words out of document photos, then copy them or download a .txt file.",
  },
  {
    to: "/qr",
    icon: QrCode,
    name: "QR Studio",
    desc: "Design styled QR codes with logos and gradients, and scan codes by camera or file.",
  },
  {
    to: "/dakphraser",
    icon: Wand2,
    name: "DakPhraser",
    desc: "AI paraphraser that rewrites your text in formal, casual, concise, academic or creative tones.",
  },
  {
    to: "/downloader",
    icon: Download,
    name: "Media Downloader",
    desc: "Paste a YouTube, Instagram or TikTok link and download the video in 480p, 720p or 1080p.",
  },
] as const;

function Hub() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="plush-raised relative overflow-hidden p-7 sm:p-12"
      >
        <span className="inline-flex rounded-full border border-primary/10 bg-primary-container px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary-container-foreground">
          Private by design
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">
          A calm, private toolkit for your documents.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Scan pages, read text out of pictures and generate QR codes. Everything runs on your
          device — nothing is uploaded anywhere.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/scanner"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-plush)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
          >
            Scan a document <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/ocr"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary-container px-6 py-3 text-sm font-bold text-primary-container-foreground transition-all hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0 active:scale-95"
          >
            Extract text
          </Link>
        </div>
      </motion.section>

      <SectionHeading
        className="mt-14"
        eyebrow="Tools"
        title="One quiet place for every task"
        description="Pick a tool and get started right away — no sign-up, no waiting."
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => (
          <PlushCard key={tool.to} delay={i * 0.08}>
            <Link to={tool.to} className="flex h-full flex-col">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
                <tool.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{tool.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </PlushCard>
        ))}
      </div>
    </main>
  );
}
