import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './index.css';
// import App from './pages/App/App';
import HomePage from './pages/Home/HomePage'
import OccupationPage from './pages/OccupationMain/OccupationPage';
import ChemicalEngineers from './pages/ChemicalEngineers/ChemicalEngineers';
import DentistsGen from './pages/DentistsGen/DentistsGen';
import SoftwareDevSystems from './pages/SoftwareDevSystems/SoftwareDevSystems';
import LocationPage from './pages/LocationMain/LocationPage';

const routing = (
  <Router>
    <div>
		<Route path="/" component={HomePage} />
			{/* <Route path="/industry" component={IndustryPage} />
			<Route path="/industry/Austin" component={ChemicalEngineers} />
      <Route path="/industry/SanJose" component={DentistsGen} />
			<Route path="/industry/NewYork" component={SoftwareDevSystems} /> */}

      <Route path="/occupation" component={OccupationPage} />
      <Route path="/occupation/ChemicalEngineers" component={ChemicalEngineers} />
      <Route path="/occupation/DentistsGen" component={DentistsGen} />
			<Route path="/occupation/SoftwareDevSystems" component={SoftwareDevSystems} />

			<Route path="/location" component={LocationPage} />
			<Route path="/location/Austin" component={ChemicalEngineers} />
      <Route path="/location/SanJose" component={DentistsGen} />
			
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

<<<<<<< HEAD
=======
ReactDOM.render(<Location1 />, document.getElementById('root'));
>>>>>>> e0ebf07ce58556cf3527b6afb41ccb5d0c3b0a7b

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
