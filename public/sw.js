const CACHE_NAME = 'jci-go-cache-v1';

// This is a basic service worker. It's kept simple to ensure it works
// without specific knowledge of Next.js build outputs.
// It mainly helps the app pass PWA installation checks.

self.addEventListener('install', (event) => {
  // Perform install steps
  console.log('Service Worker: Installing...');
  // Skip waiting to activate the new service worker faster
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // For a "network falling back to cache" strategy:
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
