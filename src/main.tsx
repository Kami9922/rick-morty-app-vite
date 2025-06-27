import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((reg) => console.log('SW registered:', reg))
			.catch((err) => console.log('SW registration failed:', err))
	})
}

const rootElement = document.getElementById('root')

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
} else {
	console.error('Failed to find the root element')
}
