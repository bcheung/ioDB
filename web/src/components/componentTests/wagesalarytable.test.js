import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import React from 'react';
import { WageSalaryTable } from '../WageSalaryTable';

Enzyme.configure({ adapter: new Adapter() });

// routing table
const industryDataForRoutingTable = {
    annual_10: { value: 42590, label: '$42,590' },
    annual_25: { value: 69450, label: '$69,450' },
    annual_75: { value: 127350, label: '$127,350' },
    annual_90: { value: 154780, label: '$154,780' },
    annual_mean: { value: 99470, label: '$99,470' },
    annual_median: { value: 98750, label: '$98,750' },
    hourly_10: { value: 20.48, label: '$20.48' },
    hourly_25: { value: 33.39, label: '$33.39' },
    hourly_75: { value: 61.23, label: '$61.23' },
    hourly_90: { value: 74.41, label: '$74.41' },
    hourly_mean: { value: 47.82, label: '$47.82' },
    hourly_median: { value: 47.48, label: '$47.48' },
    industries_3d: {
        id: '999000',
        title: 'Federal, State, and Local Government, excluding st…als and the U.S. Postal Service (OES Designation)'
    },
    occupations_major: { id: '11-0000', title: 'Management Occupations' },
    total_employment: { value: 581900, label: '581,900' }
};

const industryData = {
    annual_10: 23530,
    annual_25: 30730,
    annual_75: 49830,
    annual_90: 62560,
    annual_mean: 42310,
    annual_median: 39220,
    description:
        'Industries in the Forestry and Logging subsector grow and harvest timber on a long production cycle (i.e., of 10 years or more).  Long production cycles use different production processes than short production cycles, which require more horticultural interventions prior to harvest, resulting in processes more similar to those found in the Crop Production subsector.  Consequently, Christmas tree production and other production involving production cycles of less than 10 years, are classified in the Crop Production subsector. ↵↵Industries in this subsector specialize in different stages of the production cycle.  Reforestation requires production of seedlings in specialized nurseries.  Timber production requires natural forest or suitable areas of land that are available for a long duration.  The maturation time for timber depends upon the species of tree, the climatic conditions of the region, and the intended purpose of the timber.  The harvesting of timber (except when done on an extremely small scale) requires specialized machinery unique to the industry.  Establishments gathering forest products, such as gums, barks, balsam needles, rhizomes, fibers, Spanish moss, and ginseng and truffles, are also included in this subsector.',
    hourly_10: 11.31,
    hourly_25: 14.77,
    hourly_75: 23.96,
    hourly_90: 30.08,
    hourly_mean: 20.34,
    hourly_median: 18.86,
    id: '113000',
    industries_4d: [{ id: '113300', title: 'Logging' }],
    title: 'Forestry and Logging',
    total_employment: 49250
};

const nullData = {};

it('Instance Info Component renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<WageSalaryTable data={industryData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Test InstanceInfo Exists', () => {
    const instanceinfo = shallow(<WageSalaryTable data={industryData} />);

    expect(instanceinfo).toExist();
});
