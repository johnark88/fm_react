import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [animal, setAnimal] = useState('');
	const [location, setLocation] = useState('');
	const [breed, setBreed] = useState('');
	const [pets, setPets] = useState([]);
	const [breeds] = useBreedList(animal);
	const [theme, setTheme] = useContext(ThemeContext);

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
		<div className='my-0 mx-auto w-11/12'>
			<form
				className='p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900'
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label className='search-label' htmlFor='location'>
					Location
					<input
						className='search-control'
						id='location'
						onChange={(event) => setLocation(event.target.value)}
						value={location}
						placeholder='Location'
					/>
				</label>
				<label className='search-label' htmlFor='animal'>
					Animal
					<select
						className='search-control'
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

				<label className='search-label' htmlFor='breed'>
					Breed
					<select
						className='search-control disabled:opacity-50'
						disabled={!breeds.length}
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
				<label className='search-label' htmlFor='theme'>
					Theme
					<select
						className='search-control'
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option value='darkblue'>DarkBlue</option>
						<option value='peru'>peru</option>
						<option value='cornflowerblue'>cornflowerblue</option>
						<option value='orange'>orange</option>
						<option value='mediumorchid'>mediumorchid</option>
					</select>
				</label>
				<button
					className='rounded px-6 py-2 text-white hover:opacity-50 border-none'
					style={{ backgroundColor: theme }}
				>
					Submit
				</button>
			</form>

			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
