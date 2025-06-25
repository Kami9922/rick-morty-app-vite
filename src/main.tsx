import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(() => console.log('Service Worker Registered'))
		.catch(() => console.log('Service Worker Failed to Register'))
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
