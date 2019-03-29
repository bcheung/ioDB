import React from 'react';
import ReactDOM from 'react-dom';
import IndustryInstancePage from './IndustryInstancePage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IndustryInstancePage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
