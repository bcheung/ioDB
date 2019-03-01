import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import logo from "../../logo.svg";
import "./App.css";

import HomePage from '../Home/HomePage'
import AboutPage from '../About/AboutPage';

import IndustryPage from '../IndustryMain/IndustryPage';
import Dentists from '../Dentists/Dentists';
import CEManufacturing from '../CEManufacturing/CEManufacturing';
import Research from '../Research/Research';

import OccupationPage from '../OccupationMain/OccupationPage';
import ChemicalEngineers from '../ChemicalEngineers/ChemicalEngineers';
import DentistsGen from '../DentistsGen/DentistsGen';
import SoftwareDevSystems from '../SoftwareDevSystems/SoftwareDevSystems';

import LocationPage from '../LocationMain/LocationPage';
import Austin from '../Austin/Austin';
import SanJose from '../SanJose/SanJose';
import NewYork from '../NewYork/NewYork';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />

          <Route path="/industry" component={IndustryPage} />
          <Route path="/industry/Dentists" component={Dentists} />
          <Route path="/industry/CEManufacturing" component={CEManufacturing} />
          <Route path="/industry/Research" component={Research} />

          <Route path="/occupation" component={OccupationPage} />
          <Route path="/occupation/ChemicalEngineers" component={ChemicalEngineers} />
          <Route path="/occupation/DentistsGen" component={DentistsGen} />
          <Route path="/occupation/SoftwareDevSystems" component={SoftwareDevSystems} />

          <Route path="/location" component={LocationPage} />
          <Route path="/location/Austin" component={Austin} />
          <Route path="/location/SanJose" component={SanJose} />
          <Route path="/location/NewYork" component={NewYork} />
        </div>
      </Router>
    );
  }
}

export default App;
