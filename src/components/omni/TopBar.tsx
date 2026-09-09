import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { AppDrawer } from "./AppDrawer";
import { Sparkle } from "./Sparkle";
import { useThemeMode } from "./ThemeProvider";

export function TopBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useThemeMode();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border border-border/70 bg-card/82 px-2 py-2 shadow-[var(--shadow-plush)] backdrop-blur-xl">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-xl text-foreground transition hover:bg-surface-2 active:scale-90"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-1 text-[15px] font-extrabold tracking-[-0.03em]"
          >
            <Sparkle className="h-5 w-5" />
            {path === "/" ? "Ask Vladimir" : "OmniSuite"}
          </Link>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-90"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-extrabold text-primary-foreground shadow-sm">
            V
          </span>
        </div>
      </header>

      <AppDrawer
        open={open}
        onClose={() => setOpen(false)}
        onNewChat={() => {
          void navigate({ to: "/" });
          window.dispatchEvent(new Event("omni-new-chat"));
        }}
      />
    </>
  );
}
