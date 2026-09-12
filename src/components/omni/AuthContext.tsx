import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, type Profile } from "@/lib/supabase";

type AuthMode = "google" | "guest" | null;

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  needsOnboarding: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signInAsGuest: () => void;
  completeOnboarding: (username: string, avatarUrl: string | null) => Promise<void>;
  updateProfile: (updates: Partial<Pick<Profile, "username" | "avatar_url">>) => Promise<void>;
  signOut: () => Promise<void>;
};

const GUEST_KEY = "omni-guest-profile";

const AuthContext = createContext<AuthState | null>(null);

function readGuestProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Profile;
    if (parsed && parsed.username) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function writeGuestProfile(profile: Profile | null) {
  try {
    if (profile) localStorage.setItem(GUEST_KEY, JSON.stringify(profile));
    else localStorage.removeItem(GUEST_KEY);
  } catch {
    /* ignore */
  }
}

function googleAvatar(user: User): string | null {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (!meta) return null;
  const raw = meta["avatar_url"] ?? meta["picture"];
  return typeof raw === "string" && raw ? raw : null;
}

function googleUsername(user: User): string {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  for (const key of ["full_name", "name"] as const) {
    const raw = meta?.[key];
    if (typeof raw === "string" && raw.trim()) return raw.trim();
  }
  const local = user.email?.split("@")[0]?.trim();
  return local ?? "";
}

// When no profiles row exists yet, derive a Profile from the authenticated
// Supabase user so Google identity (name/email/avatar) shows immediately
// instead of falling back to "Guest" or blocking on onboarding.
function profileFromAuthUser(user: User): Profile {
  const username = googleUsername(user);
  return {
    id: user.id,
    email: user.email ?? null,
    username,
    avatar_url: googleAvatar(user),
    onboarded: Boolean(username),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, username, avatar_url, onboarded")
      .eq("id", userId)
      .maybeSingle();
    if (error) return null;
    return data as Profile | null;
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        if (data.session) {
          setAuthMode("google");
          fetchProfile(data.session.user.id)
            .then((p) => {
              if (!mounted) return;
              setProfile(p ?? profileFromAuthUser(data.session!.user));
              setLoading(false);
            })
            .catch(() => {
              if (!mounted) return;
              setProfile(profileFromAuthUser(data.session!.user));
              setLoading(false);
            });
        } else {
          const guest = readGuestProfile();
          if (guest) {
            setAuthMode("guest");
            setProfile(guest);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      if (newSession) {
        setAuthMode("google");
        setLoading(true);
        (async () => {
          try {
            const p = await fetchProfile(newSession.user.id);
            if (!mounted) return;
            setProfile(p ?? profileFromAuthUser(newSession.user));
          } finally {
            if (!mounted) return;
            setLoading(false);
          }
        })();
      } else {
        setProfile(null);
        setAuthMode(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signInWithEmail = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { redirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signInAsGuest = useCallback(() => {
    setAuthMode("guest");
    setProfile(null);
    setLoading(false);
  }, []);

  const completeOnboarding = useCallback(
    async (username: string, avatarUrl: string | null) => {
      if (authMode === "guest") {
        const guestProfile: Profile = {
          id: "guest",
          email: null,
          username,
          avatar_url: avatarUrl,
          onboarded: true,
        };
        writeGuestProfile(guestProfile);
        setProfile(guestProfile);
        return;
      }
      if (!session) return;
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: session.user.id,
          email: session.user.email ?? null,
          username,
          avatar_url: avatarUrl,
          onboarded: true,
          updated_at: new Date().toISOString(),
        })
        .select("id, email, username, avatar_url, onboarded")
        .single();
      if (error) throw error;
      setProfile(data as Profile);
    },
    [session, authMode],
  );

  const updateProfile = useCallback(
    async (updates: Partial<Pick<Profile, "username" | "avatar_url">>) => {
      if (authMode === "guest") {
        if (!profile) return;
        const updated = { ...profile, ...updates };
        writeGuestProfile(updated);
        setProfile(updated);
        return;
      }
      if (!session) return;
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: session.user.id,
          email: session.user.email ?? null,
          username: updates.username ?? profile?.username ?? googleUsername(session.user),
          avatar_url:
            updates.avatar_url !== undefined
              ? updates.avatar_url
              : (profile?.avatar_url ?? googleAvatar(session.user)),
          onboarded: true,
          updated_at: new Date().toISOString(),
        })
        .select("id, email, username, avatar_url, onboarded")
        .single();
      if (error) throw error;
      setProfile(data as Profile);
    },
    [session, authMode, profile],
  );

  const signOut = useCallback(async () => {
    if (authMode === "guest") {
      writeGuestProfile(null);
      setProfile(null);
      setAuthMode(null);
      return;
    }
    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
    setAuthMode(null);
  }, [authMode]);

  const isGuest = authMode === "guest";
  const needsOnboarding =
    (authMode === "guest" && !profile?.onboarded) || (!!session && !!profile && !profile.onboarded);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        needsOnboarding,
        isGuest,
        signInWithGoogle,
        signInWithEmail,
        signInAsGuest,
        completeOnboarding,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
