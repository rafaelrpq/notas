var CACHE_NAME = 'notas-cache';
var urlsToCache = [
  './',
  './index.html',
  './estilo.css',
  './manifest.json',
  './src/main.js',
  './res/notas.png',
];

self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open (CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener ('fetch', (event) => {
    event.respondWith (
        caches.match (event.request)
        .then (cacheResponse => (cacheResponse || fetch (event).request))
    )
})

self.addEventListener ('push', (event) => {
    let notification = event.data.text ()
    console.log (event.data)
    self.registration.showNotification (
        'Atenção'
        ,{
            "body" : notification,
            "icon" : "res/notas.png"

        }
    )
})
