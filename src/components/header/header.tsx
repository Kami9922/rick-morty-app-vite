import { Button, Text, Group, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconUser, IconMovie, IconMapPin } from '@tabler/icons-react'

export const Header = () => {
	return (
		<Stack
			gap='sm'
			p='md'>
			<h1>Hello to all fans of Rick and Morty!</h1>

			<Text
				fw={500}
				ta='center'
				c='dimmed'>
				Nav Panel
			</Text>

			<Group
				justify='center'
				gap='md'>
				<Button
					component={Link}
					to='/characters'
					leftSection={<IconUser size='1rem' />}
					variant='light'>
					Characters
				</Button>

				<Button
					component={Link}
					to='/episodes'
					leftSection={<IconMovie size='1rem' />}
					variant='light'>
					Episodes
				</Button>

				<Button
					component={Link}
					to='/locations'
					leftSection={<IconMapPin size='1rem' />}
					variant='light'>
					Locations
				</Button>
			</Group>
		</Stack>
	)
}
