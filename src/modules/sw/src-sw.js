/* This is an actual service worker */

workbox.precaching.precacheAndRoute(self.__precacheManifest);

addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
    }
});