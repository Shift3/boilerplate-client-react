import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';
import { writeData } from '../src/common/db/utility';
import { useAuth } from '../src/features/auth/hooks';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute([{"revision":"b75ae000439862b6a97d2129c85680e8","url":"bootstrap.bundle.min.js"},{"revision":"3f30c2c47d7d23c7a994db0c862d45a5","url":"bootstrap.min.css"},{"revision":"7f98bafec3debd677ae13746caf0425d","url":"favicon.ico"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"2188852b35933f66039e6caeb7d99f71","url":"manifest.json"},{"revision":"4ef48feda6e0082530020001b73e8a80","url":"offline.html"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"}]);

// Urls that start with http://localhost:8000/agents/?
// registerRoute(/http:\/\/localhost:8000\/agents\/\?.*/,
//   async (args) => {
//     return fetch(args.event.request)
//       .then((res) => {
//         const clonedRes = res.clone();
//         clonedRes.json().then((data) => {
//           const dataArray = data.results;
//           for (const item of dataArray) {
//             writeData('agents', item);
//           }
//         });
//         return res;
//       });
//   },
//   'GET'
// );

const precacheHandler = async ({request}) => {
    // Fallback assets are precached when the service worker is installed, and are
    // served in the event of an error below. Use `event`, `request`, and `url` to
    // figure out how to respond, or use request.destination to match requests for
    // specific resource types.
    switch (request.destination) {
      case 'document':
        return matchPrecache('/offline.html')
                .then((res) => {
                    return res || Response.error();
                  });
  
      case 'style':
        return matchPrecache('/bootstrap.min.css')
                .then((res) => {
                    return res || Response.error();
                  });
  
      case 'script':
        return matchPrecache('/bootstrap.bundle.min.js')
                .then((res) => {
                    return res || Response.error();
                  });
  
      default:
        // If we don't have a fallback, return an error response.
        return Response.error();
    }
}

registerRoute(function (routeData) { // TODO: Create additional register routes in order to dynamically cache the index.tsx, the vite client, and that react-refresh thing
  console.log('routeData:', routeData);
  console.log('routeData - get -', routeData.event.request.headers.get('accept'));
  return (routeData.event.request.headers.get('accept').includes('text/html'));
}, async (args) => {
  return caches.match(args.event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(args.event.request)
          .then(function (res) {
            return caches.open('dynamic')
              .then(function (cache) {
                cache.put(args.event.request.url, res.clone());
                return res;
              })
          })
          .catch(function (err) {
            return precacheHandler(args.event.request);
          });
      }
    })
});


registerRoute(function (routeData) { // TODO: Create additional register routes in order to dynamically cache the index.tsx, the vite client, and that react-refresh thing
  console.log('routeData:', routeData);
  console.log('routeData - get -', routeData.event.request.headers.get('accept'));
  return (routeData.event.request.headers.get('accept').includes('*/*'));
}, async (args) => {

  const { token } = useAuth();

  return caches.match(args.event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        const url = args.event.request.url;
        if (url.includes('index.tsx')) {
          return fetch(url)
          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // })
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return precacheHandler(args.event.request);
            });
        } else if (url.includes('@react-refresh')) {
          return fetch(url)
          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // })
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return precacheHandler(args.event.request);
            });
        } else if (url.includes('@vite/client')) {
          return fetch(url)
          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // })
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return precacheHandler(args.event.request);
            });
        } else if (url.includes('event-token/')) {
          return fetch(url)
          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // })
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return precacheHandler(args.event.request);
            });
        } else if (url.includes('?read__isnull=true')) {
          return fetch(url)
          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // })
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return precacheHandler(args.event.request);
            });
        } else {
          // return precacheHandler(args.event.request); // Getting an error. Look into this, but it looks like I'm going in the right direction.
          
          const url = args.event.request.url;

          return fetch(url).then(res => res);

          
          const { token } = useAuth();

          // return fetch(url, {
          //   headers: { Authorization: `Token ${token}` },
          // }).then(res => res);
          
        }
      }
    })
});

// registerRoute(function (routeData) {
//   console.log('routeData:', routeData);
//   console.log('routeData - get -', routeData.event.request.headers.get('accept'));
//   return (routeData.event.request.headers.get('accept').includes('*/*'));
// }, async (args) => {
//   return caches.match(args.event.request)
//     .then(function (response) {
//       if (response) {
//         return response;
//       } else {
//         return fetch(args.event.request)
//           .then(function (res) {
//             return caches.open('dynamic')
//               .then(function (cache) {
//                 cache.put(args.event.request.url, res.clone());
//                 return res;
//               })
//           })
//           .catch(function (err) {
//             return precacheHandler(args.event.request);
//           });
//       }
//     })
// });

// const bgSyncPlugin = new BackgroundSyncPlugin('RequestQueue', {
//   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
// });

// // Creating Agents
// registerRoute(/http:\/\/localhost:8000\/agents\/.*/,
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );