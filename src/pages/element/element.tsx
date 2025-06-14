import { useSearchElements } from '../../hooks/useSearchElements'
import { useParams } from 'react-router-dom'

export const Element = ({
	pageNumber,
	setPageNumber,
}: {
	pageNumber: number
	setPageNumber: React.Dispatch<React.SetStateAction<number>>
}) => {
	const { category, id } = useParams<{
		category?: 'character' | 'episode' | 'location'
		id?: string
	}>()

	const { elements } = useSearchElements(pageNumber, setPageNumber, category)

	const elementId = id ? parseInt(id, 10) : null
	const element =
		elementId !== null ? elements.find((item) => item.id === elementId) : null

	if (!element || !category) {
		return <div>Element not found</div>
	}

	switch (element.kind) {
		case 'character':
			return (
				<ul>
					<li className='title-name'>{element.name}</li>
					<img
						src={element.image}
						alt={element.name}
					/>
					<li>Status: {element.status}</li>
					<li>Species: {element.species}</li>
					{element.type && <li>Type: {element.type}</li>}
					<li>Gender: {element.gender}</li>
				</ul>
			)
		case 'episode':
			return (
				<ul>
					<li className='title-name'>{element.name}</li>
					<li>Air Date: {element.air_date}</li>
					<li>Episode: {element.episode}</li>
				</ul>
			)
		case 'location':
			return (
				<ul>
					<li className='title-name'>{element.name}</li>
					<li>Type: {element.type}</li>
					<li>Dimension: {element.dimension}</li>
				</ul>
			)
		default:
			return <div>Element not found</div>
	}
}
