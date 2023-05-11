/*
 * React Boilerplate Service Worker version 1.0
 * Handles caching of common long-lived assets
 */

// The name of the cache your app uses.
const CACHE_NAME = 'boilerplate-client-react-cache-v1';
// The list of static files your app needs to start.
const PRE_CACHED_RESOURCES = ['/', 'styles.css', 'app.js'];

// Lifecyle Event: The browser has downloaded the SW and triggered an install event
self.addEventListener('install', event => {
  console.log('WORKER: install event in progress.');
  self.skipWaiting(); // this allows the SW to run immediately, otherwise the user must refresh the page

  // here we want to pre-cache long-lived files
});

// Lifecyle Event: The SW has been activated
self.addEventListener('activate', event => {
  console.log('WORKER: activate event in progress.');

  // here we want to invalidate old caches
  event.waitUntil(deleteOldCaches);
});

async function deleteOldCaches() {
  // List all caches by their names.
  const names = await caches.keys();
  await Promise.all(
    names.map(name => {
      if (name !== CACHE_NAME) {
        return caches.delete(name);
      }
    }),
  );
}
