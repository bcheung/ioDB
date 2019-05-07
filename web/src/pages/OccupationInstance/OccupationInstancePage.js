import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './occupation-instance-page.css';
import { isMajorModel } from '../../constants';
import {
    SpecificInstanceList,
    RoutingTopTenWidget,
    WageSalaryTable,
    InstanceInfo,
    LoadingComponent,
    RoutingDataTable,
    RoutingChoroplethMap
} from '../../components';

class OccupationInstancePage extends Component {
    // initializing the state
    constructor(props) {
        super(props);
        console.log('Props', props);
        this.state = {
            occupationData: null,
            industryData: null,
            locationData: null,
            isMapLoaded: false,
            isDataLoaded: false,
            collapse: false
        };
    }

    // fetching data and initializing constants from props once mounted
    componentDidMount() {
        const { match } = this.props;
        const { tablename, id } = match.params;
        this.fetchData(tablename, id);
    }

    // when a new occupation is selected from the dropdown menu
    shouldComponentUpdate(nextProps, nextState) {
        const { match } = this.props;
        if (
            nextProps.match.params.tablename !== match.params.tablename ||
            nextProps.match.params.id !== match.params.id
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

    // fetching the occupation, industry, and location data from the api using
    // the specific tablename and id passed in through props
    fetchData = async (tablename, id) => {
        console.log('fetchData', tablename, id);
        // retreiving occupation data for tablename and id from props
        const occupationData = await fetchInstanceData(tablename, id);
        // retreiving industry data for major industries
        const industryData = await fetchJoinedInstanceData(tablename, 'industries_3d', id);
        // retreiving location data for all states
        const locationData = await fetchJoinedInstanceData(tablename, 'states', id);

        // data is loaded
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

    // rendering components onto page:
    // Header, wage and salary table, choropleth map, top ten graph, and joined instance tables
    render() {
        console.log('render');
        const { match } = this.props;
        const { tablename, id } = match.params;
        const { isDataLoaded, occupationData, locationData, industryData, collapse } = this.state;

        return (
            <Container>
                {isDataLoaded ? (
                    <div>
                        <Col>
                            <InstanceInfo idLabel="Occupation Code" tablename={tablename} data={occupationData} />
                            {isMajorModel[tablename] && occupationData ? (
                                <SpecificInstanceList
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

// Prop type validation: checking if tablename and id are of type string
OccupationInstancePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tablename: PropTypes.string,
            id: PropTypes.string
        })
    })
};

export default OccupationInstancePage;
