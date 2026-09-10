/*
# Create profiles table for user personalization

## Purpose
Stores per-user profile data (username, avatar URL) that powers the
OmniSuite personalized welcome, navigation avatar, and profile menu.

## New Tables
- `profiles`
  - `id` (uuid, primary key) — references `auth.users.id`, cascades on delete
  - `email` (text) — the user's auth email, for display in the profile menu
  - `username` (text, not null) — display name chosen during onboarding
  - `avatar_url` (text, nullable) — uploaded avatar URL or null for initials default
  - `onboarded` (boolean, default false) — whether first-time setup is complete
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## Security
- Row Level Security enabled on `profiles`.
- Four separate owner-scoped policies (SELECT/INSERT/UPDATE/DELETE),
  restricted to `authenticated` role using `auth.uid() = id`.
- No `anon` access — this table is only for signed-in users.

## Notes
1. `id` defaults to `auth.uid()` so inserts from the client that omit `id`
   still satisfy the INSERT policy's `WITH CHECK`.
2. `onboarded` starts `false`; the frontend sets it to `true` after the
   onboarding step completes, so returning users skip the setup screen.
3. `avatar_url` is nullable — when null, the UI renders an initials-based
   avatar derived from `username`.
*/
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT gen_random_uuid(),
  email text,
  username text NOT NULL,
  avatar_url text,
  onboarded boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);
