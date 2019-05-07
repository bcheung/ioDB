import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import {
    Button,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
    DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap';
import { fetchListData, fetchFilteredData } from '../fetchAPI';
import { AdvancedSearchFilter } from './AdvancedSearchFilter';
import { stats } from '../constants';
import { RoutingDataTable } from './RoutingDataTable';

const styles = {
    dropDown: {
        width: 150
    },
    containerStyle: {
        margin: 30
    }
};

class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: this.props.selectedModel,
        filters: Object.assign(
            {},
            ...stats.map(option => ({
                [option.value]: null
            }))
        ),
        filteredData: null
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        console.log(selectedModel);
        const { tablename } = selectedModel;
        this.fetchInstanceList(tablename);
    }

    handleInstanceChange = selectedInstance => {
        this.setState({ selectedInstance });
    };

    handleModelChange = selectedModel => {
        this.setState({ selectedModel, selectedInstance: null, filteredData: null });
        const { tablename } = selectedModel;
        const { setSelectedModel } = this.props;
        this.fetchInstanceList(tablename);
        setSelectedModel(selectedModel);
    };

    handleFilterChange = (id, filterValue) => {
        const { filters } = this.state;
        const newFilters = { ...filters, [id]: filterValue };
        this.setState({ filters: newFilters });
        console.log(newFilters);
    };

    onSearchRequest = () => {
        const { selectedInstance, selectedModel } = this.state;
        const { history } = this.props;
        if (selectedInstance !== null) {
            const { id } = selectedInstance;
            const { tablename, route } = selectedModel;
            history.push(`/${route}/${tablename}/${id}`);
        }
    };

    onAdvancedSearchRequest = async () => {
        const { selectedModel, filters } = this.state;
        const reqData = { tablename: selectedModel.tablename, ...filters };
        const data = await fetchFilteredData(reqData);
        console.log(data);

        this.setState({ filteredData: data });
    };

    // clearFilters = () => {
    //     this.setState({
    //         filters: Object.assign(
    //             {},
    //             ...stats.map(options => ({
    //                 [options.value]: null
    //             }))
    //         ),
    //         filteredData: null
    //     });
    // };

    fetchInstanceList(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    }

    render() {
        const { instanceOptions, selectedInstance, selectedModel, filteredData } = this.state;
        const { modelOptions } = this.props;
        console.log('modelOptions', modelOptions);
        return (
            <Container>
                <Container style={styles.containerStyle}>
                    <Row>
                        <Col md="3">
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
                        <Col md="0.5">
                            <Button color="primary" onClick={this.onSearchRequest}>
                                Go
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
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
                        <Row>
                            <Col>
                                <Button type="submit" color="primary" onClick={this.onAdvancedSearchRequest}>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                        {filteredData ? (
                            <RoutingDataTable
                                title={`${selectedModel.title}`}
                                data={filteredData}
                                instanceTitle={selectedModel.title}
                                primaryTable={selectedModel.tablename}
                                routingTable={selectedModel.tablename}
                            />
                        ) : null}
                        <br />
                        <hr />
                    </UncontrolledCollapse>
                </Container>
            </Container>
        );
    }
}

const RoutingSearchBar = withRouter(SearchBar);

// Prop types validation
SearchBar.propTypes = {
    setSelectedModel: PropTypes.func,
    selectedModel: PropTypes.objectOf(PropTypes.string),
    history: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func, PropTypes.objectOf(PropTypes.string)])
    ),
    modelOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export { RoutingSearchBar };
