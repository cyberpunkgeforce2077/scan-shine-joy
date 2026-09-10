import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { BookOpen, FileText, Menu, Moon, QrCode, Sun } from "lucide-react";
import { useState } from "react";
import { AppDrawer } from "./AppDrawer";
import { Sparkle } from "./Sparkle";
import { useThemeMode } from "./ThemeProvider";
import { ProfileMenu } from "./ProfileMenu";

export function TopBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useThemeMode();
  const desktopLinks = [
    { to: "/guides" as const, label: "Guides", icon: BookOpen },
    { to: "/qr" as const, label: "QR", icon: QrCode },
    { to: "/scanner" as const, label: "Docs", icon: FileText },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="glass-bar mx-auto flex max-w-6xl items-center gap-2 rounded-2xl px-2 py-2">
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
          <nav aria-label="Primary navigation" className="ml-5 hidden items-center gap-1 md:flex">
            {desktopLinks.map((item) => {
              const active = path === item.to || path.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-primary-container text-primary-container-foreground"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-90"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <ProfileMenu />
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
