import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Camera, Check, Loader2, LogOut, Pencil, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/omni/AuthContext";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export function ProfileAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const { user, profile } = useAuth();
  const dims = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-xs";
  const avatarUrl = profile?.avatar_url ?? googleAvatarUrl(user);
  if (avatarUrl) {
    return <img src={avatarUrl} alt="" className={cn("rounded-xl object-cover", dims)} />;
  }
  return (
    <span
      className={cn(
        "grid place-items-center rounded-xl bg-primary font-extrabold text-primary-foreground shadow-sm",
        dims,
      )}
    >
      {initials(profile?.username ?? googleUsernameFrom(user) ?? "U")}
    </span>
  );
}

function googleAvatarUrl(user: User | null): string | null {
  const meta = user?.user_metadata as Record<string, unknown> | undefined;
  for (const key of ["avatar_url", "picture"] as const) {
    const raw = meta?.[key];
    if (typeof raw === "string" && raw) return raw;
  }
  return null;
}

function googleUsernameFrom(user: User | null): string | null {
  const meta = user?.user_metadata as Record<string, unknown> | undefined;
  for (const key of ["full_name", "name"] as const) {
    const raw = meta?.[key];
    if (typeof raw === "string" && raw.trim()) return raw.trim();
  }
  const local = user?.email?.split("@")[0];
  return local && local.trim() ? local.trim() : null;
}

export function ProfileMenu() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
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
            <p className="truncate text-sm font-bold text-foreground">
              {profile?.username ?? googleUsernameFrom(user) ?? "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {profile?.email ?? user?.email ?? "Guest"}
            </p>
          </div>
          <div className="p-1.5">
            <button
              onClick={() => {
                setEditOpen(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <Pencil className="h-4 w-4" /> Edit profile
            </button>
            <button
              onClick={() => {
                setAvatarOpen(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <Camera className="h-4 w-4" /> Change avatar
            </button>
            <button
              onClick={() => {
                void signOut();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      )}

      {editOpen && <EditProfileDialog onClose={() => setEditOpen(false)} />}
      {avatarOpen && <ChangeAvatarDialog onClose={() => setAvatarOpen(false)} />}
    </div>
  );

  function EditProfileDialog({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState(profile?.username ?? "");
    const [saving, setSaving] = useState(false);

    async function save() {
      const trimmed = name.trim();
      if (!trimmed) {
        toast.error("Username cannot be empty.");
        return;
      }
      setSaving(true);
      try {
        await updateProfile({ username: trimmed });
        toast.success("Profile updated.");
        onClose();
      } catch {
        toast.error("Could not update profile.");
      } finally {
        setSaving(false);
      }
    }

    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-plush-lg)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Edit profile</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="mt-5 block text-sm font-bold text-foreground">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="mt-2 w-full rounded-2xl border border-border bg-surface-1 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
          />
          <button
            onClick={save}
            disabled={saving}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      </div>
    );
  }

  function ChangeAvatarDialog({ onClose }: { onClose: () => void }) {
    const { session, isGuest } = useAuth();
    const [busy, setBusy] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    async function handleUpload(file: File) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Avatar must be under 2 MB.");
        return;
      }
      setBusy(true);
      try {
        if (isGuest || !session) {
          const dataUrl = await readFileAsDataURL(file);
          await updateProfile({ avatar_url: dataUrl });
        } else {
          const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
          const path = `${session.user.id}/avatar.${ext}`;
          const { error: upErr } = await supabase.storage
            .from("avatars")
            .upload(path, file, { upsert: true });
          if (upErr) throw upErr;
          const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
          await updateProfile({ avatar_url: urlData.publicUrl });
        }
        toast.success("Avatar updated.");
        onClose();
      } catch {
        toast.error("Could not upload avatar.");
      } finally {
        setBusy(false);
      }
    }

    async function removeAvatar() {
      setBusy(true);
      try {
        await updateProfile({ avatar_url: null });
        toast.success("Avatar removed.");
        onClose();
      } catch {
        toast.error("Could not remove avatar.");
      } finally {
        setBusy(false);
      }
    }

    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-plush-lg)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Change avatar</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 flex flex-col items-center gap-4">
            <ProfileAvatar size="md" />
            <div className="flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-1 px-4 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-2 active:scale-95 disabled:opacity-50"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload new
              </button>
              {profile?.avatar_url && (
                <button
                  onClick={removeAvatar}
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-muted-foreground transition hover:text-foreground active:scale-95 disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
