import React, { Component } from 'react';
import { Row, Conta

class FilterColumnComponent extends Component {
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

export { FilterColumnComponent };
