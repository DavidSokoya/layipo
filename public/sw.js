const CACHE_NAME = 'jci-go-cache-v1';

// On install, the service worker is installed.
self.addEventListener('install', (event) => {
    console.log('Service Worker installed.');
    // Activate worker immediately
    event.waitUntil(self.skipWaiting());
});

// On activate, clean up old caches.
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        }).then(() => {
            // Take control of all open pages
            return self.clients.claim();
        })
    );
});

// On fetch, use a cache-first, then network strategy.
self.addEventListener('fetch', (event) => {
    // We only want to cache GET requests.
    // We also avoid caching webpack hot-reload chunks.
    if (event.request.method !== 'GET' || event.request.url.includes('/_next/static/webpack')) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                // Return response from cache if found.
                if (response) {
                    return response;
                }

                // Otherwise, fetch from network.
                return fetch(event.request).then((networkResponse) => {
                    // If we get a valid response, cache it for next time.
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                       cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        })
    );
});
