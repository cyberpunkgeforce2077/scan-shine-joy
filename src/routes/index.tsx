import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare,
  QrCode,
  Scan,
  Image as ImageIcon,
  Download,
  Type,
  BookOpen,
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: AppSelector,
});

const tools = [
  {
    id: "chat",
    name: "Vlad Bot",
    description: "Chat with an advanced AI assistant.",
    icon: MessageSquare,
    href: "/chat",
    color: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "downloader",
    name: "Media Downloader",
    description: "Download videos from social media directly.",
    icon: Download,
    href: "/downloader",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    id: "scanner",
    name: "Doc Scanner",
    description: "Scan documents securely in browser.",
    icon: Scan,
    href: "/scanner",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: "qr",
    name: "QR Code",
    description: "Generate styled QR codes instantly.",
    icon: QrCode,
    href: "/qr",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    id: "ocr",
    name: "OCR Extractor",
    description: "Extract text from any image locally.",
    icon: ImageIcon,
    href: "/ocr",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    id: "dakphraser",
    name: "Dakphraser",
    description: "Advanced text manipulation and phrasing.",
    icon: Type,
    href: "/dakphraser",
    color: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "guides",
    name: "Setup Guides",
    description: "Configuration and setup walkthroughs.",
    icon: BookOpen,
    href: "/guides",
    color: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
  },
];

function AppSelector() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-12 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 mt-6"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3 font-display">
            Welcome to OmniSuite
          </h1>
          <p className="text-primary font-medium text-base sm:text-lg tracking-wide">
            Intelligent creation & privacy-first device tools
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={tool.href}
                  className="group relative flex flex-col items-center justify-center p-8 h-64 rounded-3xl bg-card border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  {tool.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        {tool.badge}
                      </span>
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-1 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`h-8 w-8 ${tool.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">{tool.name}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 px-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
