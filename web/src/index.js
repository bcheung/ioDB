import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './pages/App/App';
import ChemicalEngineers from './pages/ChemicalEngineers/ChemicalEngineers';
import DentistsGen from './pages/DentistsGen/DentistsGen';
import SoftwareDevSystems from './pages/SoftwareDevSystems/SoftwareDevSystems';

const routing = (
  <Router>
    <div>
      {/* <Route path="/home" component={App} /> */}
      {/* <Route path="/industry" component={Users} /> */}
      <Route path="/occupation/ChemicalEngineers" component={ChemicalEngineers} />
      <Route path="/occupation/DentistsGen" component={DentistsGen} />
			<Route path="/occupation/SoftwareDevSystems" component={SoftwareDevSystems} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
