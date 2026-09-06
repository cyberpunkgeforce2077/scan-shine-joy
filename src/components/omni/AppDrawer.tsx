import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Download,
  FileText,
  LayoutGrid,
  MessageSquarePlus,
  QrCode,
  ScanText,
  Search,
  Settings,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TOOLS = [
  { to: "/hub", label: "Hub", icon: LayoutGrid },
  { to: "/guides", label: "Guides", icon: BookOpen },
  { to: "/qr", label: "QR", icon: QrCode },
  { to: "/scanner", label: "Docs", icon: FileText },
  { to: "/ocr", label: "OCR", icon: ScanText },
  { to: "/dakphraser", label: "DakPhraser", icon: Wand2 },
  { to: "/downloader", label: "Downloader", icon: Download },
] as const;

export function AppDrawer({
  open,
  onClose,
  onNewChat,
}: {
  open: boolean;
  onClose: () => void;
  onNewChat?: () => void;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const rowClass = (active: boolean) =>
    cn(
      "flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-medium transition",
      active
        ? "bg-surface-2 text-foreground"
        : "text-muted-foreground hover:bg-surface-1 hover:text-foreground",
    );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
            className="fixed inset-y-0 left-0 z-[61] flex w-[86%] max-w-[330px] flex-col border-r border-border bg-card"
          >
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <span className="text-2xl font-bold tracking-tight">OmniSuite</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:text-foreground active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <button
                onClick={() => {
                  onNewChat?.();
                  onClose();
                }}
                className={rowClass(false)}
              >
                <MessageSquarePlus className="h-5 w-5" /> New chat
              </button>
              <Link to="/ask" onClick={onClose} className={rowClass(path === "/ask")}>
                <Search className="h-5 w-5" /> Search chats
              </Link>

              <p className="px-4 pb-2 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Tools
              </p>
              {TOOLS.map((t) => (
                <Link key={t.to} to={t.to} onClick={onClose} className={rowClass(path === t.to)}>
                  <t.icon className="h-5 w-5" /> {t.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-border px-4 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-container text-sm font-bold text-primary-container-foreground">
                V
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                Vladimir Selorm…
              </span>
              <button
                aria-label="Settings"
                className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
