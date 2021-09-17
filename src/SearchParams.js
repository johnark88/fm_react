import { useState, useEffect, useContext } from 'react'
import ThemeContext from './ThemeContext'
import useBreedList from './useBreedList'
import Results from './Results'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
	const [animal, setAnimal] = useState('')
	const [location, setLocation] = useState('')
	const [breed, setBreed] = useState('')
	const [pets, setPets] = useState([])
	const [breeds] = useBreedList(animal)
	const [theme, setTheme] = useContext(ThemeContext)

	// componentDidMount? - only used in class components
	// use useEffect here in functional components
	useEffect(() => {
		requestPets()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		)
		const json = await res.json()
		console.log('here', json)
		setPets(json.pets)
	}

	return (
		<div className='search-params'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					requestPets()
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
				<label htmlFor='theme'>
					Theme
					<select
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
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
