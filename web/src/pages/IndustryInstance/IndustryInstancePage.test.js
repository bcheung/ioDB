import React from 'react';
import ReactDOM from 'react-dom';
import IndustryInstancePage from './IndustryInstancePage';

it('Industry instance renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        params: {
            tablename: "industries_3d",
            id: "425000",
        }
    };
    ReactDOM.render(<IndustryInstancePage match={match}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
