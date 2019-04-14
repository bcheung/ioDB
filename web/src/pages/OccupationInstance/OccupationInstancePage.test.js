jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({}),
    // mapboxgl: {
    //     accessToken: '',
    //     Map: () => ({}),
    // },
}));

import React from 'react';
import ReactDOM from 'react-dom';
import OccupationInstancePage from './OccupationInstancePage';
import { mapboxgl } from 'mapbox-gl';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        params: {
            tablename: "occupations_major",
            id: "11-0000",
        }
    };
    ReactDOM.render(<OccupationInstancePage match={match}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
