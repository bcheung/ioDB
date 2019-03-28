import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AboutPage from '../About/AboutPage';
import Austin from '../detail/Austin/Austin';
import CEManufacturing from '../detail/CEManufacturing/CEManufacturing';
import ChemicalEngineers from '../detail/ChemicalEngineers/ChemicalEngineers';
import Dentists from '../detail/Dentists/Dentists';
import DentistsGen from '../detail/DentistsGen/DentistsGen';
import NewYork from '../detail/NewYork/NewYork';
import Research from '../detail/Research/Research';
import SanJose from '../detail/SanJose/SanJose';
import SoftwareDevSystems from '../detail/SoftwareDevSystems/SoftwareDevSystems';
import HomePage from '../Home/HomePage';
import IndustryPage from '../main/IndustryMain/IndustryPage';
import LocationPage from '../main/LocationMain/LocationPage';
import OccupationPage from '../main/OccupationMain/OccupationPage';
import IndustryInstances from '../IndustryInstances/IndustryInstances';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="Links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/industry/IndustryInstances">Industry</Link>
                        <Link to="/occupation">Occupation</Link>
                        <Link to="/location">Location</Link>
                    </div>

                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />

                    <Route path="/industry" component={IndustryPage} />
                    <Route path="/industry/Dentists" component={Dentists} />
                    <Route path="/industry/CEManufacturing" component={CEManufacturing} />
                    <Route path="/industry/Research" component={Research} />
                    <Route path="/industry/IndustryInstances" component={IndustryInstances} />

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
