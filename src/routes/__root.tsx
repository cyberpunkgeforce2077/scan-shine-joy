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
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/omni/ThemeProvider";
import { AuthProvider, useAuth } from "@/components/omni/AuthContext";
import { AuthScreen } from "@/components/omni/AuthScreen";
import { OnboardingScreen } from "@/components/omni/OnboardingScreen";
import { TopBar } from "@/components/omni/TopBar";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="plush max-w-md p-10 text-center">
        <h1 className="text-4xl font-extrabold">404</h1>
        <p className="mt-2 text-muted-foreground">This tool doesn&apos;t exist yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to Ask Vladimir
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="plush max-w-md p-10 text-center">
        <h1 className="text-3xl font-extrabold">Something broke</h1>
        <p className="mt-2 break-words text-sm text-muted-foreground">{error.message}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to Ask Vladimir
        </Link>
      </div>
    </div>
  );
}

function AuthGate({ children }: { children: ReactNode }) {
  const { loading, session, profile, isGuest, needsOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <div className="relative min-h-screen overflow-x-hidden bg-background">
            <div
              aria-hidden
              className="personalized-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
            >
              <span className="ambient-orb-a absolute -left-24 top-[-10%] h-[26rem] w-[26rem] rounded-full" />
              <span className="ambient-orb-b absolute -right-24 bottom-[-15%] h-[30rem] w-[30rem] rounded-full" />
              <span className="ambient-orb-c absolute left-[38%] top-[34%] h-[24rem] w-[24rem] rounded-full" />
            </div>
            <div className="relative z-10">
              <TopBar />
              <AnimatePresence mode="wait">
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OmniSuite — Ask Vladimir, your AI tech navigator" },
      {
        name: "description",
        content:
          "OmniSuite is a premium in-browser toolkit: QR studio, document scanner, media compressor, background remover, object eraser and OCR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
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
