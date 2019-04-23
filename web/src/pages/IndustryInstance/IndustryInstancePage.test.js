import React from 'react';
import ReactDOM from 'react-dom';
import IndustryInstancePage from './IndustryInstancePage';
import { shallow } from 'enzyme';

const match = {
    params: {
        tablename: "industries_3d",
        id: "425000",
    }
};

it('Industry instance renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IndustryInstancePage match={match}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('test renderDetailedInstanceList', () => {
    const wrapper = shallow(<IndustryInstancePage match={match}/>).instance();
    const obj = wrapper.renderDetailedInstanceList();
    expect(obj).not.toEqual(null);
});
