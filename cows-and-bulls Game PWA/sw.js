self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/js/app.js',
      '/css/style.css',      
      '/css/gfont-open-sans.css',  
      '/img/game_over.png',
      '/img/winner.jpg',
      '/icons/favicon.ico',
      '/icons/icon-32.png',
      '/icons/icon-64.png',
      '/icons/icon-96.png',
      '/icons/icon-128.png',
      '/icons/icon-168.png',
      '/icons/icon-192.png',
      '/icons/icon-256.png',
      '/icons/icon-512.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

