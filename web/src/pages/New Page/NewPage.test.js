import React from 'react';
import ReactDOM from 'react-dom';
import NewPage from './NewPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
