import { useAuth } from '../../context/auth-provider/auth-provider'
import { Link, useNavigate } from 'react-router-dom'
import styles from './auth-status.module.css'
import { Button, Group, Text, Avatar, Menu } from '@mantine/core'
import { IconLogout, IconUser } from '@tabler/icons-react'

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
				className={styles.unlogged}
				to='/login'
				replace>
				<Button>Sign in</Button>
			</Link>
		)
	}

	return (
		<Group
			className={styles.status}
			gap='sm'>
			<Menu
				shadow='md'
				width={200}
				position='bottom-end'>
				<Menu.Target>
					<Group
						gap='xs'
						style={{ cursor: 'pointer' }}>
						<Avatar
							color='blue'
							radius='xl'
							size='sm'>
							<IconUser size={16} />
						</Avatar>
						<Text
							fw={500}
							size='sm'
							truncate
							style={{ maxWidth: '120px' }}>
							{auth.user}
						</Text>
					</Group>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item
						leftSection={<IconLogout />}
						onClick={handleSignout}
						color='red'>
						Sign out
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	)
}
