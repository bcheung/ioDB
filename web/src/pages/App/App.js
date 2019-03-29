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
import ExampleInstance from '../ExampleInstance';

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
                            <NavItem>
                                <NavLink href="/example/industries_3d/113000">Location</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>

                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />

                    <Route path="/example/:tablename/:id" component={ExampleInstance} />

                    <Route path="/industry/:tablename/:id" component={IndustryPage} />

                    <Route path="/occupation/:tablename/:id" component={OccupationPage} />

                    <Route path="/location/:tablename/:id" component={LocationInstance} />
                </div>
            </Router>
        );
    }
}

export default App;
