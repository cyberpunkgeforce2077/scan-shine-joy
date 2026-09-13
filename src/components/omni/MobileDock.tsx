import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  MessageSquare,
  QrCode,
  ScanText,
  SlidersHorizontal,
} from "lucide-react";
import { Sparkle } from "./Sparkle";
import { cn } from "@/lib/utils";

export function MobileDock({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    {
      to: "/" as const,
      label: "Ask",
      icon: MessageSquare,
      isSparkle: true,
      active: path === "/",
    },
    {
      to: "/qr" as const,
      label: "QR",
      icon: QrCode,
      active: path.startsWith("/qr"),
    },
    {
      to: "/scanner" as const,
      label: "Docs",
      icon: FileText,
      active: path.startsWith("/scanner"),
    },
    {
      to: "/ocr" as const,
      label: "OCR",
      icon: ScanText,
      active: path.startsWith("/ocr"),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation dock"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-around rounded-2xl border border-border/80 bg-card/95 p-1.5 shadow-[var(--shadow-plush-lg)] backdrop-blur-2xl">
        {items.map((item) => {
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-all duration-150 active:scale-95",
                item.active
                  ? "bg-primary-container text-primary-container-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {item.isSparkle ? <Sparkle className="h-4 w-4" /> : <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open tool drawer"
          className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold text-muted-foreground transition-all duration-150 hover:bg-surface-2 hover:text-foreground active:scale-95"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
