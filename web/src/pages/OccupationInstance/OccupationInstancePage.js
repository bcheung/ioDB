import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
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
    ChoreplethMap
} from '../../components';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';



// let map;

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
        // this.mapContainer = React.createRef();
    }

    // Finding the maximum loc_quotient value for this locationData set
    getMaxLocQuotient = (locationData) => {
        let maxLocQuotient = 0;
        console.log('locationData array quotient calculation', locationData);
        locationData.forEach(stateData => {
            if (stateData.loc_quotient > maxLocQuotient) {
                maxLocQuotient = stateData.loc_quotient;
            }
        });
        return maxLocQuotient;
    }

    createHeatMapping = (locationData) => {
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
    }

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

    componentDidUpdate(prevProps, prevState) {
        const { isDataLoaded, isMapLoaded } = this.state;
        // if (isDataLoaded && isMapLoaded) {
        // this.setHeatMapping();
        // } else
        if (isDataLoaded) {
            this.loadMap();
        }
    }

    loadMap = () => {
        console.log('loadMap');
        // map = new mapboxgl.Map({
        //     container: this.mapContainer,
        //     style: 'mapbox://styles/mapbox/light-v10',
        //     center: [-96, 40],
        //     zoom: 2.25
        // });

        // map.on('load', () => {
        //     map.addSource('states', {
        //         type: 'vector',
        //         url: 'mapbox://mapbox.us_census_states_2015'
        //     });
        //     const expression = ['match', ['get', 'STATE_ID']];
        //     expression.push('rgba(0,0,0,0)');
        //     expression.push('rgba(0,0,0,0)');
        //     expression.push('rgba(0,0,0,0)');

        //     // Add layer from the vector tile source with data-driven style
        //     map.addLayer(
        //         {
        //             id: 'heat-layer',
        //             type: 'fill',
        //             source: 'states',
        //             'source-layer': 'states',
        //             paint: {
        //                 'fill-color': expression,
        //                 'fill-opacity': 0,
        //                 'fill-opacity-transition': { duration: 500 }
        //             },
        //             transition: {
        //                 duration: 2000,
        //                 delay: 0
        //             }
        //         },
        //         'waterway-label'
        //     );
        //     const popup = new mapboxgl.Popup({
        //         closeButton: false,
        //         closeOnClick: false
        //     });
        //     function checkEmpty(info) {
        //         return info || 'No data';
        //     }

        //     map.on('mousemove', function(e) {
        //         map.getCanvas().style.cursor = 'pointer';
        //         const position = {
        //             lon: e.lngLat.lng,
        //             lat: e.lngLat.lat
        //         };
        //         const mappopup = map.queryRenderedFeatures(e.point, {
        //             layers: ['heat-layer']
        //         });
        //         // const { locationData } = this.state;
        //         if (mappopup.length > 0) {
        //             const stateName = mappopup[0].properties.STATE_NAME;
        //             popup
        //                 .setLngLat(position)
        //                 .setHTML(stateName)
        //                 .addTo(map);
        //         } else {
        //             popup
        //                 .setLngLat(position)
        //                 .setHTML('No data')
        //                 .addTo(map);
        //         }
        //     });
        //     map.on('mouseleave', function() {
        //         map.getCanvas().style.cursor = '';
        //         popup.remove();
        //     });
        //     this.setState({ isMapLoaded: true });
        // });
    };

    setHeatMapping = () => {
        const { isMapLoaded, locationData } = this.state;
        console.log('setHeatMapping', isMapLoaded, locationData);

        if (isMapLoaded && locationData) {
            const expression = this.createHeatMapping(locationData);
            // map.setPaintProperty('heat-layer', 'fill-opacity', 0);

            // setTimeout(function() {
            //     console.log('setTimeout', map);
            //     map.setPaintProperty('heat-layer', 'fill-opacity', 1);
            // }, 1000);

            // setTimeout(function() {
            //     console.log('setTimeout', map);
            //     map.setPaintProperty('heat-layer', 'fill-color', expression);
            // }, 1000);
        }
    };

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
                            <RoutingTopTenWidget
                                joined
                                title="Top 10 Major Industries by"
                                primaryTable={tablename}
                                secondaryTable="industries_3d"
                                id={id}
                                totalEmployment={occupationData.total_employment}
                            />
                            <div style={{ padding: '1em' }}>
                                <RoutingDataTable data={industryData} secondaryTable="industries_3d" />
                            </div>
                            <RoutingTopTenWidget
                                joined
                                title="Top 10 States by"
                                // population
                                primaryTable={tablename}
                                secondaryTable="states"
                                id={id}
                                totalEmployment={occupationData.total_employment}
                                // total_population={occupationData.total_population}
                            />
                            <div style={{ padding: '1em' }}>
                                <RoutingDataTable data={locationData} secondaryTable="states" population />
                            </div>
                            <Row>{<h1>Where are {occupationData.title} located?</h1>}</Row>
                            <ChoreplethMap
                                // onStateClick={this.handleStateClick}
                                // onMSAClick={this.handleMSAClick}
                                // onReset={this.handleReset}
                                // tablename={tablename}
                                // id={id}
                                data={locationData}
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
/* {
    <div style={{ height: '500px' }} ref={el => (this.mapContainer = el)} />
} */
