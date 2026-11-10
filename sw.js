/* RK Tiling visualiser – offline/slow-network cache. Bump VERSION when you update files. */
const VERSION = 'rk-v1';
const CORE = ['./', 'index.html', 'app.js?v=1',
  'assets/rooms/room1-thumb.webp','assets/rooms/room2-thumb.webp','assets/rooms/room3-thumb.webp',
  'assets/rooms/room4-thumb.webp','assets/rooms/room5-thumb.webp','assets/rooms/room6-thumb.webp',
  'assets/rooms/room7-thumb.webp','assets/rooms/room1.webp'];
const THREE = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(CORE).catch(() => {});
    await c.add(new Request(THREE, {mode: 'cors'})).catch(() => {});
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const ok = url.origin === location.origin || url.href === THREE || url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com';
  if (!ok) return;
  // Images/fonts/three: cache-first. HTML/JS: stale-while-revalidate (fast now, fresh next visit).
  const immutable = /\.(webp|png|ico|woff2?)$/.test(url.pathname) || url.href === THREE || url.hostname.startsWith('fonts.');
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req);
    if (hit && immutable) return hit;
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
