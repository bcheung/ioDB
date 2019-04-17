import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import BarComponent from '../BarComponent';
import { TopTenWidget } from '../TopTenWidget';

/** Location Data Test:
 *
 *  Tests if component
 *
 *  1. Renders
 *  2. Given Null
 *  3. Given Non Null
 *
 */
Enzyme.configure({ adapter: new Adapter() });
// Before Each Test could fit in here and will give hardcoded data

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
const instanceData = {
    labels: [],
    datasets: [
        {
            label: 'someLabel',
            borderWidth: 1,
            backgroundColor: [
                'rgba(252,135,186,1)',
                'rgba(186,198,230,1)',
                'rgba(250,225,201,1)',
                'rgba(165,216,255,1)',
                'rgba(255,188,201,1)',
                'rgba(203,247,237,1)',
                'rgba(160,155,229,1)',
                'rgba(140,237,167,1)',
                'rgba(252,246,189,1)',
                'rgba(57,122,215,1)'
            ],
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const instanceData2 = {
    labels: [],
    datasets: [
        {
            label: 'someLabel',
            borderWidth: 1,
            backgroundColor: [
                'rgba(252,135,186,1)',
                'rgba(186,198,230,1)',
                'rgba(250,225,201,1)',
                'rgba(165,216,255,1)',
                'rgba(255,188,201,1)',
                'rgba(203,247,237,1)',
                'rgba(160,155,229,1)',
                'rgba(140,237,167,1)',
                'rgba(252,246,189,1)',
                'rgba(57,122,215,1)'
            ],
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const dataTest = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

it('Top Ten Widget Component renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        data: [1000, 1000]
    };
    ReactDOM.render(<TopTenWidget data={dataTest} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Test TopTenWidget', () => {
    // Render a checkbox with label in the document
    const widget = mount(
        <TopTenWidget
            joined
            title="Top 10 Occupations by"
            secondaryTable="occupations_major"
            id="1"
            total_employment={industryData.total_employment}
            instanceData={instanceData}
        />
    );

    expect(widget).toHaveState('isPieGraph', false);

    expect(widget).toHaveProp('title');

    expect(widget).toHaveProp('title', 'Top 10 Occupations by');

    expect(widget).toHaveProp('total_employment', industryData.total_employment);

    expect(widget).toExist();
});

it('Test TopTenWidget Null Value', () => {
    // Render a checkbox with label in the document
    const widget = mount(<TopTenWidget />);
});
