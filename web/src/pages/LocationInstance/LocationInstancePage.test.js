import React from 'react';
import ReactDOM from 'react-dom';
import LocationInstancePage from './LocationInstancePage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationInstancePage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
