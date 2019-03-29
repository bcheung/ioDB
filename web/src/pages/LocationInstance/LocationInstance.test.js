import React from 'react';
import ReactDOM from 'react-dom';
import LocationInstance from './LocationInstance';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationInstance />, div);
    ReactDOM.unmountComponentAtNode(div);
});
