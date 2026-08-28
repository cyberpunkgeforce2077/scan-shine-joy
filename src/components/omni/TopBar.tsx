import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { OmniLogo } from "./Sparkle";
import { useThemeMode } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Hub" },
  { to: "/qr", label: "QR" },
  { to: "/scanner", label: "Docs" },
  { to: "/ocr", label: "OCR" },
] as const;

function ThemeSelector() {
  const { theme, setTheme } = useThemeMode();
  const options = [
    { id: "light", icon: Sun },
    { id: "system", icon: Monitor },
    { id: "dark", icon: Moon },
  ] as const;
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-surface-2/80 p-1">
      {options.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          aria-label={`${id} theme`}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-all duration-200 active:scale-90",
            theme === id
              ? "bg-card text-primary shadow-[var(--shadow-plush)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}

export function TopBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="glass-bar mx-auto flex w-full max-w-6xl items-center gap-3 rounded-full py-2 pl-3 pr-2">
        <Link to="/" className="shrink-0">
          <OmniLogo />
        </Link>

        <div className="mx-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary-container"
                  />
                )}
                <span
                  className={cn(
                    "relative",
                    active
                      ? "text-primary-container-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeSelector />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-2/80 text-foreground transition active:scale-90 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="plush-raised mx-auto mt-2 grid w-full max-w-6xl grid-cols-2 gap-1.5 p-2 sm:grid-cols-4 lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                path === item.to
                  ? "bg-primary-container text-primary-container-foreground"
                  : "text-muted-foreground hover:bg-surface-2",
              )}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
