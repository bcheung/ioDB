import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Table, Container, Row, Col } from 'reactstrap';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './DentistsGen.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

const info = {
    info: {
        occupation: 'Dentists, General',
        naics: '(29-1021)',
        description:
            'Examine, diagnose, and treat diseases, injuries, and malformations of teeth and gums. May treat diseases of nerve, pulp, and other dental tissues affecting oral hygiene and retention of teeth. May fit dental appliances or provide preventive care. Excludes "Prosthodontists" (29-1024), "Orthodontists" (29-1023), "Oral and Maxillofacial Surgeons" (29-1022) and "Dentists, All Other Specialists" (29-1029).',
        meanWage: 'Annual mean wage: $174,110'
    },
    percentile: {
        title: 'Annual Percentile Wages',
        headers: [10, 25, 50, 75, 90],
        values: [69210, 104800, 151440, -1, -1]
    },
    industries: {
        headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
        values: [
            ['Ambulatory Health Care Services', '6621000', 105660, 175290, 152550],
            ['Offices of Dentists', '621200', 99490, 176630, 154130],
            ['Outpatient Care Centers', '621400', 2880, 152810, 141740],
            ['Offices of Physicians', '621100', 2760, 155690, 141730],
            ['Hospitals (including private, state, and local government hospitals)', '622000', 1850, 139020, 134250]
        ]
    },
    states: {
        headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Hawaii', '1500000', 1.42, 700, 174070, 130080],
            ['California', '0600000', 1.33, 17130, 157890, 135490],
            ['Montana', '3000000', 1.29, 460, 161060, 139820],
            ['Arizona', '0400000', 1.25, 2620, 175310, 166990],
            ['New Jersey', '3400000', 1.25, 3880, 164310, 132190]
        ]
    },
    metropolitan: {
        headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Northwest Florida nonmetropolitan area', '1200001', 3.21, 80, 110010, 78110],
            ['Barnstable Town, MA', '0070900', 2.67, 210, 175880, 125460],
            ['Fayetteville, NC', '0022180', 2.29, 230, 209590, 166680],
            ['Flint, MI', '0022420', 2.27, 240, 207700, 193210],
            ['Hawaii/Kauai nonmetropolitan area', '1500001', 2.09, 160, 108320, 19690]
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
    { "STATE_ID": "56", 'unemployment': 7.59 }
];

const expression = ['match', ['get', 'STATE_ID']];

class DentistsGen extends Component {
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

export default DentistsGen;
