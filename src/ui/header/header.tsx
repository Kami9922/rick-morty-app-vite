import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<div>
			<h1>Hello to all fans of Rick and Morty!</h1>
			<h3>Nav Panel</h3>
			<ul>
				<li>
					<Link to='/characters'>Characters</Link>
				</li>
				<li>
					<Link to='/episodes'>Episodes</Link>
				</li>
				<li>
					<Link to='/locations'>Locations</Link>
				</li>
			</ul>
		</div>
	)
}
