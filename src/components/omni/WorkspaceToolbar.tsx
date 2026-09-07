import { useState } from "react";
import { Menu, MoreVertical, Moon, Sun } from "lucide-react";
import { useThemeMode } from "@/components/omni/ThemeProvider";
import { useWorkspace } from "@/components/omni/WorkspaceContext";

const titles = { chat: "Chat with Nexus", background: "Background Editor", silhouette: "Silhouette Studio", mesh: "Mesh Lines Lab" };

export function WorkspaceToolbar() {
  const { activeTool } = useWorkspace();
  const { theme, toggle } = useThemeMode();
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/[0.08] bg-[#080d18]/70 px-5 backdrop-blur-xl"><span className="text-sm font-semibold text-slate-100">{titles[activeTool]}</span><span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">Beta</span><div className="relative ml-auto flex items-center gap-2"><button type="button" aria-label="Toggle theme" onClick={toggle} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-cyan-200">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button><button type="button" aria-label="Open account menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-cyan-200"><MoreVertical className="h-4 w-4" /></button><span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300/15 text-xs font-bold text-cyan-100">V</span>{open && <div className="absolute right-0 top-11 w-40 rounded-xl border border-white/[0.08] bg-[#0c1320]/95 p-1 backdrop-blur-xl"><button className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/[0.06]">Account</button><button className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/[0.06]">Settings</button></div>}</div></header>;
}

export function WorkspaceMobileBar() {
  const { createNewChat, collapsed, setCollapsed } = useWorkspace();
  return <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/[0.08] bg-[#080d18]/80 px-4 backdrop-blur-xl lg:hidden"><button type="button" aria-label="Toggle sidebar" onClick={() => setCollapsed(!collapsed)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400"><Menu className="h-4 w-4" /></button><span className="text-sm font-bold tracking-[0.18em] text-slate-100">NEXUS AI</span><button type="button" onClick={createNewChat} className="ml-auto rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100">New chat</button></header>;
}
