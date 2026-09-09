import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Download,
  FileText,
  MessageSquarePlus,
  Moon,
  QrCode,
  ScanText,
  Search,
  Settings,
  Sun,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useThemeMode } from "./ThemeProvider";

const TOOLS = [
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggle } = useThemeMode();

  const rowClass = (active: boolean) =>
    cn(
      "flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
      active
        ? "bg-primary-container text-primary-container-foreground shadow-sm"
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-y-3 left-3 z-[61] flex w-[86%] max-w-[340px] flex-col rounded-3xl border border-border bg-card/98 shadow-[var(--shadow-plush-lg)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <div>
                <span className="text-xl font-extrabold tracking-[-0.04em]">OmniSuite</span>
                <p className="mt-0.5 text-xs text-muted-foreground">Your private toolkit</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-90"
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
              <Link to="/" onClick={onClose} className={rowClass(path === "/")}>
                <Search className="h-5 w-5" /> Ask Vladimir
              </Link>

              <p className="px-4 pb-2 pt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                Tools
              </p>
              {TOOLS.map((t) => (
                <Link key={t.to} to={t.to} onClick={onClose} className={rowClass(path === t.to)}>
                  <t.icon className="h-5 w-5" /> {t.label}
                </Link>
              ))}
            </div>

            {settingsOpen && (
              <div className="mx-4 mb-3 rounded-2xl border border-border bg-surface-1 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Appearance
                </p>
                <button
                  onClick={toggle}
                  className="mt-2 flex min-h-10 w-full items-center justify-between rounded-xl px-2 text-sm font-semibold transition hover:bg-surface-2"
                >
                  <span className="inline-flex items-center gap-2">
                    {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {theme === "dark" ? "Dark mode" : "Light mode"}
                  </span>
                  <span className="text-xs text-muted-foreground">Switch</span>
                </button>
              </div>
            )}
            <div className="flex items-center gap-3 border-t border-border px-4 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-container text-sm font-bold text-primary-container-foreground">
                V
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">Vladimir Selorm…</span>
              <button
                aria-label="Settings"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((open) => !open)}
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
