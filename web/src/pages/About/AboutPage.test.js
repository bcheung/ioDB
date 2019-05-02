import React from 'react';
import ReactDOM from 'react-dom';
import AboutPage from './AboutPage';

/** Test:
 *
 *  Tests if Page:
 * 
 * 1. Renders Given tests
 
 */

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AboutPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
