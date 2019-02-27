import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
// import LocationPage from './pages/LocationMain/LocationPage'
// import HomePage from './pages/Home/HomePage'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Location1 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
