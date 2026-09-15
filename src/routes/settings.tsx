import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/omni/AuthContext";
import { X, LogOut, Mail } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { profile, signOut, updateProfile } = useAuth();
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  return (
    <div className="flex min-h-screen flex-col bg-background pt-20 px-4 pb-32">
      <div className="mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-4 border border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <button
            onClick={() => navigate({ to: "/" })}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-3xl">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="text-sm font-medium text-primary hover:underline">
              Change Logo
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-background px-4 py-3 text-foreground border border-black/10 dark:border-white/10 focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={async () => {
                if (!username.trim() || username === profile?.username) return;
                setSaving(true);
                await updateProfile({ username: username.trim() });
                setSaving(false);
              }}
              disabled={saving}
              className="flex-1 rounded-full bg-foreground py-3 font-medium text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <button
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-red-500/30 text-red-400 py-3 font-medium hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl mt-6 border border-black/10 dark:border-white/10">
        <h2 className="text-xl font-semibold text-foreground mb-4">Contact Creator</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Have feedback or need support? Reach out directly via email.
        </p>
        <a
          href="mailto:cyberpunkgeforce2077@gmail.com"
          className="w-full flex items-center justify-center gap-2 rounded-full bg-surface-2 text-foreground py-3 font-medium hover:bg-surface-3 transition-colors"
        >
          <Mail className="h-5 w-5" /> cyberpunkgeforce2077@gmail.com
        </a>
      </div>
    </div>
  );
}
