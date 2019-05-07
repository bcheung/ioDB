import React, { Component } from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    Col,
    UncontrolledButtonDropdown,
    UncontrolledCollapse,
    DropdownToggle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getSpecificModel, getModelLabelPlural, getModelRoutes } from '../constants';

function renderInstanceLinks(detailedModel, data) {
    const route = getModelRoutes[detailedModel];
    console.log('rendering instances', data);
    return data.map(instance => (
        <NavItem key={instance.id}>
            <NavLink href={`#/${route}/${detailedModel}/${instance.id}`}>{instance.title}</NavLink>
        </NavItem>
    ));
}

const SpecificInstanceList = ({ majorModel, data, label }) => {
    const detailedModel = getSpecificModel[majorModel];
    const specificModelName = getModelLabelPlural[detailedModel];
    return (
        <div>
            <Container>
                <UncontrolledButtonDropdown>
                    <DropdownToggle id="toggler" style={{ marginBottom: '1rem' }} caret>
                        {label}
                    </DropdownToggle>
                </UncontrolledButtonDropdown>
                <UncontrolledCollapse toggler="#toggler">
                    <Navbar color="light" light expand="md" className="sidebar-sticky">
                        <Nav className="align-items-md-center">
                            <Col>
                                <p>{specificModelName}:</p>
                                {renderInstanceLinks(detailedModel, data)}
                            </Col>
                        </Nav>
                    </Navbar>
                </UncontrolledCollapse>
            </Container>
        </div>
    );
};

// Prop types validation
SpecificInstanceList.propTypes = {
    majorModel: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    label: PropTypes.string
};

export { SpecificInstanceList };
