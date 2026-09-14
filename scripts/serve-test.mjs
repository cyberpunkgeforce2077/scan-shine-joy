// Serve the Nitro "vercel" prebuilt (.vercel/output) locally.
// The function expects a web-standard Request and returns a web-standard Response.
// Usage: node scripts/serve-test.mjs [port] [staticDir]

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat, readdir } from "node:fs/promises";
import { join, normalize, extname } from "node:path";

const ROOT = new URL("../.vercel/output/", import.meta.url).pathname;
const port = Number(process.argv[2] ?? 8899);
const staticDir = process.argv[3] || join(ROOT, "static");

const funcDir = join(ROOT, "functions/__server.func");
const mod = await import(join(funcDir, "index.mjs"));
const handler = mod.default || mod;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
};

async function tryFile(path) {
  try {
    const st = await stat(path);
    return st.isFile() ? path : null;
  } catch {
    return null;
  }
}

// Vercel's static dir is flattened: `/favicon.ico` -> `static/icon-192.png` etc.
// Follow the actual layout by trying the direct path first, then a content-negotiated
// lookup for known root-level files.
async function resolveStatic(urlPath) {
  let p = normalize(join(staticDir, urlPath));
  if (!p.startsWith(staticDir)) return null;
  let f = await tryFile(p);
  if (f) return f;
  // directory index
  if (urlPath.endsWith("/")) {
    f = await tryFile(join(p, "index.html"));
    if (f) return f;
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://localhost:${port}`);
    // 1. if the request maps to a real static file, serve it
    const file = await resolveStatic(reqUrl.pathname);
    if (file) {
      res.statusCode = 200;
      res.setHeader("content-type", MIME[extname(file)] ?? "application/octet-stream");
      res.setHeader("cache-control", reqUrl.pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache");
      createReadStream(file).pipe(res);
      return;
    }
    // 2. otherwise hand to the Nitro server function (SSR)
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (v !== undefined) headers.set(k, Array.isArray(v) ? v.join(",") : v);
    }
    const body = req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await new Promise((resolve) => {
          let d = "";
          req.on("data", (c) => (d += c));
          req.on("end", () => resolve(d));
        });
    // Use the same scheme/host as Vercel would so absolute redirects work.
    const origin = process.env.SERVE_ORIGIN
      ? new URL(process.env.SERVE_ORIGIN)
      : reqUrl;
    const r = await handler.fetch(new Request(origin, { method: req.method, headers, body }));
    res.statusCode = r.status;
    r.headers.forEach((v, k) => {
      if (k.toLowerCase() !== "content-length") res.setHeader(k, v);
    });
    res.end(await r.text());
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("internal error: " + (e.stack || e));
  }
});

server.listen(port, "0.0.0.0", () =>
  console.log(`[serve-test] listening on http://0.0.0.0:${port} static=${staticDir}`)
);