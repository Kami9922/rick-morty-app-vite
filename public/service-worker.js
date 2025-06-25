const staticCacheName = 'static-site'

const ASSETS = ['/', '/index.html', '/manifest.json', '/assets/css/styles.css']

self.addEventListener('install', async (event) => {
	const cashe = await caches.open(staticCacheName)
	await cashe.addAll(ASSETS)
})

self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activated')
})

self.addEventListener('fetch', (event) => {
	console.log('FETCH', event.request.url)
	event.respondWith(
		cashes.match(event.request).then((casheRes) => {
			return casheRes || fetch(event.request)
		})
	)
})
