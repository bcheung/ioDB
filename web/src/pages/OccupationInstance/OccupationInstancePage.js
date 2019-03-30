import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Jumbotron, Badge } from 'reactstrap';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './occupation-instance-page.css';

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

// For use to calculate state fill shade color
const expression = ['match', ['get', 'STATE_ID']];

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

class ChemicalEngineers extends Component {
    state = {
        industryData: null,
        mapData: null
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;

        fetchJoinedInstanceData('industries_3d', tablename, tablename, id).then(industryData => {
            this.setState({
                industryData: industryData
            });
            console.log('fetchIndustryData', industryData);
        });

        fetchJoinedInstanceData('states', tablename, tablename, id).then(mapData => {
            this.setState({
                mapData: mapData
            });
            console.log('fetchMapData', mapData);
        });

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96, 40],
            zoom: 2.25
        });

        this.map.on('load', () => {
            this.map.addSource('states', {
                type: 'vector',
                url: 'mapbox://mapbox.us_census_states_2015'
            });

            // Add layer from the vector tile source with data-driven style
            this.map.addLayer(
                {
                    id: 'states-join',
                    type: 'fill',
                    source: 'states',
                    'source-layer': 'states',
                    paint: {
                        'fill-color': expression
                    }
                },
                'waterway-label'
            );
        });
    }

    // Finding the maximum loc_quotient value for this mapData set
    // setMaxLocQuotient = mapDataArray => {
    //     let maxValue = 0;
    //     console.log('mapdata array quotient calculation', mapDataArray);
    //     mapDataArray.forEach(state => {
    //         if (state.loc_quotient >= maxValue) {
    //             maxValue = state.loc_quotient;
    //         }
    //     });
    //     // this.setState({
    //     //     locquotientMaxValue: maxValue
    //     // });
    // };

    map;

    render() {
        const { industryData, mapData } = this.state;
        let name = '';
        let naics = '';
        if (mapData != null) {
            // Maximum location quotient
            // this.setMaxLocQuotient(mapData);
            const max = 5.3;
            // Calculate color
            mapData.forEach(stateData => {
                naics = stateData.occupation_major.id;
                name = stateData.occupation_major.title;
                if (stateData.loc_quotient === -1.0) {
                    // grey color if no location quotient for state
                    const color = `rgba(${102}, ${102}, ${121}, 0.75)`;
                    expression.push(stateData.state.id, color);
                } else {
                    const green = 255 - (stateData.loc_quotient / max) * 255;
                    const color = `rgba(${255}, ${green}, ${132}, 0.75)`;
                    expression.push(stateData.state.id, color);
                }
            });
            // Last value is the default
            expression.push('rgba(0,0,0,0)');
        }
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
        // once instance data is fetched
        // For bar graph use
        const tempLabel = [];
        const tempData = [];

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
        // Once the API fetch request is received
        if (industryData != null) {
            // Populating Bar graph labels for industries from API data
            industryData.forEach(industry => {
                tempLabel.push(industry.industry_3d.title);
                tempData.push(industry.annual_mean);
            });
            // setting Bar data from industries
            industryBarData.labels = tempLabel;
            industryBarData.datasets.data = tempData;
        }

        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        console.log('props', this.props);
        return (
            <Container>
                <Jumbotron>
                    <h1 className="display-3">{name}</h1>
                    <p>NAICS: {naics} </p>
                    <hr className="my-2" />
                    <p className="lead">{}</p>
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
                <Row>
                    <h1>Where are {name} located?</h1>
                    <div ref={el => (this.mapContainer = el)} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
                        <div className="mb6">
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </Row>
                <div className="container">
                    <h2>Annual Percentile Wages for {name}</h2>
                    <Bar
                        data={barData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
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
            </Container>
        );
    }
}

export default ChemicalEngineers;
