import React, { Component } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import AboutPage from '../About/AboutPage';
import IndustryInstancePage from '../IndustryInstance/IndustryInstancePage';
import OccupationInstancePage from '../OccupationInstance/OccupationInstancePage';
import LocationInstancePage from '../LocationInstance/LocationInstancePage';
import './App.css';
import { RoutingSearchBar, TopTenWidget } from '../../components';
import { modelOptions } from '../../constants';
import TestPage from '../TestPage';

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
                                <NavLink href="#/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/location">Explore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/about">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/test">Test</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>

                    <RoutingSearchBar
                        modelOptions={modelOptions}
                        selectedModel={selectedModel}
                        setSelectedModel={this.setSelectedModel}
                    />

                    <Switch>
                        <Route exact path="/" render={props => <HomePage tablename={selectedModel.tablename} />} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/test" component={TestPage} />

                        <Route path="/industry/:tablename/:id" component={IndustryInstancePage} />

                        <Route path="/occupation/:tablename/:id" component={OccupationInstancePage} />
                        <Route path="/location/:tablename/:id" component={LocationInstancePage} />
                        <Route path="/location" component={LocationInstancePage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
