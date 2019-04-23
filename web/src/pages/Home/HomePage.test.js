import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const home = shallow(
        <Router>
            <HomePage />
        </Router>
    );
    ReactDOM.render(home, div);
    ReactDOM.unmountComponentAtNode(div);
});
