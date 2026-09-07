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
      <header className="fixed inset-x-0 top-0 z-50 flex items-center gap-2 bg-background/85 px-3 py-3 backdrop-blur-md">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full text-foreground transition active:scale-90"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 text-[15px] font-bold tracking-tight">
          <Sparkle className="h-5 w-5" />
          {path === "/" ? "Ask Vladimir" : "OmniSuite"}
        </Link>
        <button
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:text-foreground active:scale-90"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-container text-xs font-bold text-primary-container-foreground">
          V
        </span>
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
