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

it('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

    expect(checkbox.text()).toEqual('Off');

    checkbox.find('input').simulate('change');

    expect(checkbox.text()).toEqual('On');
});

it('test renderDetailedInstanceList', () => {
    const wrapper = shallow(<IndustryInstancePage match={match}/>).instance();
    const obj = wrapper.renderDetailedInstanceList();
    expect(obj).not.toEqual(null);
});
