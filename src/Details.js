import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Details extends Component {
	// default state of component
	// use babel parser to fix error
	state = { loading: true };

	async componentDidMount() {
		//data fetch
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
		);
		const json = await res.json();
		// this.setState(
		// 	Object.assign(
		// 		{
		// 			loading: false,
		// 		},
		// 		json.pets[0]
		// 	)
		// );

		// verbose, know exactly what to expect from API
		this.setState({
			loading: false,
			name: json.pets[0].name,
			breed: json.pets[0].breed,
			animal: json.pets[0].animal,
			city: json.pets[0].city,
			state: json.pets[0].state,
			description: json.pets[0].description,
		});
	}

	render() {
		if (this.state.loading) {
			return <h2>Loading</h2>;
		}
		// deconstruct
		const { animal, breed, city, state, description, name } = this.state;

		return (
			<div className='details'>
				<div>
					<h1>{name}</h1>
					<h2>
						{animal} - {breed} - {city}, {state}
					</h2>
					<button>Adopt {name}</button>
					<p>{description}</p>
				</div>
			</div>
		);
	}
}
export default withRouter(Details);
