import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [animal, setAnimal] = useState('');
	const [location, setLocation] = useState('');
	const [breed, setBreed] = useState('');
	const [pets, setPets] = useState([]);
	const [breeds] = useBreedList(animal);

	// componentDidMount? - only used in class components
	// use useEffect here in functional components
	useEffect(() => {
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		);
		const json = await res.json();
		console.log('here', json);
		setPets(json.pets);
	}

	return (
		<div className='search-params'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor='location'>
					Location
					<input
						id='location'
						onChange={(event) => setLocation(event.target.value)}
						value={location}
						placeholder='Location'
					/>
				</label>
				<label htmlFor='animal'>
					Animal
					<select
						id='animal'
						value={animal}
						onChange={(event) => setAnimal(event.target.value)}
						onBlur={(event) => setAnimal(event.target.value)}
					>
						<option></option>
						{ANIMALS.map((animal) => (
							<option value={animal} key={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>

				<label htmlFor='breed'>
					Breed
					<select
						id='breed'
						value={breed}
						onChange={(event) => setBreed(event.target.value)}
						onBlur={(event) => setBreed(event.target.value)}
					>
						<option></option>
						{breeds.map((breed) => (
							<option value={breed} key={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
