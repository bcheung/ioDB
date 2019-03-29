import React from 'react';
import ReactDOM from 'react-dom';
import IndustryInstances from './IndustryInstances';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IndustryInstances />, div);
    ReactDOM.unmountComponentAtNode(div);
});
