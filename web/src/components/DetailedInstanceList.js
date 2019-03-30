import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Col } from 'reactstrap';
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
        <Col className="col-md-3 sidebar">
            <Nav>
                <p>{detailedInstanceName}:</p>
                {renderInstanceLinks(detailedModel, data)}
            </Nav>
        </Col>
    );
};

const styles = {
    containerStyle: {}
};

export { DetailedInstanceList };
