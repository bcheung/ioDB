import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import data from '../../../components/data.json';
// import data from './usa.topo.json';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './ChemicalEngineers.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

const options = [
    {
        name: 'Population',
        description: 'Estimated total population',
        property: 'pop_est',
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
    },
    {
        name: 'GDP',
        description: 'Estimate total GDP in millions of dollars',
        property: 'gdp_md_est',
        stops: [
            [0, '#f8d5cc'],
            [1000, '#f4bfb6'],
            [5000, '#f1a8a5'],
            [10000, '#ee8f9a'],
            [50000, '#ec739b'],
            [100000, '#dd5ca8'],
            [250000, '#c44cc0'],
            [5000000, '#9f43d7'],
            [10000000, '#6e40e6']
        ]
    }
];

const data2 = {
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

const occupation = {
    annual_10: 48220,
    annual_25: 69880,
    annual_75: 149410,
    annual_90: 208000,
    annual_mean: 119910,
    annual_median: 102590,
    description: '',
    hourly_10: 23.19,
    hourly_25: 33.6,
    hourly_75: 71.83,
    hourly_90: 100.0,
    hourly_mean: 57.65,
    hourly_median: 49.32,
    id: '11-0000',
    occupations_detailed: [
        '11-1011',
        '11-1021',
        '11-1031',
        '11-2011',
        '11-2021',
        '11-2022',
        '11-2031',
        '11-3011',
        '11-3021',
        '11-3031',
        '11-3051',
        '11-3061',
        '11-3071',
        '11-3111',
        '11-3121',
        '11-3131',
        '11-9013',
        '11-9021',
        '11-9031',
        '11-9032',
        '11-9033',
        '11-9039',
        '11-9041',
        '11-9051',
        '11-9061',
        '11-9071',
        '11-9081',
        '11-9111',
        '11-9121',
        '11-9131',
        '11-9141',
        '11-9151',
        '11-9161',
        '11-9199'
    ],
    title: 'Management Occupations',
    total_employment: 7280330
};

const states = [
    { STATE_ID: '01', unemployment: 13.17 },
    { STATE_ID: '02', unemployment: 9.5 },
    { STATE_ID: '04', unemployment: 12.15 },
    { STATE_ID: '05', unemployment: 8.99 },
    { STATE_ID: '06', unemployment: 11.83 },
    { STATE_ID: '08', unemployment: 7.52 },
    { STATE_ID: '09', unemployment: 6.44 },
    { STATE_ID: '10', unemployment: 5.17 },
    { STATE_ID: '12', unemployment: 9.67 },
    { STATE_ID: '13', unemployment: 10.64 },
    { STATE_ID: '15', unemployment: 12.38 },
    { STATE_ID: '16', unemployment: 10.13 },
    { STATE_ID: '17', unemployment: 9.58 },
    { STATE_ID: '18', unemployment: 10.63 },
    { STATE_ID: '19', unemployment: 8.09 },
    { STATE_ID: '20', unemployment: 5.93 },
    { STATE_ID: '21', unemployment: 9.86 },
    { STATE_ID: '22', unemployment: 9.81 },
    { STATE_ID: '23', unemployment: 7.82 },
    { STATE_ID: '24', unemployment: 8.35 },
    { STATE_ID: '25', unemployment: 9.1 },
    { STATE_ID: '26', unemployment: 10.69 },
    { STATE_ID: '27', unemployment: 11.53 },
    { STATE_ID: '28', unemployment: 9.29 },
    { STATE_ID: '29', unemployment: 9.94 },
    { STATE_ID: '30', unemployment: 9.29 },
    { STATE_ID: '31', unemployment: 5.45 },
    { STATE_ID: '32', unemployment: 4.21 },
    { STATE_ID: '33', unemployment: 4.27 },
    { STATE_ID: '34', unemployment: 4.09 },
    { STATE_ID: '35', unemployment: 7.83 },
    { STATE_ID: '36', unemployment: 8.01 },
    { STATE_ID: '37', unemployment: 9.34 },
    { STATE_ID: '38', unemployment: 11.23 },
    { STATE_ID: '39', unemployment: 7.08 },
    { STATE_ID: '40', unemployment: 11.22 },
    { STATE_ID: '41', unemployment: 6.2 },
    { STATE_ID: '42', unemployment: 9.11 },
    { STATE_ID: '44', unemployment: 10.42 },
    { STATE_ID: '45', unemployment: 8.89 },
    { STATE_ID: '46', unemployment: 11.03 },
    { STATE_ID: '47', unemployment: 7.35 },
    { STATE_ID: '48', unemployment: 8.92 },
    { STATE_ID: '49', unemployment: 7.65 },
    { STATE_ID: '50', unemployment: 8.01 },
    { STATE_ID: '51', unemployment: 7.62 },
    { STATE_ID: '53', unemployment: 7.77 },
    { STATE_ID: '54', unemployment: 8.49 },
    { STATE_ID: '55', unemployment: 9.42 },
    { STATE_ID: '56', unemployment: 7.59 }
];

const expression = ['match', ['get', 'STATE_ID']];

class ChemicalEngineers extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            active: options[0]
        };
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96.5, 40],
            zoom: 2.5
        });

        this.map.on('load', () => {
            this.map.addSource('states', {
                type: 'vector',
                url: 'mapbox://mapbox.us_census_states_2015'
            });

            const maxValue = 13;
            // Calculate color
            states.forEach(function(row) {
                const green = (row.unemployment / maxValue) * 255;
                const color = `rgba(${0}, ${green}, ${0}, 1)`;
                expression.push(row.STATE_ID, color);
            });

            expression.push('rgba(0,0,0,0)');

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
        console.log(this.map);
    }

    componentDidUpdate() {
        this.setFill();
    }

    setFill() {
        const { property, stops } = this.state.active;
        this.map.setPaintProperty('countries', 'fill-color', {
            property,
            stops
        });
    }

    // async fetchOccupationData() {
    //     let issuesTotal = 0;
    //     const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    //     const url = `${proxyurl}http://www.iodb.info/api/joined_instance/state_occ_major/occupations_major/11-000`;
    //     // ${11-000}`;
    //     // this.props.id

    //     // without async await
    //     // fetch(url)
    //     //   .then(response => response.json())
    //     //   .then(data => {
    //     //     data.forEach(issue => {
    //     //       const username = issue.user;
    //     //       this.contributorStats[username].issues++;
    //     //       issuesTotal++;
    //     //     });
    //     //   });

    //     const response = await fetch(url);
    //     const format = await response.json();
    //     format.forEach(state => {
    //         console.log(format);
    //         const statequotient = state.loc_quotient;
    //         issuesTotal++;
    //     });
    // }

    map;

    render() {
        const { name, description, stops, property } = this.state.active;
        const renderLegendKeys = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );

        return (
            <div>
                <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
                <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
                    <div className="mb6">
                        <h2 className="txt-bold txt-s block">{name}</h2>
                        <p className="txt-s color-gray">{description}</p>
                    </div>
                    {stops.map(renderLegendKeys)}
                </div>
                <OccupationComponent data={data2} />;
            </div>
        );
    }
}

export default ChemicalEngineers;
