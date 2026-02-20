const CACHE_NAME = 'stanway-v1';
const PRECACHE = [
  'styles-luxury.min.css',
  'luxury.min.js',
  'includes/images/Logo/Logo.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Only cache same-origin GET requests
  if (e.request.method !== 'GET' || url.origin !== location.origin) {
    // For Google Fonts, use stale-while-revalidate
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      e.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          cache.match(e.request).then(cached => {
            const fetched = fetch(e.request).then(response => {
              cache.put(e.request, response.clone());
              return response;
            });
            return cached || fetched;
          })
        )
      );
      return;
    }
    return;
  }

  // HTML pages: network-first (always get latest content, fall back to cache)
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // CSS, JS, images: cache-first
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(response => {
          if (response.ok) cache.put(e.request, response.clone());
          return response;
        });
      })
    )
  );
});
