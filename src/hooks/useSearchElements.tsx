import axios from 'axios'
import { useEffect, useState } from 'react'
import { ElementType } from '../types/types'

export const useSearchElements = (
	pageNumber: number,
	setPageNumber: React.Dispatch<React.SetStateAction<number>>,
	category: 'character' | 'episode' | 'location' | undefined
) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [elements, setElements] = useState<ElementType[]>([])
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		if (!category) return

		setIsLoading(true)
		setError(false)
		setElements([])
		setHasMore(true)
		setPageNumber(1)

		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${category}`,
			params: { page: 1 },
		})
			.then((res) => {
				const typedElements = res.data.results.map((item: any) => ({
					...item,
					kind: category,
				}))
				setElements(typedElements)
				setHasMore(!!res.data.info.next)
			})
			.catch((error) => {
				setError(true)
				console.log(error)
			})
			.finally(() => setIsLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category])

	useEffect(() => {
		if (!category || pageNumber === 1) return

		setIsLoading(true)
		setError(false)

		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${category}`,
			params: { page: pageNumber },
		})
			.then((res) => {
				const typedElements = res.data.results.map((item: any) => ({
					...item,
					kind: category,
				}))
				setElements((prev) => {
					const merged = [...prev, ...typedElements]
					return merged.filter(
						(item, index, self) =>
							index === self.findIndex((i) => i.id === item.id)
					)
				})
				setHasMore(!!res.data.info.next)
			})
			.catch((error) => {
				setError(true)
				console.log(error)
			})
			.finally(() => setIsLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageNumber])

	return { error, isLoading, elements, hasMore }
}
