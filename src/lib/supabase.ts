import { createClient } from "@supabase/supabase-js";

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? (process.env as Record<string, string | undefined>);
const url = env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const anonKey = (env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY) as string | undefined;

export const supabase = createClient(url as string, anonKey as string, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function isProviderEnabled(provider: "google" | "email"): Promise<boolean> {
  if (!url || !anonKey) return false;
  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
    });
    if (!res.ok) return false;
    const settings = (await res.json()) as { external?: Record<string, boolean> };
    return !!settings.external?.[provider];
  } catch {
    return false;
  }
}

export type Profile = {
  id: string;
  email: string | null;
  username: string;
  avatar_url: string | null;
  onboarded: boolean;
};
