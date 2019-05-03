import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Button, Container, Row, Col } from 'reactstrap';
import { modelOptions } from '../constants';
import { fetchListData, fetchInstanceData } from '../fetchAPI';

class ComparisonBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance_1: null,
        selectedInstance_2: null,
        selectedModel: this.props.selectedModel,
        data_1: null,
        data_2: null,
        isDataLoaded: false,
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
    }

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data });
        });
    };

    handleModelChange = selectedModel => {
        this.setState({ selectedModel, selectedInstance_1: null, selectedInstance_2: null });
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
        this.props.setSelectedModel(selectedModel);
    };

    handleInstance1Change = selectedInstance_1 => {
        this.setState({ selectedInstance_1 });
    };

    handleInstance2Change = selectedInstance_2 => {
        this.setState({ selectedInstance_2 });
    };

    onSearchRequest = async () => {
        const { selectedInstance_1, selectedInstance_2, selectedModel } = this.state;
        if (selectedInstance_1 !== null && selectedInstance_2 !== null) {
            const id_1 = selectedInstance_1.id;
            const id_2 = selectedInstance_2.id;
            const { tablename, route } = selectedModel;
            const data_1 = await fetchInstanceData(tablename, id_1);
            const data_2 = await fetchInstanceData(tablename, id_2);
            this.setState({
                data_1,
                data_2,
                isDataLoaded: true
            });
        }
    }

    render() {
        const { instanceOptions, selectedInstance_1, selectedInstance_2, selectedModel } = this.state;
        const { modelOptions } = this.props;
        return (
            <div>
                <Container style={styles.containerStyle}>
                    <Row>
                        <Col>
                            <Select
                                className="dropDown"
                                options={instanceOptions}
                                value={selectedInstance_1}
                                onChange={this.handleInstance1Change}
                                getOptionLabel={option => option.title}
                                getOptionValue={option => option.id}
                                placeholder={`Search ${selectedModel.title}`}
                            />
                        </Col>
                        <Col>
                            <Select
                                className="dropDown"
                                options={instanceOptions}
                                value={selectedInstance_2}
                                onChange={this.handleInstance2Change}
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
                        <Col md="1">
                            <Button color="primary" onClick={this.onSearchRequest}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
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

const RoutingComparisonBar = withRouter(ComparisonBar);
export { RoutingComparisonBar };