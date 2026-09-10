import { createClient } from "@supabase/supabase-js";

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? (process.env as Record<string, string | undefined>);
const url = env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Profile = {
  id: string;
  email: string | null;
  username: string;
  avatar_url: string | null;
  onboarded: boolean;
};
