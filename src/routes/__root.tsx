import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Loader2,
  Plus,
  Search,
  BookOpen,
  Settings,
  Menu,
  X,
  QrCode,
  Scan,
  Image as ImageIcon,
  Wand2,
  Download,
  LogOut,
  User as UserIcon,
  MessageSquare,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/omni/ThemeProvider";
import { ThemeToggle } from "@/components/omni/ThemeToggle";
import { AuthProvider, useAuth } from "@/components/omni/AuthContext";
import { AuthScreen } from "@/components/omni/AuthScreen";
import { OnboardingScreen } from "@/components/omni/OnboardingScreen";
import { getActiveConversationId, getConversation } from "@/lib/conversationStore";
import { useState, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function MobileTopBar({ toggleDrawer }: { toggleDrawer: () => void }) {
  const { profile } = useAuth();
  const [chatTitle, setChatTitle] = useState<string | null>(null);

  useEffect(() => {
    function updateTitle() {
      const id = getActiveConversationId();
      if (id) {
        const conv = getConversation(id);
        const first = conv?.messages[0];
        if (conv && first) {
          // Basic heuristic for dynamic title based on the first message
          setChatTitle(
            conv.title !== "Untitled Chat"
              ? conv.title
              : first.content.slice(0, 30) + (first.content.length > 30 ? "..." : ""),
          );
          return;
        }
      }
      setChatTitle(null);
    }
    updateTitle();
    window.addEventListener("omni-conversation-changed", updateTitle);
    window.addEventListener("omni-conversations-updated", updateTitle);
    return () => {
      window.removeEventListener("omni-conversation-changed", updateTitle);
      window.removeEventListener("omni-conversations-updated", updateTitle);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-4 bg-background/95 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <button
        onClick={toggleDrawer}
        className="p-2 -ml-2 text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer active:scale-[0.97]"
        aria-label="Toggle navigation drawer"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1 px-3 truncate text-center">
        <span className="text-base font-semibold text-foreground truncate">
          {chatTitle || "OmniSuite"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle variant="icon" />
        <Link
          to="/settings"
          title="User Profile"
          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.97]"
        >
          {profile?.username?.charAt(0).toUpperCase() || "U"}
        </Link>
      </div>
    </header>
  );
}

function MobileDrawer({ isOpen, closeDrawer }: { isOpen: boolean; closeDrawer: () => void }) {
  const { profile } = useAuth();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 z-50 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-[300px] bg-card border-r border-black/10 dark:border-white/10 z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4">
          <Link
            to="/"
            onClick={closeDrawer}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            OmniSuite
          </Link>
          <button
            onClick={closeDrawer}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <Link
            to="/chat"
            onClick={closeDrawer}
            className="w-full flex items-center gap-3 px-4 py-3 bg-surface-1 hover:bg-surface-2 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] mb-2"
          >
            <Plus className="h-5 w-5 text-primary" />
            New chat
          </Link>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("omni-open-search"));
              closeDrawer();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-muted-foreground hover:text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] mb-4"
          >
            <Search className="h-5 w-5" />
            Search chats
          </button>

          {/* Unified Navigation List */}
          <div className="space-y-1">
            <Link
              to="/chat"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Vlad Bot</span>
            </Link>
            <Link
              to="/downloader"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <Download className="h-5 w-5 text-emerald-400" />
              <span>Media Downloader</span>
            </Link>
            <Link
              to="/scanner"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <Scan className="h-5 w-5 text-amber-400" />
              <span>Doc Scanner</span>
            </Link>
            <Link
              to="/qr"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <QrCode className="h-5 w-5 text-pink-400" />
              <span>QR Code Studio</span>
            </Link>
            <Link
              to="/ocr"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <ImageIcon className="h-5 w-5 text-cyan-400" />
              <span>Local OCR</span>
            </Link>
            <Link
              to="/dakphraser"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <Wand2 className="h-5 w-5 text-purple-400" />
              <span>DakPhraser</span>
            </Link>
            <Link
              to="/guides"
              onClick={closeDrawer}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              <BookOpen className="h-5 w-5 text-orange-400" />
              <span>Field Guides</span>
            </Link>
          </div>
        </div>

        {/* Theme Switch & Profile Footer */}
        <div className="p-3 border-t border-black/10 dark:border-white/10 space-y-2">
          <ThemeToggle variant="labeled" />
          <Link
            to="/settings"
            onClick={closeDrawer}
            title="User Profile"
            className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.97]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold text-lg">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 text-foreground font-medium truncate">
              {profile?.username || "Settings"}
            </div>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-background">
      <div className="max-w-md p-10 text-center text-foreground">
        <h1 className="text-4xl font-extrabold">404</h1>
        <p className="mt-2 text-muted-foreground">This page doesn&apos;t exist yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-card hover:bg-surface-3 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-background">
      <div className="max-w-md p-10 text-center text-foreground">
        <h1 className="text-3xl font-extrabold">Something broke</h1>
        <p className="mt-2 break-words text-sm text-muted-foreground">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-card hover:bg-surface-3 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function AuthGate({ children }: { children: ReactNode }) {
  const { loading, session, isGuest, needsOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const authenticated = !!session || isGuest;
  if (!authenticated) return <AuthScreen />;
  if (needsOnboarding) return <OnboardingScreen />;
  return <>{children}</>;
}

function Shell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Register offline Service Worker in browser
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[OmniSuite] ServiceWorker registered with scope:", reg.scope);
          })
          .catch((err) => {
            console.warn("[OmniSuite] ServiceWorker registration skipped/failed:", err);
          });
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground font-sans">
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
            >
              <div
                className="absolute inset-0 dark:opacity-100 opacity-60 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to bottom, var(--background) 60%, var(--surface-2) 100%)`,
                }}
              />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
              <MobileTopBar toggleDrawer={() => setDrawerOpen(true)} />
              <MobileDrawer isOpen={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />

              <div className="flex-1 relative mt-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.a
            drag
            dragMomentum={false}
            href="https://wa.me/233208723497"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[calc(1.5rem+2in)] right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
            title="Contact on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </motion.a>
        </AuthGate>
      </AuthProvider>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Shell />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no",
      },
      { title: "OmniSuite" },
      {
        name: "description",
        content:
          "AI tech navigator and private in-browser offline tools for QR codes, document scanning, OCR, and media downloading.",
      },
      { property: "og:title", content: "OmniSuite" },
      {
        property: "og:description",
        content:
          "AI tech navigator and private in-browser offline tools for QR codes, document scanning, OCR, and media downloading.",
      },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
