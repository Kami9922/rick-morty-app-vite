import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth-provider/auth-provider'

export const PrivateRoute = ({ children }: React.PropsWithChildren) => {
	const auth = useAuth()
	const location = useLocation()

	if (auth.user === null) {
		return (
			<Navigate
				to='/login'
				state={{ from: location.pathname }}
				replace
			/>
		)
	}

	return children
}
