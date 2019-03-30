import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import AboutPage from '../About/AboutPage';
import IndustryInstancePage from '../IndustryInstance/IndustryInstancePage';
import OccupationInstancePage from '../OccupationInstance/OccupationInstancePage';
import LocationInstance from '../LocationInstance/LocationInstance';
import ExampleInstance from '../ExampleInstance';
import './App.css';
import { RoutingSearchBar, TopTenWidget } from '../../components';

const modelOptions = [
    { title: 'Industries', tablename: 'industries_3d', route: 'industry' },
    { title: 'States', tablename: 'states', route: 'location' },
    { title: 'Occupations', tablename: 'occupations_major', route: 'occupation' }
];

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            selectedModel: modelOptions[0]
        };
    }

    setSelectedModel = selectedModel => {
        this.setState({ selectedModel });
    };

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { selectedModel } = this.state;
        console.log('App render', selectedModel);
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
                            <NavItem>
                                <NavLink href="#/example/industries_3d/113000">Example</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <RoutingSearchBar
                        modelOptions={modelOptions}
                        selectedModel={selectedModel}
                        setSelectedModel={this.setSelectedModel}
                    />

                    {/* <TopTenWidget tablename1={selectedModel.tablename} /> */}

                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />

                    <Route path="/example/:tablename/:id" component={ExampleInstance} />

                    <Route path="/industry/:tablename/:id" component={IndustryInstancePage} />

                    <Route path="/occupation/:tablename/:id" component={OccupationInstancePage} />
                    <Switch>
                        <Route path="/location/:tablename/:id" component={LocationInstance} />
                        <Route path="/location" component={LocationInstance} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
