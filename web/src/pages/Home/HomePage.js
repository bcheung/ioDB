import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Home-page.css';

class HomePage extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Welcome to the Home page</h2>
                </Jumbotron>
            </Container>
        );
    }
}

export default HomePage;
