import React, { Component } from 'react';
// import './Page.css';
import { button } from '@coreui/react';

class Page extends Component {
    render() {
        return (
            <div className="Page">
                <header className="Page-header" />
                <button type="button" className="btn btn-pill btn-primary">
                    Button
                </button>
            </div>
        );
    }
}

export default Page;
