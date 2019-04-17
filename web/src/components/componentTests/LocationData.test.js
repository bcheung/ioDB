import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
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

it('Bar Component renders without crashing', () => {
    const div = document.createElement('div');
    const match = {
        data: [1000, 1000]
    };
    ReactDOM.render(<BarComponent data={data} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<BarComponent data={data.data} />);

    expect(checkbox.find('div')).toHaveLength(1);
    expect(checkbox.find('div')).toExist();

    expect(checkbox).toHaveState('test', false);
    // expect(checkbox.find(BarComponent)).toHaveProp('data');
});

it('Test State', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<BarComponent data={data.data} />);

    expect(checkbox).toHaveState('test', false);
    // expect(checkbox.find(BarComponent)).toHaveProp('data');
});
