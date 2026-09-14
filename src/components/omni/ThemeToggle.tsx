import { Sun, Moon } from "lucide-react";
import { useThemeMode } from "./ThemeProvider";
import { motion } from "motion/react";

interface ThemeToggleProps {
  variant?: "icon" | "switch" | "labeled";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useThemeMode();
  const isDark = theme === "dark";

  if (variant === "switch") {
    return (
      <button
        id="theme-toggle-switch"
        type="button"
        onClick={toggle}
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isDark ? "bg-[#2a2b2e]" : "bg-neutral-200"
        } ${className}`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-[#121314] shadow-sm transform ${
            isDark ? "translate-x-7 text-amber-300" : "translate-x-1 text-amber-500"
          }`}
        >
          {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </motion.div>
      </button>
    );
  }

  if (variant === "labeled") {
    return (
      <button
        id="theme-toggle-labeled"
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-sm font-medium ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground">
            {isDark ? (
              <Moon className="h-4 w-4 text-amber-300" />
            ) : (
              <Sun className="h-4 w-4 text-amber-500" />
            )}
          </div>
          <span className="text-foreground">{isDark ? "Dark theme" : "Light theme"}</span>
        </div>
        <span className="text-xs text-muted-foreground capitalize">
          {isDark ? "Switch to Light" : "Switch to Dark"}
        </span>
      </button>
    );
  }

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#1e1f20] text-neutral-700 dark:text-[#e3e3e3] hover:bg-neutral-200 dark:hover:bg-[#2a2b2e] transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-300 hover:text-amber-200 transition-colors" />
        ) : (
          <Moon className="h-4 w-4 text-neutral-800 hover:text-black transition-colors" />
        )}
      </motion.div>
    </button>
  );
}
