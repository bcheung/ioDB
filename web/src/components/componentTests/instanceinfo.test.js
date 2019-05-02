import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import React from 'react';
import { InstanceInfo } from '../InstanceInfo';

Enzyme.configure({ adapter: new Adapter() });

/** Test:
 *
 *  Tests if component
 *
 *  1. Renders
 *  2. Given Null
 *  3. Given Non Null
 
 */

it('Instance Info Component renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<InstanceInfo title="ArbTitle" idLabel="Occupation Code" id="arbID" />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Test InstanceInfo', () => {
    const instanceinfo = mount(<InstanceInfo title="ArbTitle" idLabel="Occupation Code" id="arbID" />);

    expect(instanceinfo).toExist();

    expect(instanceinfo).toHaveProp('title', 'ArbTitle');
    expect(instanceinfo).toHaveProp('idLabel', 'Occupation Code');
    expect(instanceinfo).toHaveProp('id', 'arbID');
});
