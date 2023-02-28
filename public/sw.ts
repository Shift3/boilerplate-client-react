import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';
import { writeData } from '../src/common/db/utility';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

// Urls that start with http://localhost:8000/agents/?
registerRoute(/http:\/\/localhost:8000\/agents\/\?.*/,
  async (args) => {
    return fetch(args.event.request)
      .then((res) => {
        const clonedRes = res.clone();
        clonedRes.json().then((data) => {
          const dataArray = data.results;
          for (const item of dataArray) {
            writeData('agents', item);
          }
        });
        return res;
      });
  },
  'GET'
);

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

registerRoute(function (routeData) {
  console.log('routeData:', routeData);
  console.log('routeData - get -', routeData.event.request.headers.get('accept'));
  return (routeData.event.request.headers.get('accept').includes('application/json') 
          || routeData.event.request.headers.get('accept').includes('text/html')
          || routeData.event.request.headers.get('accept').includes('img/jpeg')
          || routeData.event.request.headers.get('accept').includes('img/png')
          || routeData.event.request.headers.get('accept').includes('*/*')
          );
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

const bgSyncPlugin = new BackgroundSyncPlugin('RequestQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

// Creating Agents
registerRoute(/http:\/\/localhost:8000\/agents\/.*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);