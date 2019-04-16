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

// Before Each Test could fit in here and will give hardcoded data
const { data } = [];

it('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<BarComponent data={data} />);

    expect(checkbox.toExist());

    //  checkbox.find('input').simulate('change');

    //  expect(checkbox.text()).toEqual('On');
});
