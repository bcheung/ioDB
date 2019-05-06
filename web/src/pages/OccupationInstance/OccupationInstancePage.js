import React, { Component } from 'react';
import { Button, Collapse, Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './occupation-instance-page.css';
import { isMajorModel } from '../../constants';
import {
    DetailedInstanceList,
    RoutingTopTenWidget,
    WageSalaryTable,
    InstanceInfo,
    LoadingComponent,
    RoutingDataTable,
    RoutingChoroplethMap
} from '../../components';

class OccupationInstancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occupationData: null,
            industryData: null,
            locationData: null,
            isMapLoaded: false,
            isDataLoaded: false,
            collapse: false
        };
    }

    // Finding the maximum loc_quotient value for this locationData set
    getMaxLocQuotient = locationData => {
        let maxLocQuotient = 0;
        console.log('locationData array quotient calculation', locationData);
        locationData.forEach(stateData => {
            if (stateData.loc_quotient > maxLocQuotient) {
                maxLocQuotient = stateData.loc_quotient;
            }
        });
        return maxLocQuotient;
    };

    createHeatMapping = locationData => {
        // For use to calculate state fill shade color
        const expression = ['match', ['get', 'STATE_ID']];

        // Maximum location quotient
        const maxLocQuotient = this.getMaxLocQuotient(locationData);
        // Calculate color
        locationData.forEach(stateData => {
            if (stateData.loc_quotient === -1.0) {
                // grey color if no location quotient for state
                const color = `rgba(${102}, ${102}, ${121}, 0.75)`;
                expression.push(stateData.states.id, color);
            } else {
                const green = 255 - (stateData.loc_quotient / maxLocQuotient) * 255;
                const color = `rgba(${255}, ${green}, ${132}, 0.75)`;
                expression.push(stateData.states.id, color);
            }
        });
        // Last value is the default
        expression.push('rgba(0,0,0,0)');

        return expression;
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        console.log('componentDidMount');
        this.fetchData(tablename, id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.match.params.tablename !== this.props.match.params.tablename ||
            nextProps.match.params.id !== this.props.match.params.id
        ) {
            this.setState({ isDataLoaded: false });
            console.log('shouldComponentUpdate false fetch', nextProps.match.params.tablename);
            const { tablename, id } = nextProps.match.params;
            this.fetchData(tablename, id);
            return false;
        }
        if (nextState.isDataLoaded || nextState.isMapLoaded) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        console.log('shouldComponentUpdate false', nextState);
        return false;
    }

    fetchData = async (tablename, id) => {
        // const { tablename, id } = this.props.match.params;
        console.log('fetchData', tablename, id);
        const occupationData = await fetchInstanceData(tablename, id);
        const industryData = await fetchJoinedInstanceData(tablename, 'industries_3d', id);
        const locationData = await fetchJoinedInstanceData(tablename, 'states', id);

        this.setState({
            occupationData,
            industryData,
            locationData,
            isDataLoaded: true
        });
    };

    // Handles toggle button for collapsible detailed occupations list
    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    };

    render() {
        console.log('render');
        const { tablename, id } = this.props.match.params;
        const { isDataLoaded, occupationData, locationData, industryData, collapse } = this.state;
        console.log(this.mapContainer);
        return (
            <Container>
                {isDataLoaded ? (
                    <div>
                        <Col>
                            <InstanceInfo
                                title={occupationData.title}
                                idLabel="Occupation Code"
                                id={occupationData.id}
                                totalEmployment={occupationData.total_employment}
                                description={occupationData.description}
                            />
                            {isMajorModel[tablename] && occupationData ? (
                                <DetailedInstanceList
                                    collapse={collapse}
                                    label="Show Specific Occupations List"
                                    onClick={this.toggle}
                                    majorModel={tablename}
                                    data={occupationData.occupations_detailed}
                                />
                            ) : null}
                            <br />
                            <Row>
                                <Card className="container wage-data">
                                    <br />
                                    <WageSalaryTable data={occupationData} />
                                    <br />
                                </Card>
                            </Row>
                            <RoutingChoroplethMap instanceTitle={occupationData.title} data={locationData} />
                            <RoutingTopTenWidget
                                joined
                                instanceTitle={occupationData.title}
                                // population
                                primaryTable={tablename}
                                secondaryTable="states"
                                id={id}
                                totalEmployment={occupationData.total_employment}
                                // total_population={occupationData.total_population}
                            />
                            <RoutingDataTable
                                joined
                                data={locationData}
                                instanceTitle={occupationData.title}
                                primaryTable={tablename}
                                routingTable="states"
                                population
                            />
                            <RoutingTopTenWidget
                                joined
                                instanceTitle={occupationData.title}
                                primaryTable={tablename}
                                secondaryTable="industries_3d"
                                id={id}
                                totalEmployment={occupationData.total_employment}
                            />
                            <RoutingDataTable
                                joined
                                data={industryData}
                                primaryTable={tablename}
                                instanceTitle={occupationData.title}
                                routingTable="industries_3d"
                            />
                        </Col>
                    </div>
                ) : (
                    <LoadingComponent />
                )}
            </Container>
        );
    }
}

export default OccupationInstancePage;
