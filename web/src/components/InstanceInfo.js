import React from 'react';
import { Row, Jumbotron, Col, NavLink } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { formatNum, getModelLabelSingular, getMajorModel, isMajorModel, getModelRoutes } from '../constants';

function renderMajorLink(tablename, data) {
    const { id, title } = data;
    return <NavLink href={`#/${getModelRoutes[tablename]}/${tablename}/${id}`}>{title}</NavLink>;
}

const InstanceInfo = ({ idLabel, tablename, data }) => {
    const { title, id, description, total_employment } = data;
    const major = isMajorModel[tablename];

    return (
        <Jumbotron>
            <h1 className="display-4">{title}</h1>
            <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                {idLabel}: {id}
            </Row>
            <br />
            <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                <Col>Total Employment: {formatNum(total_employment)}</Col>
            </Row>
            {!major ? (
                <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                    <Col>
                        {getModelLabelSingular[getMajorModel[tablename]]}:
                        {renderMajorLink(getMajorModel[tablename], data[getMajorModel[tablename]])}
                    </Col>
                </Row>
            ) : null}
            {description ? (
                <div>
                    <hr className="my-2" />
                    <p className="lead">Description: {description}</p>
                </div>
            ) : null}
        </Jumbotron>
    );
};

// Prop types validation
InstanceInfo.propTypes = {
    idLabel: PropTypes.string.isRequired,
    tablename: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired
};

export { InstanceInfo };
