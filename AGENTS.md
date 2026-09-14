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
- **FUNCTION_INVOCATION_FAILED / 502 on every route** (2026-09-13): the committed `.vercel/output` bundle was missing shared server chunks that `functions/__server.func/index.mjs` imports at module load (`_libs/h3+rou3+srvx.mjs`, `_libs/h3-v2+rou3+srvx.mjs`, `_libs/@tanstack/*`, `_libs/@supabase/*`, `_libs/framer-motion+[...].mjs`). Vercel's runtime crashed at boot with `ERR_MODULE_NOT_FOUND`. Quick check after any build:
  `node -e "import('./.vercel/output/functions/__server.func/index.mjs').then(()=>console.log('OK')).catch(e=>console.log(e.code))"`
  Reproduce/debug locally by serving `scripts/serve-test.mjs` against the prebuilt function. If it boots and returns 200, deploy is safe.
- Vercel project has **Deployment Protection** enabled — preview/prod URLs redirect to `vercel.com/login` unless `x-vercel-protection-bypass` header with the secret `djdndodijdd9djdkdjxixjjdkdodkuu1djdndodijdd9djdkdjxixjjdkdodkuu1` is used.
- CI `.github/workflows/build.yml` output detection: `dist` → `.vercel/output/public` → `.vercel/output` → `.output/public` → `.output` → `build`.
- Guest login: `AuthGate` treats `isGuest` as authenticated (`authenticated = !!session || isGuest`) so guests reach OnboardingScreen.
- **Serving the prebuilt locally / on the runtime hosts**: the commits carry the Nitro `.vercel/output` prebuilt, but the all-hands runtime hosts (ports 12000 / 12001) do not auto-deploy — the app's servers must be started manually after a rebuild: `node scripts/serve-test.mjs 12000` and `node scripts/serve-test.mjs 12001` (SERVE_ORIGIN can be set to the public host URL so absolute redirects match).

## Stale committed prebuilt (2026-09-14)

- The committed `.vercel/output` had drifted from source: it was an old build (missing shared chunks now emitted at `_libs/@floating-ui/*`, `_libs/@radix-ui/*`, `_libs/debug+[...].mjs`, `_libs/fetch-blob+[...].mjs`), and `src/routeTree.gen.ts` was stale (missing the `/music` and `/video` routes). Symptom: every route 500s at SSR with `TypeError: Getter must be a function: Symbol(react.activity)` during module init, then `ReferenceError: describeError is not defined` when rendering the error page — so the user only ever saw "This page didn't load".
- Root cause is simply that the prebuilt was not rebuilt after source changes. A fresh `npm run build` (with the Supabase env vars) regenerates everything consistently and every route returns 200.
- Latent source bug fixed at the same time: `src/server.ts` called `describeError(...)` without importing it, so the debug error page itself threw. It now imports `describeError` from `./lib/error-capture`.
- After any rebuild, verify with `node scripts/serve-test.mjs 12000` + `curl -o /dev/null -w '%{http_code}' http://localhost:12000/` (expect 200, no `didn't load` / `debug-error` in the body) before committing the regenerated output.
