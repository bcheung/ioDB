import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { CountryMap } from '../CountryMap';

/** Test:
 *
 *  Tests if component
 *
 *  1. Renders
 *  2. Given Null
 *  3. Given Non Null
 *' <DetailedInstanceList majorModel={tablename} data={industryData.industries_4d} />
 */
Enzyme.configure({ adapter: new Adapter() });
// Before Each Test could fit in here and will give hardcoded data

const state = {
    initial: {
        done: false,
        tablename: 'arbName',
        id: 'arbID'
    },
    center: [-97, 40],
    zoom: 1,
    detail: false,
    state: {
        name: '',
        initial: '',
        id: ''
    },
    MSA: {
        name: '',
        initial: '',
        id: ''
    }
};

it('Detailed Instance Component renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        data: [1000, 1000]
    };
    ReactDOM.render(<CountryMap />, div);
    ReactDOM.unmountComponentAtNode(div);
});

/** We need to look at sean's locationinstance tests to get a better idea */

// it('Test DetailedInstanceList', () => {
//     // Render a checkbox with label in the document
//     const widget = mount(<DetailedInstanceList majorModel="arbTableName" data={industryData.industries_4d} />);

// });

// it('Test DetailedInstanceList Null Value', () => {
//     // Render a checkbox with label in the document
//     const widget = mount(<DetailedInstanceList majorModel="arbTableName" data={industryData.industries_4d} />);

//     // Can't pass in data b/c too complex
//     expect(widget.prototype.componentDidMount).toExist();
// });
