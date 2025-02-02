import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Button, Container, Row, Col } from 'reactstrap';
import { fetchListData, fetchInstanceData, fetchJoinedInstanceData } from '../fetchAPI';
import ComparisonOccupation from './ComparisonOccupation';
import ComparisonLocation from './ComparisonLocation';
import ComparisonIndustry from './ComparisonIndustry';
import { LoadingComponent } from '.';
import { getModelLabelSingular } from '../constants';

class ComparisonBar extends Component {
    state = {
        instanceOptions: [],
        selectedInstance_1: null,
        selectedInstance_2: null,
        selectedModel: this.props.selectedModel,
        instance_1: null,
        instance_2: null,
        isModelLoaded: false,
        isDataLoaded: false,
        loading: false
    };

    componentDidMount() {
        const { selectedModel } = this.state;
        const { tablename } = selectedModel;
        this.fetchInstances(tablename);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.loading !== nextState.loading) {
            return true;
        }
        if (
            this.state.selectedInstance_1 !== nextState.selectedInstance_1 ||
            this.state.selectedInstance_2 !== nextState.selectedInstance_2
        ) {
            return true;
        }
        if (nextState.isModelLoaded && this.state.isModelLoaded !== nextState.isModelLoaded) {
            return true;
        }
        if (nextState.isDataLoaded && this.state.isDataLoaded !== nextState.isDataLoaded) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        console.log('shouldComponentUpdate false', nextState);
        return false;
    }

    handleModelChange = selectedModel => {
        this.setState({
            selectedModel,
            selectedInstance_1: null,
            selectedInstance_2: null,
            isModelLoaded: false,
            isDataLoaded: false
        });
        const { tablename } = selectedModel;
        const { setSelectedModel } = this.props;
        this.fetchInstances(tablename);
        setSelectedModel(selectedModel);
    };

    handleInstance1Change = selectedInstance_1 => {
        this.setState({ selectedInstance_1, isDataLoaded: false });
    };

    handleInstance2Change = selectedInstance_2 => {
        this.setState({ selectedInstance_2, isDataLoaded: false });
    };

    onSearchRequest = async () => {
        const { selectedInstance_1, selectedInstance_2, selectedModel } = this.state;
        if (selectedInstance_1 !== null && selectedInstance_2 !== null) {
            this.setState({ loading: true });
            const id_1 = selectedInstance_1.id;
            const id_2 = selectedInstance_2.id;
            const { tablename, route } = selectedModel;
            let instance_1 = null;
            let instance_2 = null;
            if (tablename === 'occupations_major' || tablename === 'occupations_detailed') {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1),
                    locationData: await fetchJoinedInstanceData(tablename, 'states', id_1)
                };
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2),
                    locationData: await fetchJoinedInstanceData(tablename, 'states', id_2)
                };
            } else if (tablename === 'states' || tablename === 'metro_areas') {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1)
                };
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2)
                };
            } else if (tablename === 'industries_3d' || tablename === 'industries_4d') {
                instance_1 = {
                    data: await fetchInstanceData(tablename, id_1)
                };
                instance_2 = {
                    data: await fetchInstanceData(tablename, id_2)
                };
            }
            this.setState({
                instance_1,
                instance_2,
                isDataLoaded: true,
                loading: false
            });
        }
    };

    getComparison = () => {
        const { selectedInstance_1, selectedInstance_2, selectedModel, instance_1, instance_2 } = this.state;
        const { tablename } = selectedModel;
        if (tablename === 'occupations_major' || tablename === 'occupations_detailed') {
            return (
                <ComparisonOccupation instance_1={instance_1} instance_2={instance_2} selectedModel={selectedModel} />
            );
        }
        if (tablename === 'industries_3d' || tablename === 'industries_4d') {
            return <ComparisonIndustry instance_1={instance_1} instance_2={instance_2} selectedModel={selectedModel} />;
        }
        if (tablename === 'states' || tablename === 'metro_areas') {
            return <ComparisonLocation instance_1={instance_1} instance_2={instance_2} selectedModel={selectedModel} />;
        }
    };

    fetchInstances(tablename) {
        fetchListData(tablename).then(data => {
            this.setState({ instanceOptions: data, isModelLoaded: true });
        });
    }

    render() {
        const {
            instanceOptions,
            selectedInstance_1,
            selectedInstance_2,
            selectedModel,
            isDataLoaded,
            loading
        } = this.state;
        const { modelOptions } = this.props;
        return (
            <div>
                <Container>
                    <h1>Select two {selectedModel.title} to compare:</h1>
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
                                value={selectedInstance_1}
                                onChange={this.handleInstance1Change}
                                getOptionLabel={option => option.title}
                                getOptionValue={option => option.id}
                                placeholder={`Select a ${getModelLabelSingular[selectedModel.tablename]}`}
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
                                placeholder={`Select a ${getModelLabelSingular[selectedModel.tablename]}`}
                            />
                        </Col>
                        <Col md="1">
                            <Button color="primary" onClick={this.onSearchRequest}>
                                Compare
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {loading ? <LoadingComponent /> : null}
                {isDataLoaded ? this.getComparison() : null}
            </div>
        );
    }
}

const RoutingComparisonBar = withRouter(ComparisonBar);
export { RoutingComparisonBar };
