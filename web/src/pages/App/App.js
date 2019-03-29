import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
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
import LocationInstance from '../LocationInstance/LocationInstance';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <Router>
                <div>
<<<<<<< HEAD
                    <div className="Links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/industry">Industry</Link>
                        <Link to="/occupation">Occupation</Link>
                        <Link to="/location">Location</Link>
                        <Link to="/location/location-instance">Location Instance</Link>
                    </div>
=======
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">ioDB</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/about">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/industry">Industry</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/occupation">Occupation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/location">Location</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
>>>>>>> searchbar

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
                    <Route path="/location/location-instance" component={LocationInstance} />
                </div>
            </Router>
        );
    }
}

export default App;
