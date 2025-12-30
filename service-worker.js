const CACHE_NAME = "munchi-mist-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/product.html",
  "/cart.html",
  "/css/product.css",
  "/css/cart.css",
  "/js/product.js",
  "/js/cart.js",
  "/data/products.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
