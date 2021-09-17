// Error boundaries ONLY work in class components!!
import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
	state = { hasError: false };

	// can pass e into function
	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// log to Sentry/TrackJS - somekind of error monitor
		console.error('ErrorBoundary caught error', error, info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<h2>
					This Listing encountered an error.
					<Link to='/'>Click Here to go home</Link>
				</h2>
			);
		}
		//
		return this.props.children;
	}
}

export default ErrorBoundary;
