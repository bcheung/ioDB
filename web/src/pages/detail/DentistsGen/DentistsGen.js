import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import data from '../../../components/data.json';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './DentistsGen.css';
// import data from './usa.topo.json';

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

class DentistsGen extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            active: options[0]
        };
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-96.5, 40],
            zoom: 2.5
        });

        this.map.on('load', () => {
            this.map.addSource('states', {
                type: 'geojson',
                data
            });

            this.map.addLayer(
                {
                    id: 'countries',
                    type: 'fill',
                    source: 'states'
                },
                'country-label-lg'
            ); // ID metches `mapbox/streets-v9`

            this.setFill();
        });
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
                <OccupationComponent data={info} />;
            </div>
        );
    }
}

export default DentistsGen;
