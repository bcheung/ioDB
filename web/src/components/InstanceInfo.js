import React from 'react';
import { Row, Jumbotron, Col } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { formatNum, getModelLabelSingular, getMajorModel, isMajorModel } from '../constants';

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
                        {getModelLabelSingular[getMajorModel[tablename]]}: {data[getMajorModel[tablename]].title}
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
    idLabel: PropTypes.string,
    tablename: PropTypes.string
};

export { InstanceInfo };
