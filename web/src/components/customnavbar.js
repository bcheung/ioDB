import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class customnavbar extends Component {
    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">About</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    {/* Toggle resizes on smaller device */}
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="pages/About/HomePage">
                            Home
                        </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/about" to="pages/About/AboutPage">
                            About
                        </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/" to="/">
                            Home
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
