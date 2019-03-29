import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import AboutPage from '../About/AboutPage';
import IndustryInstancePage from '../IndustryInstance/IndustryInstancePage';
import OccupationInstancePage from '../OccupationInstance/OccupationInstancePage';
import LocationInstance from '../LocationInstance/LocationInstance';
import ExampleInstance from '../ExampleInstance';
import './App.css';
import { SearchBar } from '../../components/SearchBar';

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
                                <NavLink href="#/about">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/industry">Industry</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/occupation">Occupation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/location">Location</NavLink>
                            </NavItem>
<<<<<<< HEAD
                            <NavItem>
                                <NavLink href="#/example/industries_3d/113000">Example</NavLink>
=======
                            <NavItem>48
                                <NavLink href="/example/industries_3d/113000">Example</NavLink>
>>>>>>> 3d3518f5580d7e6f336fafc3dcf154956a347a07
                            </NavItem>
                        </Nav>
                    </Navbar>

                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />

                    <Route path="/example/:tablename/:id" component={ExampleInstance} />

<<<<<<< HEAD
                    <Route path="/industry/:tablename/:id" component={IndustryInstancePage} />
=======
                    <Route path="/industry/:tablename/:id" component={IndustryInstances} />
>>>>>>> 3d3518f5580d7e6f336fafc3dcf154956a347a07

                    <Route path="/occupation/:tablename/:id" component={OccupationInstancePage} />
                    
                    <Route path="/location/:tablename/:id" component={LocationInstance} />

                    {/* <Route path="/location" component={LocationInstance} /> */}
                </div>
            </Router>
        );
    }
}

export default App;
