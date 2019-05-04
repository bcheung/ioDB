import React from 'react';
import { Row, Jumbotron, Col } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { formatNum } from '../constants';

const InstanceInfo = ({ title, idLabel, id, description, totalEmployment, totalPopulation }) => (
    <Jumbotron>
        <h1 className="display-4">{title}</h1>
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            {idLabel}: {id}
        </Row>
        <br />
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <Col>Total Employment: {formatNum(totalEmployment)}</Col>
            {totalPopulation ? <Col>Total Population: {formatNum(totalPopulation)}</Col> : null}
        </Row>
        {description ? (
            <div>
                <hr className="my-2" />
                <p className="lead">Description: {description}</p>
            </div>
        ) : null}
    </Jumbotron>
);

InstanceInfo.propTypes = {
    title: PropTypes.string,
    idLabel: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
    totalEmployment: PropTypes.number,
    totalPopulation: PropTypes.number
};

export { InstanceInfo };
