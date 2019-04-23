import React, { Component } from 'react';
import {
    Container,
    Button,
    NavbarToggler,
    Collapse,
    NavbarBrand,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    Col
} from 'reactstrap';
import { getDetailedModel, getInstanceNames, getModelRoutes } from '../constants';

function renderInstanceLinks(detailedModel, data) {
    const route = getModelRoutes[detailedModel];
    console.log('rendering instances', data);
    return data.map(instance => (
        <NavItem key={instance.id}>
            <NavLink href={`#/${route}/${detailedModel}/${instance.id}`}>{instance.title}</NavLink>
        </NavItem>
    ));
}

const DetailedInstanceList = ({ majorModel, data, collapse, label, onClick }) => {
    const detailedModel = getDetailedModel[majorModel];
    const detailedInstanceName = getInstanceNames[detailedModel];
    return (
        <div>
            <Button color="primary" onClick={onClick} style={{ marginBottom: '1rem' }}>
                {label}
            </Button>
            <Container>
                <br />
                <Nav expand="md" sticky="side" className="shadow-sm py-0">
                    <div className="sidebar-sticky">
                        <Collapse isOpen={collapse}>
                            <Navbar color="light" light expand="md">
                                <Nav className="align-items-md-center">
                                    <Col>
                                        <p>{detailedInstanceName}:</p>
                                        {renderInstanceLinks(detailedModel, data)}
                                    </Col>
                                </Nav>
                            </Navbar>
                        </Collapse>
                    </div>
                </Nav>
            </Container>
        </div>
    );
};

const styles = {
    containerStyle: {}
};

export { DetailedInstanceList };
