import React, { Component } from 'react';
import { NavbarToggler, Collapse, NavbarBrand, Nav, Navbar, NavItem, NavLink, Col } from 'reactstrap';
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

const DetailedInstanceList = ({ majorModel, data }) => {
    const detailedModel = getDetailedModel[majorModel];
    const detailedInstanceName = getInstanceNames[detailedModel];
    return (
        <div>
            <Navbar color="light" light expand="md">
                <Nav className="align-items-md-center">
                    <Col>
                        <p>{detailedInstanceName}:</p>
                        {renderInstanceLinks(detailedModel, data)}
                    </Col>
                </Nav>
            </Navbar>
        </div>
    );
};

const styles = {
    containerStyle: {}
};

export { DetailedInstanceList };
