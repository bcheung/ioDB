import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Industry-page.css';

class IndustryPage extends Component {
    render() {
        return (
            <div>
                <form className="Search-Area">
                    <input className="Location-Search" type="text" />
                    <input className="Location-Button" type="submit" />
                </form>
                <p className="Buttons">
                    <Link to="/industry/Dentists">Industry1</Link>
                    <Link to="/industry/CEManufacturing">Industry2</Link>
                    <Link to="/industry/Research">Industry3</Link>
                </p>
            </div>
        );
    }
}

export default IndustryPage;
