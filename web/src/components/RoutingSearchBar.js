import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import './Home-page.css';
import Select from 'react-select';
import {
    Button,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import { fetchListData } from '../fetchAPI';
import { FilterColumnComponent } from './FilterColumnComponent';
import { AdvancedSearchFilter } from './AdvancedSearchFilter';

const filterOptions = ['Median Wage', 'Mean Wage', 'Total Employment'];

class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: this.props.selectedModel,
        filters: ['filter-0']
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        console.log(selectedModel);
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
    }

    handleInstanceChange = selectedInstance => {
        this.setState({ selectedInstance });
    };

    handleModelChange = selectedModel => {
        this.setState({ selectedModel, selectedInstance: null });
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
        this.props.setSelectedModel(selectedModel);
    };

    onSearchRequest = () => {
        const { selectedInstance, selectedModel } = this.state;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = selectedModel;
            this.props.history.push(`/${route}/${tablename}/${id}`);
        }
    };

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    }

    // appendFilter() {
    //     const newFilter = `filter-${this.state.filters.length}`;
    //     this.setState(prevState => ({
    //         filters: prevState.filters.concat([newFilter])
    //     }));
    // }

    render() {
        const { instanceOptions, selectedInstance, selectedModel } = this.state;
        const { modelOptions } = this.props;
        return (
            <Container>
                <Container style={styles.containerStyle}>
                    <Row>
                        <Col>
                            <Select
                                className="dropDown"
                                options={instanceOptions}
                                value={selectedInstance}
                                onChange={this.handleInstanceChange}
                                getOptionLabel={option => option.title}
                                getOptionValue={option => option.id}
                                placeholder={`Search ${selectedModel.title}`}
                            />
                        </Col>
                        <Col md="2">
                            <Select
                                className="dropDown"
                                options={modelOptions}
                                value={selectedModel}
                                onChange={this.handleModelChange}
                                isSearchable={false}
                                getOptionLabel={option => option.title}
                                getOptionValue={option => option.tablename}
                            />
                        </Col>
                        <Col md="0.5">
                            <Button color="primary" onClick={this.onSearchRequest}>
                                Go
                            </Button>
                        </Col>
                        <Col md="2">
                            <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                                Advanced Search
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Container style={styles.containerStyle}>
                    <UncontrolledCollapse toggler="#toggler">
                        <h4>Advanced Search Filters</h4>
                        <hr />
                        <AdvancedSearchFilter />
                        <Row>
                            <Col md="2">
                                <h5>Hourly Mean</h5>
                            </Col>
                            <Col md="1.5">
                                <FilterColumnComponent id="operation-0" />
                            </Col>
                            <Col md="3">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id="quantity-0"
                                        placeholder="Filter Quantity"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <h5>Hourly Median</h5>
                            </Col>
                            <Col md="1.5">
                                <FilterColumnComponent id="operation-0" />
                            </Col>
                            <Col md="3">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id="quantity-0"
                                        placeholder="Filter Quantity"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <h5>Annual Mean</h5>
                            </Col>
                            <Col md="1.5">
                                <FilterColumnComponent id="operation-0" />
                            </Col>
                            <Col md="3">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id="quantity-0"
                                        placeholder="Filter Quantity"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <h5>{this.props.filterName}</h5>
                            </Col>
                            <Col md="1.5">
                                <FilterColumnComponent id="operation-0" />
                            </Col>
                            <Col md="3">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id="quantity-0"
                                        placeholder="Filter Quantity"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <h5>Total Employment</h5>
                            </Col>
                            <Col md="1.5">
                                <FilterColumnComponent id="operation-0" />
                            </Col>
                            <Col md="3">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id="quantity-0"
                                        placeholder="Filter Quantity"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                            </Col>
                        </Row>

                        {/* {this.state.filters.map(filter => (
                            <Row>
                                <Col md="5">
                                    <Input type="select" name="select" id={`filter-${filter}`}>
                                        <option>Hourly Median</option>
                                        <option>Hourly Mean</option>
                                        <option>Annual Median</option>
                                        <option>Annual Mean</option>
                                        <option>Total Employment</option>
                                    </Input>
                                </Col>
                                <Col md="1.5">
                                    <FilterColumnComponent id={`operation-${filter}`} />
                                </Col>
                                <Col md="3">
                                    <Input
                                        type="number"
                                        name="filter-quantity"
                                        id={`quantity-${filter}`}
                                        placeholder="Filter Quantity"
                                    />
                                    <br />
                                </Col>
                            </Row>
                        ))} */}

                        <br />
                        <Row>
                            <Col md="1.5">
                                <Button color="danger">Clear All</Button>
                            </Col>
                            <Col md="1">
                                <Button color="primary">Search</Button>
                            </Col>
                        </Row>
                        <hr />
                    </UncontrolledCollapse>
                </Container>
            </Container>
        );
    }
}

const styles = {
    dropDown: {
        width: 150
    },
    containerStyle: {
        margin: 30
    }
};

const RoutingSearchBar = withRouter(SearchBar);
export { RoutingSearchBar };
