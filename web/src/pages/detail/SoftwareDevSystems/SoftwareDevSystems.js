import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Table, Container, Row, Col } from 'reactstrap';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './SoftwareDevSystems.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

const info = {
    info: {
        occupation: 'Software Developers, Systems Software',
        naics: '(15-1133)',
        description:
            'Research, design, develop, and test operating systems-level software, compilers, and network distribution software for medical, industrial, military, communications, aerospace, business, scientific, and general computing applications. Set operational specifications and formulat and analyze software requirements. May design embedded systems software. Apply principles and techniques of computer science, engineering, and mathematical analysis.',
        meanWage: 'Annual mean wage: $111,780'
    },
    percentile: {
        title: 'Annual Percentile Wages',
        headers: [10, 25, 50, 75, 90],
        values: [65670, 84290, 107600, 135740, 164150]
    },
    industries: {
        headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
        values: [
            ['Professional, Scientific, and Technical Services', '541000', 170630, 111840, 107060],
            ['Computer Systems Design and Related Services', '541500', 123240, 110970, 106180],
            ['Computer and Electronic Product Manufacturing', '334000', 48060, 119270, 116710],
            ['Publishing Industries (except Internet)', '511000', 24510, 112080, 108420],
            ['Software Publishers', '511200', 22980, 112110, 108610]
        ]
    },
    states: {
        headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Massachusetts', '2500000', 2.72, 26560, 114900, 112880],
            ['Virginia', '5100000', 2.35, 24650, 121560, 119430],
            ['Maryland', '2400000', 2.04, 15030, 118330, 114660],
            ['Colorado', '0800000', 1.87, 13260, 122170, 115110],
            ['California', '0600000', 1.79, 82630, 127230, 124190]
        ]
    },
    metropolitan: {
        headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Lowell-Billerica-Chelmsford, MA-NH NECTA Division', '0074804', 8.27, 3560, 126090, 123910],
            ['San Jose-Sunnyvale-Santa Clara, CA', '0041940', 7.99, 24070, 141890, 139960],
            ['Framingham, MA NECTA Division', '0073104', 6.97, 3330, 110680, 110240],
            ['California-Lexington Park, MD', '0015680', 5.97, 750, 112190, 111060],
            ['Palm Bay-Melbourne-Titusville, FL', '0037340', 4.22, 2420, 111000, 109860]
        ]
    }
};

const data = [
    { "STATE_ID": "01", "unemployment": 13.17 },
    { "STATE_ID": "02", "unemployment": 9.5 },
    { "STATE_ID": "04", "unemployment": 12.15 },
    { "STATE_ID": "05", "unemployment": 8.99 },
    { "STATE_ID": "06", "unemployment": 11.83 },
    { "STATE_ID": "08", "unemployment": 7.52 },
    { "STATE_ID": "09", "unemployment": 6.44 },
    { "STATE_ID": "10", "unemployment": 5.17 },
    { "STATE_ID": "12", "unemployment": 9.67 },
    { "STATE_ID": "13", "unemployment": 10.64 },
    { "STATE_ID": "15", "unemployment": 12.38 },
    { "STATE_ID": "16", "unemployment": 10.13 },
    { "STATE_ID": "17", "unemployment": 9.58 },
    { "STATE_ID": "18", "unemployment": 10.63 },
    { "STATE_ID": "19", "unemployment": 8.09 },
    { "STATE_ID": "20", "unemployment": 5.93 },
    { "STATE_ID": "21", "unemployment": 9.86 },
    { "STATE_ID": "22", "unemployment": 9.81 },
    { "STATE_ID": "23", "unemployment": 7.82 },
    { "STATE_ID": "24", "unemployment": 8.35 },
    { "STATE_ID": "25", "unemployment": 9.1 },
    { "STATE_ID": "26", "unemployment": 10.69 },
    { "STATE_ID": "27", "unemployment": 11.53 },
    { "STATE_ID": "28", "unemployment": 9.29 },
    { "STATE_ID": "29", "unemployment": 9.94 },
    { "STATE_ID": "30", "unemployment": 9.29 },
    { "STATE_ID": "31", "unemployment": 5.45 },
    { "STATE_ID": "32", "unemployment": 4.21 },
    { "STATE_ID": "33", "unemployment": 4.27 },
    { "STATE_ID": "34", "unemployment": 4.09 },
    { "STATE_ID": "35", "unemployment": 7.83 },
    { "STATE_ID": "36", "unemployment": 8.01 },
    { "STATE_ID": "37", "unemployment": 9.34 },
    { "STATE_ID": "38", "unemployment": 11.23 },
    { "STATE_ID": "39", "unemployment": 7.08 },
    { "STATE_ID": "40", "unemployment": 11.22 },
    { "STATE_ID": "41", "unemployment": 6.2 },
    { "STATE_ID": "42", "unemployment": 9.11 },
    { "STATE_ID": "44", "unemployment": 10.42 },
    { "STATE_ID": "45", "unemployment": 8.89 },
    { "STATE_ID": "46", "unemployment": 11.03 },
    { "STATE_ID": "47", "unemployment": 7.35 },
    { "STATE_ID": "48", "unemployment": 8.92 },
    { "STATE_ID": "49", "unemployment": 7.65 },
    { "STATE_ID": "50", "unemployment": 8.01 },
    { "STATE_ID": "51", "unemployment": 7.62 },
    { "STATE_ID": "53", "unemployment": 7.77 },
    { "STATE_ID": "54", "unemployment": 8.49 },
    { "STATE_ID": "55", "unemployment": 9.42 },
    { "STATE_ID": "56", "unemployment": 7.59 }
];

class SoftwareDevSystems extends Component {
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

            var expression = ["match", ["get", "STATE_ID"]];

            const maxValue = 13;
            // Calculate color
            data.forEach(function (row) {
                const green = 255 - ((row.unemployment / maxValue) * 255);
                const color = `rgba(${0}, ${green}, ${0}, 0.75)`;
                expression.push(row.STATE_ID, color);
            });

            // Last value is the default
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
    }

    map;

    render() {
        return (
            <Container>
                <Row>
                    <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
                </Row>
                <Row>
                    <OccupationComponent data={info} className="absolute top right left bottom" />;
                </Row>
            </Container>
        );
    }
}



export default SoftwareDevSystems;
