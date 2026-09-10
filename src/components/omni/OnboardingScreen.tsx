import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Camera, Check, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/omni/AuthContext";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function OnboardingScreen() {
  const { session, completeOnboarding } = useAuth();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
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
    if (!session) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
      const path = `${session.user.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(urlData.publicUrl);
      toast.success("Avatar uploaded.");
    } catch {
      toast.error("Could not upload avatar. You can skip this step.");
    } finally {
      setBusy(false);
    }
  }

  async function handleContinue(skipAvatar: boolean) {
    const name = username.trim();
    if (!name) {
      toast.error("Please enter a username to continue.");
      return;
    }
    setBusy(true);
    try {
      await completeOnboarding(name, skipAvatar ? null : avatarUrl);
    } catch {
      toast.error("Could not save your profile. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <span className="ambient-orb-a absolute -left-24 top-[-10%] h-[26rem] w-[26rem] rounded-full" />
        <span className="ambient-orb-b absolute -right-24 bottom-[-15%] h-[30rem] w-[30rem] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-bar rounded-3xl px-7 py-10 sm:px-10 sm:py-12">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">1 of 1</p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Let&rsquo;s personalize OmniSuite
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Tell us a little about yourself so we can make your experience feel more personal.
            </p>
          </div>

          <div className="mt-9">
            <label className="block text-sm font-bold text-foreground">
              What should we call you?
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleContinue(false)}
              placeholder="Enter your username"
              maxLength={30}
              className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-7">
            <label className="block text-sm font-bold text-foreground">Choose an avatar</label>
            <p className="mt-1 text-xs text-muted-foreground">Optional — upload an image or use your initials.</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar preview" className="h-20 w-20 rounded-2xl border border-border object-cover" />
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-2xl border border-border bg-primary-container text-xl font-extrabold text-primary-container-foreground">
                    {initialsFrom(username || "U")}
                  </div>
                )}
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(null)}
                    aria-label="Remove avatar"
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-2 active:scale-95 disabled:opacity-50"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload image
                </button>
                {!avatarUrl && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Camera className="h-3 w-3" /> Or continue with initials
                  </span>
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

          <div className="mt-9 space-y-3">
            <button
              type="button"
              onClick={() => handleContinue(false)}
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-4 w-4" />}
              Continue to OmniSuite
            </button>
            <button
              type="button"
              onClick={() => handleContinue(true)}
              disabled={busy}
              className="w-full rounded-2xl px-5 py-3 text-sm font-bold text-muted-foreground transition hover:text-foreground active:scale-[0.98] disabled:opacity-50"
            >
              Skip avatar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
