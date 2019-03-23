import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Industry-page.css';

class IndustryPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Jumbotron>
                        <h2>Welcome to the Industry page</h2>
                    </Jumbotron>
                </Container>

                {/* Search Bar */}
                <form className="Search-Area">
                    <input className="Location-Search" type="text" />
                    <input className="Location-Button" type="submit" />
                </form>

                <p className="Buttons">
                    <Link to="/industry/Dentists">Industry1</Link>
                    <Link to="/industry/CEManufacturing">Industry2</Link>
                    <Link to="/industry/Research">Industry3</Link>
                    <Link to="/IndustryInstances/IndustryInstances">IndustryInstances</Link>
                    {/* For some reason this doesn't link... */}
                </p>
            </div>
        );
    }
}

export default IndustryPage;
