import React, { Component } from 'react';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './ChemicalEngineers.css';

class ChemicalEngineers extends Component {
    render() {
        return <OccupationComponent data={data} />;
    }
}

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

export default ChemicalEngineers;
