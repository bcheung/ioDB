import React, { Component } from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button, ButtonGroup } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { FilterColumnComponent } from './FilterColumnComponent';

function checkNull(filterValue) {
    if (filterValue.operator === '' && filterValue.value === '') {
        return null;
    }
    return filterValue;
}

class AdvancedSearchFilter extends Component {
    state = { operator: '', value: '' };

    handleOptionClick = buttonID => {
        const { id, onChange } = this.props;
        const { operator, value } = this.state;
        const newOperator = operator !== buttonID ? buttonID : '';
        this.setState({ operator: newOperator });
        onChange(id, {
            operator: newOperator,
            value
        });
    };

    handleInputChange = event => {
        const { value } = event.target;
        const newValue = value === '' ? '' : parseFloat(value);
        const { id, onChange } = this.props;
        const { operator } = this.state;
        this.setState({ value: newValue });
        const filterValue = {
            operator,
            value: newValue
        };

        onChange(id, checkNull(filterValue));
    };

    clearFilter = () => {
        const { id, onChange } = this.props;
        const filterValue = { operator: '', value: '' };
        this.setState(filterValue);
        onChange(id, checkNull(filterValue));
    };

    render() {
        const { operator, value } = this.state;
        const { label, id } = this.props;
        return (
            <Row>
                <Col md="2">
                    <h5>{label}</h5>
                </Col>
                <Col md="1.5">
                    <ButtonGroup>
                        <Button onClick={() => this.handleOptionClick('gte')} active={operator === 'gte'}>
                            ≥
                        </Button>
                        <Button onClick={() => this.handleOptionClick('e')} active={operator === 'e'}>
                            =
                        </Button>
                        <Button onClick={() => this.handleOptionClick('lte')} active={operator === 'lte'}>
                            ≤
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col md="3">
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Filter Quantity"
                            value={value}
                            onChange={this.handleInputChange}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" onClick={this.clearFilter}>
                                x
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <br />
                </Col>
            </Row>
        );
    }
}

// prop types validation
AdvancedSearchFilter.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
};

export { AdvancedSearchFilter };
