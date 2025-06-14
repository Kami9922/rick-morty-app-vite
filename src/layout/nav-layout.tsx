import { Suspense } from 'react'
import { AuthStatus } from '../components'
import { Header } from '../ui/header/header'
import { Outlet } from 'react-router-dom'

export const NavLayout = () => {
	return (
		<>
			<AuthStatus />
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>
		</>
	)
}
