import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';

const InstanceInfo = ({ title, idLabel, id, description }) => {
    console.log();
    return (
        <Jumbotron>
            <h1 className="display-4">{title}</h1>
            <p>
                {idLabel}: {id}
            </p>
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
