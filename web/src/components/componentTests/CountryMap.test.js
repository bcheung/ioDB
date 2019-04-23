import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import CountryMap from '../CountryMap';

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

const geoData = {
    GID_0: 'USA',
    NAME_0: 'United States',
    GID_1: 'USA.1_1',
    NAME_1: 'Alabama',
    ID: '01',
    VARNAME_1: 'AL|Ala.',
    NL_NAME_1: '',
    TYPE_1: 'State',
    ENGTYPE_1: 'State',
    CC_1: '',
    HASC_1: 'US.AL'
};

const match = {
    params: {
        tablename: 'states',
        id: '01'
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

it('Test CountryMap Not Null', () => {
    // Render a checkbox with label in the document
    const widget = mount(<CountryMap />);
    const instance = widget.instance();
    expect(instance).not.toEqual(null);
    widget.unmount();
});

it('Test CountryMap Instance', async () => {
    // Render a checkbox with label in the document
    const widget2 = shallow(<CountryMap match={match} />).instance();
    expect(widget2).not.toEqual(null);
});
