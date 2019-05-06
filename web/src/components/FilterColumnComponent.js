import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Container, Col, ButtonGroup, Button, Input } from 'reactstrap';

class FilterColumnComponent extends Component {
    state = { option: 0 };

    handleOptionClick = buttonID => {
        const { filter, onChange } = this.props;
        console.log('onChange prop', onChange);
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
        const { filter, onChange } = this.props;

        return (
            <Container>
                <Row>
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
                </Row>
                {option !== 0 ? (
                    <Row>
                        <Input
                            type="number"
                            value={filter ? filter.value.value : ''}
                            onChange={event => {
                                const val = {
                                    option: filter ? filter.value.option : 0,
                                    value: event.target.value === '' ? '' : Number(event.target.value)
                                };
                                onChange(val);
                            }}
                        />
                    </Row>
                ) : null}
            </Container>
        );
    }
}

// Prop types validation
FilterColumnComponent.propTypes = {
    filter: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.shape({
            option: PropTypes.number,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    }),
    onChange: PropTypes.func
};

export { FilterColumnComponent };
