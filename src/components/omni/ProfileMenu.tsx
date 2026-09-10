import { useEffect, useRef, useState } from "react";
import { LogOut, Pencil, Camera, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/omni/AuthContext";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function ProfileAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const { profile } = useAuth();
  const dims = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-xs";
  if (profile?.avatar_url) {
    return <img src={profile.avatar_url} alt="" className={cn("rounded-xl object-cover", dims)} />;
  }
  return (
    <span className={cn("grid place-items-center rounded-xl bg-primary font-extrabold text-primary-foreground shadow-sm", dims)}>
      {initials(profile?.username ?? "U")}
    </span>
  );
}

export function ProfileMenu() {
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
        className="transition active:scale-90"
      >
        <ProfileAvatar />
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-plush-lg)] backdrop-blur-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-bold text-foreground">{profile?.username ?? "User"}</p>
            <p className="truncate text-xs text-muted-foreground">{profile?.email ?? ""}</p>
          </div>
          <div className="p-1.5">
            <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground">
              <Pencil className="h-4 w-4" /> Edit profile
            </button>
            <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground">
              <Camera className="h-4 w-4" /> Change avatar
            </button>
            <button
              onClick={() => { void signOut(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
