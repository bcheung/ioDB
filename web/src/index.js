import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './index.css';
// import App from './pages/App/App';
import HomePage from './pages/Home/HomePage'
import AboutPage from './pages/About/AboutPage';
import IndustryPage from './pages/IndustryMain/IndustryPage';
import OccupationPage from './pages/OccupationMain/OccupationPage';
import ChemicalEngineers from './pages/ChemicalEngineers/ChemicalEngineers';
import DentistsGen from './pages/DentistsGen/DentistsGen';
import SoftwareDevSystems from './pages/SoftwareDevSystems/SoftwareDevSystems';
import LocationPage from './pages/LocationMain/LocationPage';
import Austin from './pages/Austin/Austin';
import SanJose from './pages/SanJose/SanJose';
import NewYork from './pages/NewYork/NewYork';

const routing = (
  <Router>
    <div>
			<Route path="/" component={HomePage} />
			<Route path="/about" component={AboutPage} />
			
			<Route path="/industry" component={IndustryPage} />
			{/* <Route path="/industry/Dentists" component={Dentists} />
      <Route path="/industry/CEManufacturing" component={CEManufacturing} />
			<Route path="/industry/Research" component={Research} /> */}

      <Route path="/occupation" component={OccupationPage} />
      <Route path="/occupation/ChemicalEngineers" component={ChemicalEngineers} />
      <Route path="/occupation/DentistsGen" component={DentistsGen} />
			<Route path="/occupation/SoftwareDevSystems" component={SoftwareDevSystems} />

			<Route path="/location" component={LocationPage} />
			<Route path="/location/Austin" component={Austin} />
      <Route path="/location/SanJose" component={SanJose} />
      <Route path="/location/SanJose" component={NewYork} />
			
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
