import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import OccupationInstancePage from './OccupationInstancePage';
import { fetchJoinedInstanceData } from '../../fetchAPI';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
    // mapboxgl: {
    //     accessToken: '',
    //     Map: () => ({}),
    // },
}));

const match = {
    params: {
        tablename: 'occupations_major',
        id: '11-000',
    }
};

/** Test:
 *
 *  Tests if Page:
 * 
 * 1. Renders Given tests
   2. Tests if functions within page render when clicked
 */

it('renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        params: {
            tablename: 'occupations_major',
            id: '11-0000'
        }
    };
    ReactDOM.render(<OccupationInstancePage match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('get max location quotient', async () => {
    const wrapper = shallow(<OccupationInstancePage match={match} />).instance();
    const maxLocQ = wrapper.getMaxLocQuotient(await fetchJoinedInstanceData('occupations_major', '11-000'));
    expect(maxLocQ).not.toEqual(null);
});

it('createHeatMapping test', async () => {
    const wrapper = shallow(<OccupationInstancePage match={match} />).instance();
    const expression = wrapper.createHeatMapping(await fetchJoinedInstanceData('occupations_major', '11-000'));
    expect(expression).not.toEqual(null);
});
