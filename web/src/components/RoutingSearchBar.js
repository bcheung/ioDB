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
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupButtonDropdown,
    InputGroupAddon,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import { fetchListData } from '../fetchAPI';
import { FilterColumnComponent } from './FilterColumnComponent';

class SearchBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance: null,
        selectedModel: this.props.selectedModel
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
                        <hr />
                        <Row form>
                            <Col md="5">
                                <p>Filter</p>
                            </Col>
                            <Col md="1.5">
                                <FormGroup>
                                    <p>Operation</p>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <p>Filter Quantity</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
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
                            <Col md="1.5">
                                <FilterColumnComponent />
                            </Col>
                            <Col md="3">
                                <Input type="number" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="1.5">
                                <Button>Add Filter</Button>
                            </Col>
                            <Col md="1">
                                <Button>Search</Button>
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
