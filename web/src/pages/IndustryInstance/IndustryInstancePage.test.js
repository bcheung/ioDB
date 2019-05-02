import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import IndustryInstancePage from './IndustryInstancePage';

const match = {
    params: {
        tablename: 'industries_3d',
        id: '425000'
    }
};

/** Test:
 *
 *  Tests if Page:
 * 
 * 1. Renders Given tests
 
 */

it('Industry instance renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IndustryInstancePage match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('test renderDetailedInstanceList', () => {
    const wrapper = shallow(<IndustryInstancePage match={match} />).instance();
    const obj = wrapper.renderDetailedInstanceList();
    expect(obj).not.toEqual(null);
});
