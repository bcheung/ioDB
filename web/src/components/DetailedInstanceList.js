import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { getDetailedModel, getInstanceNames, getModelRoutes } from '../constants';

function renderInstanceLinks(detailedModel, data) {
    const route = getModelRoutes[detailedModel];
    console.log('rendering instances', data);
    return data.map(instance => (
        <NavItem>
            <NavLink href={`#/${route}/${detailedModel}/${instance.id}`}>{instance.title}</NavLink>
        </NavItem>
    ));
}

const DetailedInstanceList = ({ majorModel, data }) => {
    const detailedModel = getDetailedModel[majorModel];
    const detailedInstanceName = getInstanceNames[detailedModel];
    return (
        <div style={styles.containerStyle}>
            <p>{detailedInstanceName}:</p>
            <Nav>{renderInstanceLinks(detailedModel, data)}</Nav>
        </div>
    );
};

const styles = {
    containerStyle: {}
};

export { DetailedInstanceList };
