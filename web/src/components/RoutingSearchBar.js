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
    InputGroupText,
    Form,
    FormGroup,
    DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap';
import axios from 'axios';
import { fetchListData } from '../fetchAPI';
import { AdvancedSearchFilter } from './AdvancedSearchFilter';
import { stats } from '../constants';

const filterOptions = ['Median Wage', 'Mean Wage', 'Total Employment'];

class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: this.props.selectedModel,
        filters: Object.assign(
            {},
            ...stats.map(options => ({
                [options.value]: null
            }))
        )
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

    handleFilterChange = (id, filterValue) => {
        const { filters } = this.state;
        const newFilters = { ...filters, [id]: filterValue };
        this.setState({ filters: newFilters });
        console.log(newFilters);
    };

    onSearchRequest = () => {
        const { selectedInstance, selectedModel } = this.state;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = selectedModel;
            this.props.history.push(`/${route}/${tablename}/${id}`);
        }
    };

    onAdvancedSearchRequest = e => {
        const { selectedModel, filters } = this.state;
        const reqData = { tablename: selectedModel.tablename, ...filters };
        console.log('onAdvancedSearchRequest', reqData);
        axios
            .post('http://www.iodb.info/api/filter', reqData)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
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
                            <UncontrolledButtonDropdown>
                                <DropdownToggle id="toggler" style={{ marginBottom: '1rem' }} caret>
                                    Advanced Search
                                </DropdownToggle>
                            </UncontrolledButtonDropdown>
                        </Col>
                    </Row>
                </Container>
                <Container style={styles.containerStyle}>
                    <UncontrolledCollapse toggler="#toggler">
                        <h4>Advanced Search Filters</h4>
                        <hr />
                        {stats.map(option => (
                            <AdvancedSearchFilter
                                key={option.value}
                                label={option.label}
                                id={option.value}
                                onChange={this.handleFilterChange}
                            />
                        ))}
                        <Button type="submit" color="primary" onClick={this.onAdvancedSearchRequest}>
                            Submit
                        </Button>
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
