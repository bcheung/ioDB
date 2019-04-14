import React, { Component } from 'react';
import { Row, Container, Col } from 'reactstrap';

const FilterColumnComponent = ({ filter, onChange }) => (
    <Container>
        <Row>
            <select
                onChange={event => {
                    const val = {
                        option: event.target.value,
                        value: filter ? filter.value.value : 0
                    };
                    return onChange(val);
                }}
                style={{ width: '100%' }}
                value={filter ? filter.value.option : 'gte'}
            >
                <option value="gte">GreaterEqual</option>
                <option value="e">Equal</option>
                <option value="lte">Less Equal </option>
            </select>
        </Row>
        <Row>
            <input
                value={filter ? filter.value.value : 0}
                onChange={event => {
                    const val = {
                        option: filter ? filter.value.option : 'gte',
                        value: Number(event.target.value)
                    };
                    return onChange(val);
                }}
            />
        </Row>
    </Container>
);

const styles = {
    divStyle: {}
};

export { FilterColumnComponent };
