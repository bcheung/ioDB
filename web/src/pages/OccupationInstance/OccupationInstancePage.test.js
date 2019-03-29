import React from 'react';
import ReactDOM from 'react-dom';
import OccupationInstancePage from './OccupationInstancePage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OccupationInstancePage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
