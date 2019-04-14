import React, { Component } from 'react';
import { Spinner, Container, Col } from 'reactstrap';

const LoadingComponent = props => (
    <Container
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <h3>Loading</h3>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
    </Container>
);

const styles = {
    divStyle: {}
};

export { LoadingComponent };
