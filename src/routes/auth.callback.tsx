import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  useEffect(() => {
    // Supabase handles the session via hash fragment automatically in the client.
    // Once it's done, we can just close the window.
    supabase.auth.getSession().then(() => {
      // Small delay to ensure localStorage events propagate to parent window
      setTimeout(() => {
        if (window.opener) {
          window.close();
        } else {
          window.location.href = "/";
        }
      }, 500);
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-[#e3e3e3]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#8ab4f8]" />
        <p className="text-lg font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}
