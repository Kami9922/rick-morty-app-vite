const CACHE_NAME = 'rick-morty-cache-v2'
const ASSETS = [
	'/',
	'/index.html',
	'/manifest.json',
	'/src/main.tsx',
	'/icons/192x192.png',
	'/icons/48x48.png',
]

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(ASSETS))
			.catch((err) => console.log('Cache addAll error:', err))
	)
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key)
					}
				})
			)
		})
	)
})

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
		return
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse
			}

			return fetch(event.request)
				.then((response) => {
					if (
						!response ||
						response.status !== 200 ||
						response.type !== 'basic'
					) {
						return response
					}

					const responseToCache = response.clone()

					caches.open(CACHE_NAME).then((cache) => {
						if (isCacheable(event.request)) {
							cache.put(event.request, responseToCache)
						}
					})

					return response
				})
				.catch(() => {
					if (event.request.headers.get('accept').includes('text/html')) {
						return caches
							.match('/index.html')
							.then((response) => response || new Response('Оффлайн-режим'))
					}
				})
		})
	)
})

function isCacheable(request) {
	return (
		request.url.startsWith('http') &&
		!request.url.includes('chrome-extension') &&
		!request.url.includes('sockjs-node') &&
		!request.url.includes('hot-update')
	)
}
