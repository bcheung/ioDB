import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button, ButtonGroup } from 'reactstrap';

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

        const filterValue = checkNull({ operator: newOperator, value });

        onChange(id, filterValue);
    };

    handleInputChange = event => {
        const { value } = event.target;
        const newValue = value === '' ? '' : parseFloat(value);
        const { id, onChange } = this.props;
        const { operator } = this.state;
        this.setState({ value: newValue });

        const filterValue = checkNull({ operator, value: newValue });

        onChange(id, filterValue);
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

// Prop types validation
AdvancedSearchFilter.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export { AdvancedSearchFilter };
