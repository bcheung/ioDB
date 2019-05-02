import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ReactToolTip from 'react-tooltip';
import LocationInstancePage from './LocationInstancePage';

/** Hard Coded data for tests */
const match = {
    params: {
        tablename: 'states',
        id: '01'
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

const MSAGeoData = {
    GEOID: '13820',
    NAME: 'Birmingham-Hoover, AL'
};

/** Test:
 *
 *  Tests if Page:
 * 
 * 1. Renders Given tests
   2. Renders when component inside is clicked
 */

it('Location instance renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LocationInstancePage match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('handleStateClick test works', async () => {
    const wrapper = shallow(<LocationInstancePage match={match} />).instance();
    const obj = await wrapper.handleStateClick(geoData);
    expect(obj).not.toEqual(null);
});

it('handleMSAClick test works', async () => {
    const wrapper = shallow(<LocationInstancePage match={match} />).instance();
    await wrapper.handleStateClick(geoData);
    const obj = await wrapper.handleMSAClick(MSAGeoData);
    expect(obj).not.toEqual(null);
});
