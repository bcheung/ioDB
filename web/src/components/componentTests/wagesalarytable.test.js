import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import React from 'react';
import { WageSalaryTable } from '../WageSalaryTable';

Enzyme.configure({ adapter: new Adapter() });

const industryData = {
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

it('Instance Info Component renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<WageSalaryTable data={industryData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Test InstanceInfo', () => {
    const instanceinfo = mount(<WageSalaryTable data={industryData} />);

    expect(instanceinfo).toExist();

    expect(instanceinfo).toHaveProp('data', industryData);
});
