import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';

const App = () => {
	return React.createElement('div', {}, [
		React.createElement('h1', { id: 'branding' }, 'AdoptMe'),
		React.createElement(Pet, { name: 'Nova', animal: 'Dog', breed: 'Samoyed' }),
		React.createElement(Pet, {
			name: 'Finn',
			animal: 'Cat',
			breed: 'orange cat',
		}),
		React.createElement(Pet, {
			name: 'Julip',
			animal: 'Cat',
			breed: 'black cattttttt',
		}),
	]);
};

// render the above in the div declared in HMTL
ReactDOM.render(React.createElement(App), document.getElementById('root'));
