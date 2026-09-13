const CACHE_NAME = "omnisuite-cache-v2";

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
  "/robots.txt",
  "/tessdata/eng.traineddata.gz",
  "/tessdata/eng.traineddata",
  "/tesseract/worker.min.js",
  "/tesseract/tesseract-core-simd-lstm.wasm.js",
  "/tesseract/tesseract-core.wasm.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(PRECACHE_URLS).catch((err) => console.warn("Precache failed:", err)),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Do not intercept non-GET requests or server functions
  if (request.method !== "GET") return;

  // Do not intercept external cross-origin analytics/APIs
  if (url.origin !== self.location.origin) return;

  // Never cache server function POST/GET internal endpoints
  if (url.pathname.startsWith("/_serverFn") || url.pathname.startsWith("/api/")) {
    return;
  }

  // Handle navigation requests: Network First, fallback to cached '/'
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/");
          if (fallback) return fallback;
          return new Response(
            "<html><body style='background:#000;color:#fff;font-family:sans-serif;padding:2rem;text-align:center'><h2>OmniSuite Offline</h2><p>You are offline. Please reconnect or open cached tools.</p><button onclick='location.reload()' style='padding:8px 16px;border-radius:20px;background:#8ab4f8;border:none;font-weight:bold'>Retry</button></body></html>",
            { headers: { "Content-Type": "text/html" } },
          );
        }),
    );
    return;
  }

  // For static assets (JS, CSS, images, tessdata, fonts): Cache First, fallback to Network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Fetch in background to update cache (Stale-While-Revalidate)
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cached;
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        return response;
      });
    }),
  );
});
