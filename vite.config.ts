import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: 'Rick Morty App',
				short_name: 'RickMortyApp',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				icons: [
					{
						src: '/icons/48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
					{
						src: '/icons/192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	server: {
		port: 3002,
		open: true,
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	publicDir: 'public',
})
