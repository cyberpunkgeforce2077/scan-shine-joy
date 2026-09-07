import type { ReactNode } from "react";

export function PlaceholderTool({ title, description, icon }: { title: string; description: string; icon: ReactNode }) {
  return <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">{icon}</span><h1 className="mt-6 text-2xl font-bold text-slate-100">{title}</h1><p className="mt-3 max-w-md text-sm text-slate-400">{description}</p></div>;
}
