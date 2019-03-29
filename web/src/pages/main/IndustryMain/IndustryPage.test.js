import React from 'react';
import ReactDOM from 'react-dom';
import IndustryPage from './IndustryPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IndustryPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
