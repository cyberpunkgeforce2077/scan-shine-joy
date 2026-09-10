import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Mail, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/omni/AuthContext";
import { Sparkle } from "@/components/omni/Sparkle";

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

export function AuthScreen() {
  const { signInWithGoogle, signInWithEmail, signInAsGuest } = useAuth();
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");

  async function handleGoogle() {
    setBusy("google");
    try {
      await signInWithGoogle();
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setBusy(null);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy("email");
    const { error } = await signInWithEmail(email.trim());
    if (error) {
      toast.error(error);
      setBusy(null);
    } else {
      toast.success("Check your inbox for a sign-in link.");
      setBusy(null);
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
          <div className="flex flex-col items-center text-center">
            <span className="relative grid h-[68px] w-[68px] place-items-center rounded-2xl border border-primary/15 bg-primary-container shadow-[var(--shadow-plush)]">
              <span className="absolute h-12 w-12 rounded-full bg-primary/20 blur-xl" />
              <Sparkle className="relative h-10 w-10" />
            </span>
            <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Welcome to OmniSuite
            </h1>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Your private assistant for exploring, creating, and getting things done.
            </p>
          </div>

          <div className="mt-9 space-y-3">
            <button
              onClick={handleGoogle}
              disabled={busy !== null}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground shadow-sm transition hover:bg-surface-2 hover:shadow-[var(--shadow-plush)] active:scale-[0.98] disabled:opacity-50"
            >
              {busy === "google" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            {emailMode ? (
              <form onSubmit={handleEmail} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={busy !== null}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                >
                  {busy === "email" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Send sign-in link
                </button>
              </form>
            ) : (
              <button
                onClick={() => setEmailMode(true)}
                disabled={busy !== null}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-transparent px-5 py-3.5 text-sm font-bold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-[0.98] disabled:opacity-50"
              >
                <Mail className="h-4 w-4" />
                Continue with email
              </button>
            )}

            <div className="relative pt-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">or</span>
              </div>
            </div>

            <button
              onClick={signInAsGuest}
              disabled={busy !== null}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-transparent px-5 py-3.5 text-sm font-bold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-[0.98] disabled:opacity-50"
            >
              <UserRound className="h-4 w-4" />
              Continue as guest
            </button>
          </div>

          <div className="mt-7 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            Your account helps us personalize your OmniSuite experience.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
