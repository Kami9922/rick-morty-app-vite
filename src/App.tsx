import './App.css'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components'
import { NavLayout } from './layout/nav-layout'
import { AuthProvider } from './context/auth-provider/auth-provider'
import { lazy, useState } from 'react'
import { ErrorBoundary } from './components/error-boundary/error-boundary'

const Category = lazy(() =>
	import('./pages').then((module) => ({ default: module.Category }))
)
const Element = lazy(() =>
	import('./pages').then((module) => ({ default: module.Element }))
)
const NotFound = lazy(() =>
	import('./components').then((module) => ({ default: module.NotFound }))
)
const Login = lazy(() =>
	import('./pages').then((module) => ({ default: module.Login }))
)

export const App = () => {
	const [pageNumber, setPageNumber] = useState(1)
	return (
		<div className='App'>
			<AuthProvider>
				<Routes>
					<Route
						path='/'
						element={<NavLayout />}>
						<Route
							path='/characters'
							element={
								<ErrorBoundary>
									<PrivateRoute>
										<Category
											pageNumber={pageNumber}
											setPageNumber={setPageNumber}
											category='character'
										/>
									</PrivateRoute>
								</ErrorBoundary>
							}
						/>
						<Route />
						<Route
							path='/locations'
							element={
								<ErrorBoundary>
									<PrivateRoute>
										<Category
											pageNumber={pageNumber}
											setPageNumber={setPageNumber}
											category='location'
										/>
									</PrivateRoute>
								</ErrorBoundary>
							}
						/>
						<Route
							path='/episodes'
							element={
								<ErrorBoundary>
									<PrivateRoute>
										<Category
											pageNumber={pageNumber}
											setPageNumber={setPageNumber}
											category='episode'
										/>
									</PrivateRoute>
								</ErrorBoundary>
							}
						/>
						<Route />
						<Route
							path='/:category/:id'
							element={
								<ErrorBoundary>
									<PrivateRoute>
										<Element
											pageNumber={pageNumber}
											setPageNumber={setPageNumber}
										/>
									</PrivateRoute>
								</ErrorBoundary>
							}
						/>
					</Route>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</AuthProvider>
		</div>
	)
}
