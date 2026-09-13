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
    <div className="flex min-h-screen flex-col bg-[#000000] pt-20 px-4 pb-32">
      <div className="mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-4 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#e3e3e3]">Settings</h2>
          <button onClick={() => navigate({ to: "/" })} className="p-2 text-[#8e8e8e] hover:text-[#e3e3e3] transition-colors rounded-full hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#D7A2F6] text-[#202124] font-bold text-3xl">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="text-sm font-medium text-[#8ab4f8] hover:underline">Change Logo</button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#c4c7c5]">Name</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-[#000000] px-4 py-3 text-[#e3e3e3] border border-white/10 focus:border-[#8ab4f8] focus:outline-none transition-colors"
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
              className="flex-1 rounded-full bg-[#e3e3e3] py-3 font-medium text-[#1e1f20] hover:bg-white transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          
          <button 
            onClick={() => { signOut(); navigate({ to: "/" }); }}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-red-500/30 text-red-400 py-3 font-medium hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm rounded-3xl bg-[#1e1f20] p-6 shadow-2xl mt-6 border border-white/10">
        <h2 className="text-xl font-semibold text-[#e3e3e3] mb-4">Contact Creator</h2>
        <p className="text-sm text-[#c4c7c5] mb-6">
          Have feedback or need support? Reach out directly via email.
        </p>
        <a 
          href="mailto:cyberpunkgeforce2077@gmail.com"
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#282a2c] text-[#e3e3e3] py-3 font-medium hover:bg-[#333538] transition-colors"
        >
          <Mail className="h-5 w-5" /> cyberpunkgeforce2077@gmail.com
        </a>
      </div>
    </div>
  );
}
