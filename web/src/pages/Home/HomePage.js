import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { TopTenWidget } from '../../components/TopTenWidget';

class HomePage extends Component {
    render() {
        return (
            <Container>
                <TopTenWidget tablename1={this.props.tablename} />
            </Container>
        );
    }
}

export default HomePage;
