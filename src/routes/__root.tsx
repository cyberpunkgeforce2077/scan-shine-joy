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
import { UserRound, Waves } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/omni/ThemeProvider";
import { WorkspaceProvider, useWorkspace } from "@/components/omni/WorkspaceContext";
import { WorkspaceSidebar } from "@/components/omni/WorkspaceSidebar";
import { WorkspaceToolbar, WorkspaceMobileBar } from "@/components/omni/WorkspaceToolbar";
import { ChatHome } from "@/components/omni/ChatHome";
import { BackgroundEditor } from "@/components/omni/BackgroundEditor";
import { PlaceholderTool } from "@/components/omni/PlaceholderTool";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-md p-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-100">404</h1>
        <p className="mt-2 text-slate-400">This tool doesn&apos;t exist yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-cyan-400/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/30"
        >
          Back to the hub
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-md p-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-100">Something broke</h1>
        <p className="mt-2 break-words text-sm text-slate-400">{error.message}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-cyan-400/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/30"
        >
          Back to the hub
        </Link>
      </div>
    </div>
  );
}

function WorkspaceContent() {
  const { activeTool } = useWorkspace();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (path !== "/") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {activeTool === "chat" && <ChatHome />}
        {activeTool === "background" && <BackgroundEditor />}
        {activeTool === "silhouette" && (
          <PlaceholderTool
            title="Silhouette Studio"
            description="Isolate subjects and generate minimalist silhouette cutouts. This module is coming soon."
            icon={<UserRound className="h-7 w-7" />}
          />
        )}
        {activeTool === "mesh" && (
          <PlaceholderTool
            title="Mesh Lines Lab"
            description="Design intersecting cybernetic grid curves and export them as SVG patterns. This module is coming soon."
            icon={<Waves className="h-7 w-7" />}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ShellInner() {
  const { collapsed } = useWorkspace();
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F19] text-slate-100">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="ambient-grid absolute inset-0" />
          <span className="ambient-orb-a absolute -left-32 top-[-10%] h-[32rem] w-[32rem] rounded-full" />
          <span className="ambient-orb-b absolute -right-32 bottom-[-15%] h-[36rem] w-[36rem] rounded-full" />
          <span className="ambient-orb-c absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full" />
        </div>
        <WorkspaceSidebar />
        <div className={collapsed ? "lg:pl-[76px]" : "lg:pl-[284px]"}>
          <WorkspaceMobileBar />
          <WorkspaceToolbar />
          <WorkspaceContent />
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0c1320",
            color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />
    </ThemeProvider>
  );
}

function Shell() {
  return (
    <WorkspaceProvider>
      <ShellInner />
    </WorkspaceProvider>
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
      { title: "Nexus AI — Immersive Workspace" },
      {
        name: "description",
        content:
          "Nexus AI is an immersive dark-futuristic workspace: AI chat with session history, background editor, and in-browser utility tools.",
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
