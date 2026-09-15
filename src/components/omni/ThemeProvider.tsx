import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const KEY = "omni-theme";

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void; toggle: () => void }>({
  theme: "light",
  setTheme: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let initial: Theme = "light";
    try {
      const stored = localStorage.getItem(KEY) as Theme | null;
      if (stored === "light" || stored === "dark") initial = stored;
      else initial = "light";
    } catch {
      /* ignore */
    }
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <ThemeCtx.Provider
      value={{ theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") }}
    >
      {children}
    </ThemeCtx.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeCtx);
