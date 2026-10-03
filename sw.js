// Cambia la versión al publicar contenido nuevo para que los celulares actualicen.
const CACHE = "academia-ndt-v1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png",
  "img/grieta-longitudinal.jpg", "img/grieta-transversal.jpg", "img/grieta-crater.jpg", "img/porosidad-superficial.jpg",
  "img/perforacion.jpg", "img/falta-penetracion.jpg", "img/inclusion-escoria.jpg", "img/porosidad-interna.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Red primero para la página (contenido actualizado), caché si no hay conexión.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { caches.open(CACHE).then(c => c.put("index.html", r.clone())); return r; }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })));
});
