importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/detail.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/push.js", revision: "1" },
    { url: "/sw.js", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/img/icons/apple.png", revision: "1" },
    { url: "/img/icons/icon-72x72.png", revision: "1" },
    { url: "/img/icons/icon-96x96.png", revision: "1" },
    { url: "/img/icons/icon-128x128.png", revision: "1" },
    { url: "/img/icons/icon-144x144.png", revision: "1" },
    { url: "/img/icons/icon-152x152.png", revision: "1" },
    { url: "/img/icons/icon-192x192.png", revision: "1" },
    { url: "/img/icons/icon-384x384.png", revision: "1" },
    { url: "/img/icons/icon-512x512.png", revision: "1" },
    { url: "/img/favorite.jpg", revision: "1" },
    { url: "/img/jumbo.jpg", revision: "1" },
    { url: "/img/match.jpg", revision: "1" },
    { url: "/img/squad.jpg", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/detail.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/notification.js", revision: "1" },
    { url: "/js/registersw.js", revision: "1" },
    { url: "/pages/nav/nav.html", revision: "1" },
    { url: "/pages/nav/side.html", revision: "1" },
    { url: "/pages/match.html", revision: "1" },
    { url: "/pages/saved.html", revision: "1" },
    { url: "/pages/standing.html", revision: "1" },
    { url: "/pages/team.html", revision: "1" },
    {
      url: "https://fonts.googleapis.com/icon?family=Material+Icons",
      revision: "1",
    },
    {
      url:
        "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
      revision: "1",
    },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "chelseaa",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// inisialisasi push notification
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/72x72",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
