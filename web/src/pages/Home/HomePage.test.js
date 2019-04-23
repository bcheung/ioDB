import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
<<<<<<< HEAD

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
=======
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
>>>>>>> develop
    ReactDOM.unmountComponentAtNode(div);
});
