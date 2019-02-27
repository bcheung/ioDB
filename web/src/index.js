import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Location1 from './pages/Location1/location1';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Location1 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
