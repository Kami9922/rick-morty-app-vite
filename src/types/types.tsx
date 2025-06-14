import { ReactNode } from 'react'

export interface Character {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	image: string
	created: string
	kind: 'character'
}

export interface Episode {
	id: number
	name: string
	air_date: string
	episode: string
	created: string
	kind: 'episode'
}

export interface Location {
	id: number
	name: string
	type: string
	dimension: string
	created: string
	kind: 'location'
}

export type ElementType = Character | Episode | Location

export interface Props {
	children: ReactNode
	fallback?: ReactNode
}

export interface State {
	hasError: boolean
	error: Error | null
}

export interface AuthContextType {
	user: string | null
	signin: (newUser: string, callback: () => void) => void
	signout: (callback: () => void) => void
}

export interface AuthProviderProps {
	children: ReactNode
}
