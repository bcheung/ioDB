import React, { Component } from 'react';
import { fetchInstanceData } from '../fetchAPI';

class ExampleInstance extends Component {
    state = {
        instanceData: null
    };

    constructor(props) {
        super(props);
        const { tablename, id } = props.match.params;
        console.log('constructor', tablename, id);

        fetchInstanceData(tablename, id).then(instanceData => {
            this.setState({ instanceData });
            console.log('constructor', instanceData);
        });
    }

    render() {
        return <div>this is the example page</div>;
    }
}

export default ExampleInstance;
