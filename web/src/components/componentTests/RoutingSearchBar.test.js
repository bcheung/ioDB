import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { RoutingSearchBar } from '../RoutingSearchBar';
import { modelOptions } from '../../constants';

/** <RoutingSearchBar
                        modelOptions={modelOptions}
                        selectedModel={selectedModel}
                        setSelectedModel={this.setSelectedModel}
                    /> */

Enzyme.configure({ adapter: new Adapter() });

const selectedModel = modelOptions[0];

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

    ReactDOM.render(
        <BrowserRouter>
            <RoutingSearchBar modelOptions={modelOptions} selectedModel={selectedModel} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('Test InstanceInfo', () => {
    const instanceinfo = mount(
        <BrowserRouter>
            <RoutingSearchBar modelOptions={modelOptions} selectedModel={selectedModel} />
        </BrowserRouter>
    );

    expect(instanceinfo).toExist();
});
