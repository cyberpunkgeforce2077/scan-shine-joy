/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "screenshot-mobile.png",
    "revision": "b3196d2a2ae810ee097c33c719afff41"
  }, {
    "url": "screenshot-desktop.png",
    "revision": "b5d9964653f4ba0fb355d77862d87f58"
  }, {
    "url": "icon.svg",
    "revision": "82d8c4285ab8d8c3d3f5164886290ebe"
  }, {
    "url": "icon-512.png",
    "revision": "2716b521ed2b27da5e9b6e13270ef9ce"
  }, {
    "url": "icon-192.png",
    "revision": "70ed011702b8a20065a52f1541af859a"
  }, {
    "url": "favicon.ico",
    "revision": "07246953ccd81b0893e3ce1660b0aff9"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "20c42c2811661ea923f02f4019d2d881"
  }, {
    "url": "tesseract/worker.min.js",
    "revision": "b1ab464237e687b323da236fff45ba05"
  }, {
    "url": "tesseract/tesseract-core.wasm.js",
    "revision": "7ec67b8a67ab4d41b74dd8df49db9224"
  }, {
    "url": "tesseract/tesseract-core.wasm",
    "revision": "c320ce59e066ee7611e7368ef7933e70"
  }, {
    "url": "tesseract/tesseract-core.js",
    "revision": "96a20d65bdc68795f0687d6e52a7506e"
  }, {
    "url": "tesseract/tesseract-core-simd.wasm.js",
    "revision": "3fb1f6589c0569134cc593e0155acec4"
  }, {
    "url": "tesseract/tesseract-core-simd.wasm",
    "revision": "6eb049b42be27fbefd8c51e2888bacf4"
  }, {
    "url": "tesseract/tesseract-core-simd.js",
    "revision": "6c8a054a204c7b1cc7ae5ced9084282e"
  }, {
    "url": "tesseract/tesseract-core-simd-lstm.wasm.js",
    "revision": "2bd630487581a49b7d7cce1bfe42314c"
  }, {
    "url": "tesseract/tesseract-core-simd-lstm.wasm",
    "revision": "edf0565f7ba1b9fe45682847ffb257eb"
  }, {
    "url": "tesseract/tesseract-core-simd-lstm.js",
    "revision": "c3f3546e441284e219692467e8ca7ad5"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd.wasm.js",
    "revision": "c1d153edf29889b3ab4b14d4b7b8d1eb"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd.wasm",
    "revision": "96a8563032cb1a2855900238b028d2fb"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd.js",
    "revision": "d31443f14aacb519a068de47fa3b9712"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd-lstm.wasm.js",
    "revision": "f267f4efd6219843707c73b3a9a70604"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd-lstm.wasm",
    "revision": "509dc556e6e7d4f8428381efa6a6e3bf"
  }, {
    "url": "tesseract/tesseract-core-relaxedsimd-lstm.js",
    "revision": "cfcbc742bd161b14e41acbfb3427f168"
  }, {
    "url": "tesseract/tesseract-core-lstm.wasm.js",
    "revision": "a3c227d2e04b7be5d1ef50d75f3a5ee3"
  }, {
    "url": "tesseract/tesseract-core-lstm.wasm",
    "revision": "13071c2498108b146f004f69fe13df67"
  }, {
    "url": "tesseract/tesseract-core-lstm.js",
    "revision": "e5199c9f3a31b2c550127ae50886d4f4"
  }, {
    "url": "tessdata/eng.traineddata.gz",
    "revision": "cdb16c96ad27f1337540cbba05136314"
  }, {
    "url": "assets/utils-BuYa9y6l.js",
    "revision": null
  }, {
    "url": "assets/type-B0Wv8mYl.js",
    "revision": null
  }, {
    "url": "assets/trash-2-CztAom-J.js",
    "revision": null
  }, {
    "url": "assets/styles-Ce1zr4N9.css",
    "revision": null
  }, {
    "url": "assets/src-SuYvKHvm.js",
    "revision": null
  }, {
    "url": "assets/sparkles-BmPW2cxK.js",
    "revision": null
  }, {
    "url": "assets/settings-B7UakCWp.js",
    "revision": null
  }, {
    "url": "assets/scanner-DInTdm3t.js",
    "revision": null
  }, {
    "url": "assets/routes-APp4IjSV.js",
    "revision": null
  }, {
    "url": "assets/rolldown-runtime-C0FnF6B9.js",
    "revision": null
  }, {
    "url": "assets/refresh-cw-BKeMMeSL.js",
    "revision": null
  }, {
    "url": "assets/qr-rpdAKkTG.js",
    "revision": null
  }, {
    "url": "assets/qr-code-styling-BLATUasG.js",
    "revision": null
  }, {
    "url": "assets/purify.es-7fJ1DZ6H.js",
    "revision": null
  }, {
    "url": "assets/primitives-BAjheWQD.js",
    "revision": null
  }, {
    "url": "assets/pdf.worker.min-zC6nfbxG.js",
    "revision": null
  }, {
    "url": "assets/pdf-BpXMuzR3.js",
    "revision": null
  }, {
    "url": "assets/ocr-pKQcpAl8.js",
    "revision": null
  }, {
    "url": "assets/link-2-uQIYp6GJ.js",
    "revision": null
  }, {
    "url": "assets/jsx-dev-runtime-BPSjKgIE.js",
    "revision": null
  }, {
    "url": "assets/jspdf.es.min-C03nDO7b.js",
    "revision": null
  }, {
    "url": "assets/index.es-DM-FAlg6.js",
    "revision": null
  }, {
    "url": "assets/index-UBsFSSc2.js",
    "revision": null
  }, {
    "url": "assets/html2canvas-ez4nNFqA.js",
    "revision": null
  }, {
    "url": "assets/guides_._slug-SkxwW13Z.js",
    "revision": null
  }, {
    "url": "assets/guides-Ui4DkAMS.js",
    "revision": null
  }, {
    "url": "assets/downloader-zFnqxef3.js",
    "revision": null
  }, {
    "url": "assets/dakphraser-ChSXCU60.js",
    "revision": null
  }, {
    "url": "assets/createServerFn-B0ylq9Nd.js",
    "revision": null
  }, {
    "url": "assets/copy-B-uTYQ3j.js",
    "revision": null
  }, {
    "url": "assets/clock-jpntYbpw.js",
    "revision": null
  }, {
    "url": "assets/chat-DmesrmnM.js",
    "revision": null
  }, {
    "url": "assets/auth.callback-Ds01nVzQ.js",
    "revision": null
  }, {
    "url": "assets/arrow-right-8R_8EJX1.js",
    "revision": null
  }, {
    "url": "assets/arrow-left-DCdY0KmK.js",
    "revision": null
  }, {
    "url": "assets/Dropzone-BiNzPsxE.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
