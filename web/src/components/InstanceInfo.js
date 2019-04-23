import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import { formatNum } from '../constants';

const InstanceInfo = ({ title, idLabel, id, description, totalEmployment, totalPopulation }) => {
    console.log();
    return (
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
};

const styles = {
    style: {}
};

export { InstanceInfo };
