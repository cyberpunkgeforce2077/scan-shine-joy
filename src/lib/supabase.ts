import { createClient } from "@supabase/supabase-js";

const env =
  (import.meta as { env?: Record<string, string | undefined> }).env ??
  (process.env as Record<string, string | undefined>);
const url =
  env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "https://hadrzhzdsmrcxeldvcpf.supabase.co";
const anonKey =
  env.VITE_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJ6aHpkc21yY3hlbGR2Y3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzcwMjYsImV4cCI6MjEwMTY1MzAyNn0.rynOc47tD4xuLY7gE8SHyQlS2IyFkQjg6gMMMumUqJw";

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
