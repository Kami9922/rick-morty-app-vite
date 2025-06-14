import { useAuth } from '../../context/auth-provider/auth-provider'
import { Link, useNavigate } from 'react-router-dom'
import styles from './auth-status.module.css'

export const AuthStatus = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	const handleSignout = () => {
		auth.signout(() => {
			navigate('/')
		})
	}

	if (auth.user === null) {
		return (
			<Link
				to='/login'
				replace>
				<button className={styles.unlogged}>Sign in</button>
			</Link>
		)
	}

	return (
		<div className={styles.status}>
			<span>{auth.user}</span>
			<button onClick={handleSignout}>Sign out</button>
		</div>
	)
}
