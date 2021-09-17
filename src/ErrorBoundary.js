// Error boundaries ONLY work in class components!!
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

class ErrorBoundary extends Component {
	state = { hasError: false, redirect: false }

	// can pass e into function
	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		// log to Sentry/TrackJS - somekind of error monitor
		console.error('ErrorBoundary caught error', error, info)

		if (this.state.hasError) {
			setTimeout(() => {
				this.setState({ redirect: true })
			}, 5000)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/' />
		}
		if (this.state.hasError) {
			return <h2>This Listing encountered an error. Please Wait</h2>
		}
		//
		return this.props.children
	}
}

export default ErrorBoundary
