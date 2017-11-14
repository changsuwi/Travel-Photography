// WARN: this file must live in the app root because the scope for
// service workers is defined by the directory in which the file resides.
const cacheFile = [
  './',
  './index.html',
  './aboutus.html',
  './maps.html',
  './upload.html',
  './assets/css/bootstrap.min.css',
  './assets/css/magnific-popup.css',
  './assets/css/main.css',
  './assets/css/owl.carousel.css',
  './assets/css/owl.carousel.min.css',
  './assets/css/owl.theme.default.min.css',
  './assets/css/round-about.css',
  './assets/images/add.png',
  './assets/images/logo.png',
  './assets/images/nav_icon.svg',
  './assets/images/nav-icon.png',
  './assets/images/icons/address.png',
  './assets/images/icons/call.png',
  './assets/images/icons/camera.png',
  './assets/images/icons/email.png',
  './assets/images/icons/f.png',
  './assets/images/icons/face.png',
  './assets/images/icons/i.png',
  './assets/images/icons/menu.png',
  './assets/images/icons/p.png',
  './assets/images/icons/t.png',
  './assets/images/icons/upload.png',
  './assets/images/icons/upload_black.png',
  './assets/js/app.js',
  './assets/js/bootstrap.min.js',
  './assets/js/jquery.magnific-popup.min.js',
  './assets/js/jquery-3.1.0.min.js',
  './assets/js/map.js',
  './assets/js/masonry.pkgd.min.js',
  './assets/js/owl.carousel.min.js',
  './assets/js/register.js',
  './assets/js/script.js',
  './assets/js/upload.js'
]

const cacheKey = 'demo-app-v1'

// install
self.addEventListener('install', event => {
  console.log("now install")

  event.waitUntil(
    caches.open(cacheKey)
    .then(cache => cache.addAll(cacheFile))
    // .then(() => self.skipWaiting())
  )
})

// activate
self.addEventListener('activate', event => {
  console.log(`activate ${cacheKey}, now ready to handle fetches`)
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const promiseArr = cacheNames.map(item => {
        if (item !== cacheKey) {
          return caches.delete(item)
        }
      })
      return Promise.all(promiseArr)
    })
  )
})

// fetch
self.addEventListener('fetch', event => {
  console.log(`${event.request.method}: ${event.request.url}`)
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
