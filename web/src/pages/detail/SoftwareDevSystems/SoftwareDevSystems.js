import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import data from '../../../components/data.json';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './SoftwareDevSystems.css';
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

class SoftwareDevSystems extends Component {
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

export default SoftwareDevSystems;
