# OmniSuite / Ask Vladimir

## Run locally

Install the existing dependencies and start the TanStack Start development server:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5000
```

The Replit preview uses the `Start application` workflow with the same command.

## Project map

- `src/routes/` contains the TanStack Router pages.
- `src/components/omni/` contains the shared shell, chat experience, tool framing, and browser utilities.
- `src/components/` contains QR creation/scanning components and shared Radix-based UI primitives.
- `src/lib/` contains server functions and client utility helpers.
- `src/data/guides.ts` contains the local guides catalog.

## Product notes

- The home route is the Ask Vladimir assistant and persists the latest conversations in local storage.
- QR, document scanning, OCR, and image processing run in the browser where possible.
- The downloader, paraphraser, and assistant use the existing server functions in `src/lib/`; keep their request contracts intact when changing UI.
- The visual system is defined in `src/styles.css` and shared interaction patterns live in `src/components/omni/primitives.tsx`.