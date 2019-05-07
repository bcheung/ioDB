import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import AboutPage from '../About/AboutPage';
import IndustryInstancePage from '../IndustryInstance/IndustryInstancePage';
import OccupationInstancePage from '../OccupationInstance/OccupationInstancePage';
import LocationInstancePage from '../LocationInstance/LocationInstancePage';
import ComparisonPage from '../Comparison/ComparisonPage';
// import TestPage from '../TestPage';
import { RoutingSearchBar } from '../../components';
import { modelOptions } from '../../constants';
import './App.css';

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
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { selectedModel } = this.state;
        console.log('App render', selectedModel);
        return (
            <Router>
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="#/">ioDB</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/location">Explore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/comparison">Compare</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/about">About Us</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="#/test">Test</NavLink>
                            </NavItem> */}
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
                        {/* <Route path="/test" component={TestPage} /> */}

                        <Route path="/industry/:tablename/:id" component={IndustryInstancePage} />

                        <Route path="/occupation/:tablename/:id" component={OccupationInstancePage} />
                        <Route path="/location/:tablename/:id" component={LocationInstancePage} />
                        <Route path="/location" component={LocationInstancePage} />
                        <Route path="/comparison" component={ComparisonPage} />
                    </Switch>
                    <Row style={{ height: '200px' }} />
                </div>
            </Router>
        );
    }
}

export default App;
