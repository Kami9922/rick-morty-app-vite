import { Props, State } from '../../types/types'
import React, { Component } from 'react'

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
		}
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		const { hasError, error } = this.state
		const { fallback, children } = this.props

		if (hasError) {
			if (fallback) {
				return fallback
			}

			return (
				<div style={{ padding: '2rem', color: 'red' }}>
					<h2>Что-то пошло не так</h2>
					<pre>{error?.message}</pre>
				</div>
			)
		}

		return children
	}
}
