// Initialize required variables - Cache Assets
var shellCacheName = "pwa-todo-v1";
var filesToCache = [
  "./index.html",
  "./src",
  "./images",
  "https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/intro.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css"
];

// Listen to installation event
self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(shellCacheName).then(function (cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

// Listen to activation event - Update Assets Cache
self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    // Get all cache containers
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          // Check and remove invalid cache containers
          if (key !== shellCacheName) {
            //console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  // Enforce immediate scope control
  return self.clients.claim();
});

// Listen to fetching event - Serve App Shell Offline From Cache
self.addEventListener("fetch", function (e) {
  console.log("[ServiceWorker] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
