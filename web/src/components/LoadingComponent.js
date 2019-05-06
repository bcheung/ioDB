import React from 'react';
import { Spinner, Container } from 'reactstrap';

const LoadingComponent = () => (
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

export { LoadingComponent };
