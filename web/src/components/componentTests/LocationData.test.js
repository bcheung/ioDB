import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BarComponent from '../BarComponent';
/** Location Data Test:
 *
 *  Tests if component
 *
 *  1. Renders
 *  2. Given Null
 *  3. Given Non Null
 *
 */
Enzyme.configure({ adapter: new Adapter() });
// Before Each Test could fit in here and will give hardcoded data
const data = {
    data: [1000, 1000]
};

const nullData = {
    data: null
};

it('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<BarComponent data={nullData.data} />);

    // expect(checkbox.find('div').equals(!null));

    expect(checkbox.isEmpty);
    //  expect(checkbox.isEmpty);
    //  checkbox.find('input').simulate('change');

    //  expect(checkbox.text()).toEqual('On');
});
