import React, { Component } from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button, ButtonGroup } from 'reactstrap';
import { FilterColumnComponent } from './FilterColumnComponent';

class AdvancedSearchFilter extends Component {
    state = { option: 0 };

    handleOptionClick = buttonID => {
        const { filter, onChange } = this.props;
        const { option } = this.state;
        const newOption = option !== buttonID ? buttonID : 0;
        this.setState({ option: newOption });
        const val = {
            option: newOption,
            value: filter ? filter.value.value : ''
        };
        onChange(val);
    };

    render() {
        const { option } = this.state;
        const { columnLabel, columnId } = this.props;
        return (
            <Row>
                <Col md="2">
                    <h5>{columnLabel}</h5>
                </Col>
                <Col md="1.5">
                    {/* <FilterColumnComponent id={`operation-${columnId}`} /> */}
                    <ButtonGroup>
                        <Button onClick={() => this.handleOptionClick(1)} active={option === 1}>
                            ≥
                        </Button>
                        <Button onClick={() => this.handleOptionClick(2)} active={option === 2}>
                            =
                        </Button>
                        <Button onClick={() => this.handleOptionClick(3)} active={option === 3}>
                            ≤
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col md="3">
                    <InputGroup>
                        <Input
                            type="number"
                            name="filter-quantity"
                            id={`quantity-${columnId}`}
                            placeholder="Filter Quantity"
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary">X</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <br />
                </Col>
            </Row>
        );
    }
}
export { AdvancedSearchFilter };
