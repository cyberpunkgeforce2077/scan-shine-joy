import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bot, ChevronLeft, ChevronRight, Grid3X3, Layers3, MessageSquarePlus, PanelLeft, Search, SlidersHorizontal, UserRound, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace, type WorkspaceTool } from "@/components/omni/WorkspaceContext";

const tools: { id: WorkspaceTool; label: string; icon: typeof Bot }[] = [
  { id: "chat", label: "AI Menu", icon: Bot },
  { id: "silhouette", label: "Silhouette", icon: UserRound },
  { id: "background", label: "Background", icon: Layers3 },
  { id: "mesh", label: "Mesh Lines", icon: Waves },
];

export function WorkspaceSidebar() {
  const navigate = useNavigate();
  const { sessions, activeSessionId, activeTool, collapsed, createNewChat, selectSession, setActiveTool, setCollapsed } = useWorkspace();
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => sessions.filter((session) => session.title.toLowerCase().includes(search.toLowerCase())), [sessions, search]);

  return (
    <>
      <button type="button" aria-label="Close sidebar" onClick={() => setCollapsed(true)} className={cn("fixed inset-0 z-40 bg-black/60 lg:hidden", collapsed && "hidden")} />
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[284px] flex-col border-r border-white/[0.08] bg-[#080d18]/90 backdrop-blur-2xl transition-all duration-300 lg:flex", collapsed ? "-translate-x-full lg:w-[76px] lg:translate-x-0" : "translate-x-0") }>
        <div className="flex h-20 items-center gap-3 px-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Grid3X3 className="h-4 w-4" /></span>
          <span className="text-sm font-bold tracking-[0.18em] text-slate-100 lg:block">NEXUS AI</span>
          <button type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed(!collapsed)} className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-cyan-200">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <div className="px-3"><button type="button" onClick={createNewChat} className="flex h-11 w-full items-center gap-3 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/15"><MessageSquarePlus className="h-4 w-4 shrink-0" /><span>New chat</span></button></div>
        <div className="px-3 pt-5"><label className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-slate-500 focus-within:border-cyan-300/30"><Search className="h-4 w-4 shrink-0" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chats" className="min-w-0 flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500" /></label></div>
        <div className="scrollbar-soft min-h-0 flex-1 overflow-y-auto px-3 py-5"><p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Chat history</p><div className="space-y-1">{filtered.map((session) => <button key={session.id} type="button" onClick={() => selectSession(session.id)} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition", activeSessionId === session.id && activeTool === "chat" ? "bg-white/[0.09] text-slate-100" : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200")}><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" /><span className="truncate">{session.title}</span></button>)}{filtered.length === 0 && <p className="px-3 py-3 text-xs text-slate-500">No matching chats</p>}</div></div>
        <div className="border-t border-white/[0.08] p-3"><p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Workspace</p><div className="space-y-1">{tools.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { setActiveTool(id); if (id === "chat") void navigate({ to: "/" }); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition", activeTool === id ? "bg-cyan-300/10 text-cyan-100" : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200")}><Icon className="h-4 w-4 shrink-0" />{label}</button>)}</div><Link to="/hub" className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-200"><PanelLeft className="h-4 w-4" />All tools</Link><div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] pt-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-300/15 text-xs font-bold text-cyan-100">V</span><span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-300">Vladimir Selorm</span><SlidersHorizontal className="h-4 w-4 text-slate-500" /></div></div>
      </aside>
    </>
  );
}
