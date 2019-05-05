import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Button, Container, Row, Col } from 'reactstrap';
import { fetchListData, fetchInstanceData, fetchJoinedInstanceData } from '../fetchAPI';
import ComparisonOccupation from './ComparisonOccupation';
import ComparisonLocation from './ComparisonLocation';
import ComparisonIndustry from './ComparisonIndustry';

class ComparisonBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance_1: null,
        selectedInstance_2: null,
        selectedModel: this.props.selectedModel,
        instance_1: null,
        instance_2: null,
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
        this.setState({ 
            selectedModel, 
            selectedInstance_1: null, 
            selectedInstance_2: null,
            isDataLoaded: false,
        });
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
            var instance_1 = null;
            var instance_2 = null;
            if(tablename === "occupations_major") {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1),
                    locationData: await fetchJoinedInstanceData(tablename, 'states', id_1),
                }
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2),
                    locationData: await fetchJoinedInstanceData(tablename, 'states', id_2),
                }
            } else if (tablename === "states") {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1),
                }
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2),
                }
            } else if (tablename === "industries_3d") {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1),
                }
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2),
                }
            }
            this.setState({
                instance_1,
                instance_2,
                isDataLoaded: true
            });
        }
    }

    getComparison = () => {
        const { selectedInstance_1, selectedInstance_2, selectedModel, 
            instance_1, instance_2 } = this.state;
        switch(selectedModel.tablename) {
            case 'occupations_major':
                return (
                    <ComparisonOccupation 
                        instance_1={instance_1}
                        instance_2={instance_2}
                        selectedInstance_1={selectedInstance_1}
                        selectedInstance_2={selectedInstance_2}
                        selectedModel={selectedModel}
                    />
                );
            case 'industries_3d':
                return (
                    <ComparisonIndustry
                        instance_1={instance_1}
                        instance_2={instance_2}
                        selectedInstance_1={selectedInstance_1}
                        selectedInstance_2={selectedInstance_2}
                        selectedModel={selectedModel}
                    />
                );
            case 'states':
                return (
                    <ComparisonLocation
                        instance_1={instance_1}
                        instance_2={instance_2}
                        selectedInstance_1={selectedInstance_1}
                        selectedInstance_2={selectedInstance_2}
                        selectedModel={selectedModel}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        const { instanceOptions, selectedInstance_1, selectedInstance_2, selectedModel, 
            isDataLoaded } = this.state;
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
                {isDataLoaded ? this.getComparison() : null}
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
    },
};

const RoutingComparisonBar = withRouter(ComparisonBar);
export { RoutingComparisonBar };