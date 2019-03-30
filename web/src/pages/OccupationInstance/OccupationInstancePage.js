import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Jumbotron, Badge } from 'reactstrap';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './occupation-instance-page.css';
import { isMajorModel } from '../../constants';
import { DetailedInstanceList } from '../../components';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

// Hardcoded data from Phase 1 (data in OccupationComponent)
const data = {
    info: {
        occupation: 'Chemical Engineers',
        naics: '(17-2041)',
        description:
            'Design chemical plant equipment and devise processes for manufacturing chemicals and products, such as gasoline, synthetic rubber, plastics, detergents, cement, paper, and pulp, by applying principles and technology of chemsitry, physics, and engineering.',
        meanWage: 'Annual mean wage: $112,430'
    },
    percentile: {
        title: 'Annual Percentile Wages',
        headers: [10, 25, 50, 75, 90],
        values: [62230, 79030, 102160, 131030, 169080]
    },
    industries: {
        headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
        values: [
            ['Chemical Manufacturing', '325000', 12950, 112310, 102460],
            ['Chemical Manufacturing', '3250A1', 10130, 115130, 102460],
            ['Professional, Scientific, and Technical Services', '541000', 8590, 117840, 105980],
            ['Architectural, Engineering, and Related Services', '541300', 3790, 116690, 104360],
            ['Scientific Research and Development Services', '541700', 3440, 117130, 107250]
        ]
    },
    states: {
        headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Delaware', '1000000', 5.35, 560, 114860, 109580],
            ['Louisiana', '2200000', 5.14, 2300, 108070, 99170],
            ['Texas', '4800000', 2.93, 8200, 145660, 126110],
            ['West Virginia', '5400000', 1.91, 310, 89570, 89810],
            ['South Carolina', '4500000', 1.91, 310, 81990, 77980]
        ]
    },
    metropolitan: {
        headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Lake Charles, LA', '0029340', 13.34, 350, 92080, 87990],
            ['Beaumont-Port Arthur, TX', '0013140', 11.88, 450, 154870, 140650],
            ['Baton Rouge, LA', '0012940', 11.87, 1090, 117980, 110490],
            ['Idaho Falls, ID', '0026820', 11.61, 180, 118810, 110850],
            ['Kennewick-Richland, WA', '0028420', 10.72, 280, 109050, 105310]
        ]
    }
};

const legendData = {
    name: 'Employment',
    description: 'Total employment in US States',
    stops: [
        [0, '#f8d5cc'],
        [1000000, '#f4bfb6'],
        [5000000, '#f1a8a5'],
        [10000000, '#ee8f9a'],
        [50000000, '#ec739b'],
        [100000000, '#dd5ca8'],
        [250000000, '#c44cc0'],
        [500000000, '#9f43d7'],
        [1000000000, '#6e40e6']
    ]
};

// Finding the maximum loc_quotient value for this locationData set
function getMaxLocQuotient(locationData) {
    let maxLocQuotient = 0;
    console.log('locationData array quotient calculation', locationData);
    locationData.forEach(stateData => {
        if (stateData.loc_quotient > maxLocQuotient) {
            maxLocQuotient = stateData.loc_quotient;
        }
    });
    return maxLocQuotient;
}

function createHeatMapping(locationData) {
    // For use to calculate state fill shade color
    const expression = ['match', ['get', 'STATE_ID']];

    // Maximum location quotient
    const maxLocQuotient = getMaxLocQuotient(locationData);
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
let map;

class OccupationInstancePage extends Component {
    state = {
        occupationData: null,
        industryData: null,
        locationData: null,
        mapLoaded: false
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        this.fetchData(tablename, id);
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96, 40],
            zoom: 2.25
        });

        map.on('load', () => {
            map.addSource('states', {
                type: 'vector',
                url: 'mapbox://mapbox.us_census_states_2015'
            });
            const expression = ['match', ['get', 'STATE_ID']];
            expression.push('rgba(0,0,0,0)');
            expression.push('rgba(0,0,0,0)');
            expression.push('rgba(0,0,0,0)');

            // Add layer from the vector tile source with data-driven style
            map.addLayer(
                {
                    id: 'heat-layer',
                    type: 'fill',
                    source: 'states',
                    'source-layer': 'states',
                    paint: {
                        'fill-color': expression,
                        'fill-opacity': 0,
                        'fill-opacity-transition': { duration: 500 }
                    },
                    transition: {
                        duration: 2000,
                        delay: 0
                    }
                },
                'waterway-label'
            );
            this.setState({ mapLoaded: true });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.occupationData !== this.state.occupationData ||
            nextState.industryData !== this.state.industryData ||
            nextState.locationData !== this.state.locationData
        ) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        if (
            nextProps.match.params.tablename !== this.props.match.params.tablename ||
            nextProps.match.params.id !== this.props.match.params.id
        ) {
            console.log('shouldComponentUpdate false fetch', nextProps.match.params.tablename);
            const { tablename, id } = nextProps.match.params;
            this.fetchData(tablename, id);
            return false;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.locationData !== this.state.locationData) {
            this.setHeatMapping();
        }
    }

    setHeatMapping = () => {
        const { mapLoaded, locationData } = this.state;

        if (mapLoaded && locationData) {
            const expression = createHeatMapping(this.state.locationData);
            map.setPaintProperty('heat-layer', 'fill-opacity', 0);

            setTimeout(function() {
                console.log('setTimeout', map);
                map.setPaintProperty('heat-layer', 'fill-opacity', 1);
            }, 1000);

            map.setPaintProperty('heat-layer', 'fill-color', expression);
        }
    };

    fetchData = async (tablename, id) => {
        // const { tablename, id } = this.props.match.params;
        console.log('fetchData', tablename, id);
        const occupationData = await fetchInstanceData(tablename, id);
        const industryData = await fetchJoinedInstanceData('industries_3d', tablename, tablename, id);
        const locationData = await fetchJoinedInstanceData('states', tablename, tablename, id);

        this.setState({
            occupationData,
            industryData,
            locationData
        });
    };

    renderOccupationData = () => {
        const { occupationData } = this.state;
        if (occupationData) {
            return (
                <Jumbotron>
                    <h1 className="display-3">{occupationData.title}</h1>
                    <p>Occupation Code: {occupationData.id}</p>
                    <hr className="my-2" />
                    <p className="lead">Description:{occupationData.description}</p>
                    <p>
                        Annual Mean Wage:
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format()}
                    </p>
                </Jumbotron>
            );
        }
    };

    renderLocationData = () => {
        const { mapLoaded, occupationData, locationData } = this.state;
        if (mapLoaded && occupationData && locationData) {
            return (
                <div>
                    <h1>Where are {occupationData.title} located?</h1>
                </div>
            );
        }
    };

    renderPie = () => {
        const { occupationData, locationData } = this.state;

        if (occupationData) {
            // for Bar graph use
            const tempBarData = [];
            // populated by instanceData
            const barData = {
                labels: ['10%', '25%', '50%', '75%', '90%'],
                datasets: [
                    {
                        label: 'Wage (Dollar Amount)',
                        backgroundColor: 'rgba(255,99,132,1)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: tempBarData
                    }
                ]
            };
            return (
                <div className="container">
                    <h2>Annual Percentile Wages for {occupationData.title}</h2>
                    <Bar
                        data={barData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            );
        }
    };

    renderBar = () => {
        const { occupationData, locationData, industryData } = this.state;

        // once instance data is fetched
        // For bar graph use
        const tempLabel = [];
        const tempData = [];
        // Once the API fetch request is received
        if (industryData) {
            // Populating Bar graph labels for industries from API data
            industryData.forEach(industry => {
                tempLabel.push(industry.industry_3d.title);
                tempData.push(industry.annual_mean);
            });
            const industryBarData = {
                labels: tempLabel,
                datasets: [
                    {
                        label: 'Wage (Dollar Amount)',
                        backgroundColor: 'rgba(255,99,132,1)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: tempData
                    }
                ]
            };
            // setting Bar data from industries
            industryBarData.labels = tempLabel;
            industryBarData.datasets.data = tempData;
            return (
                <div>
                    <h2>Wage by Industry</h2>
                    <Bar
                        data={industryBarData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            );
        }
    };

    renderDetailedInstanceList = () => {
        const { tablename } = this.props.match.params;
        const { occupationData } = this.state;

        if (occupationData) {
            return <DetailedInstanceList majorModel={tablename} data={occupationData.occupations_detailed} />;
        }
    };

    render() {
        console.log('render');
        const { tablename } = this.props.match.params;
        const { occupationData, industryData, locationData } = this.state;

        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        return (
            <Container>
                <Row>{isMajorModel[tablename] ? this.renderDetailedInstanceList() : null}</Row>
                <Row>{this.renderOccupationData()}</Row>
                <Row>{this.renderLocationData()}</Row>
                <div ref={el => (this.mapContainer = el)} />
            </Container>
        );
    }
}

export default OccupationInstancePage;
