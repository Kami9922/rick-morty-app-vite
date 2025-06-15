import { Link } from 'react-router-dom'
import styles from './category.module.css'
import { useCallback, useRef } from 'react'
import { useSearchElements } from '../../hooks/useSearchElements'
import { Button, Loader, Center } from '@mantine/core' // Импортируем Loader и Center

export const Category = ({
	category,
	pageNumber,
	setPageNumber,
}: {
	category: 'character' | 'episode' | 'location'
	pageNumber: number
	setPageNumber: React.Dispatch<React.SetStateAction<number>>
}) => {
	const { error, hasMore, isLoading, elements } = useSearchElements(
		pageNumber,
		setPageNumber,
		category
	)

	const observer = useRef<IntersectionObserver | null>(null)

	const lastNodeRef = useCallback(
		(node: HTMLElement | null) => {
			if (isLoading || !hasMore) return

			if (observer.current) observer.current.disconnect()

			const obs = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prev) => prev + 1)
				}
			})
			observer.current = obs

			if (node) obs.observe(node)

			return () => obs.disconnect()
		},
		[isLoading, hasMore, setPageNumber]
	)

	if (isLoading && pageNumber === 1)
		return (
			<Center py='sm'>
				<Loader size='sm' />
			</Center>
		)

	if (error) return <div>Error loading data</div>

	return (
		<>
			<h1>{category.charAt(0).toUpperCase() + category.slice(1) + 's'}</h1>

			<ul className={styles.category}>
				{elements.map((item, index) => (
					<Link
						ref={index === elements.length - 1 ? lastNodeRef : null}
						to={`/${category}/${item.id}`}
						key={item.id}
						className={styles.link}>
						<Button
							fullWidth
							variant='outline'
							mb='sm'>
							<li className={styles.element}>{item.name}</li>
						</Button>
					</Link>
				))}
			</ul>
		</>
	)
}
