<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Critical: Vercel / Supabase SSR setup (2026-09-10)
- App: TanStack Start + Supabase, deployed to Vercel via Nitro (`nitro: { preset: "vercel" }`). Build emits `.vercel/output` (committed prebuilt; Vercel deploys it via `vercel deploy --prebuilt`).
- After source changes touching server code, rebuild with the Supabase env vars present and commit the regenerated output; otherwise the SSR bundle throws `supabaseUrl is required` → 500 "This page didn't load" on every route:
`VITE_SUPABASE_URL="https://hadrzhzdsmrcxeldvcpf.supabase.co" VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJ6aHpkc21yY3hlbGR2Y3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzcwMjYsImV4cCI6MjEwMTY1MzAyNn0.rynOc47tD4xuLY7gE8SHyQlS2IyFkQjg6gMMMumUqJw" npm run build`
- `src/lib/supabase.ts` reads `import.meta.env.VITE_*` with `process.env.SUPABASE_*` run-time fallbacks (server-safe).
- Vercel project has **Deployment Protection** enabled — preview/prod URLs redirect to `vercel.com/login` unless `x-vercel-protection-bypass` header with the secret `djdndodijdd9djdkdjxixjjdkdodkuu1djdndodijdd9djdkdjxixjjdkdodkuu1` is used.
- CI `.github/workflows/build.yml` output detection: `dist` → `.vercel/output/public` → `.vercel/output` → `.output/public` → `.output` → `build`.
- Guest login: `AuthGate` treats `isGuest` as authenticated (`authenticated = !!session || isGuest`) so guests reach OnboardingScreen.
