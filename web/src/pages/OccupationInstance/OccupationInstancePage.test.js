import React from 'react';
import ReactDOM from 'react-dom';
import OccupationInstancePage, { getMaxLocQuotient } from './OccupationInstancePage';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import { shallow } from 'enzyme';


jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
    // mapboxgl: {
    //     accessToken: '',
    //     Map: () => ({}),
    // },
}));

const match = {
    params: {
        tablename: "occupations_major",
        id: "11-000",
    }
}

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

it('get max location quotient', () => {
    const wrapper = shallow(<OccupationInstancePage match={match}/>).instance();
    const locData = fetchJoinedInstanceData("occupations_major", '11-000');
    const maxLocQ = getMaxLocQuotient(locData);
    expect(maxLocQ).toEqual(null);
})
