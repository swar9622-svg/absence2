const CACHE_NAME = 'attendance-app-v1';
const urlsToCache = [
  './',
  'index.html'
];

// تثبيت الـ Service Worker وحفظ الملفات في الذاكرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// قراءة الملفات من الذاكرة المحلية عند قطع النت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
