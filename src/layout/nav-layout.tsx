import { Suspense } from 'react'
import { AuthStatus } from '../components'
import { Header } from '../ui/header/header'
import { Outlet } from 'react-router-dom'
import { Center, Loader } from '@mantine/core'

export const NavLayout = () => {
	return (
		<>
			<AuthStatus />
			<Header />
			<Suspense
				fallback={
					<Center py='lg'>
						{' '}
						<Loader size='lg' />
					</Center>
				}>
				<Outlet />
			</Suspense>
		</>
	)
}
