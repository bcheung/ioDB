import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './IndustryInstances.css';

class IndustryInstances extends Component {
    render() {
        return (
            // Industry + Name(from backend)
            <form className="Search-Area">
                <input className="Location-Search" type="text" />
                <input className="Location-Button" type="submit" />
            </form>

            // Top Occupations for (Industry)

            // Includes Graphs, Tables, and Statistics

            // Occupations for Industry
        );
    }
}

export default IndustryInstances;
