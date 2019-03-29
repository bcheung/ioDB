import React, { Component } from 'react';
import { fetchInstanceData, fetchJoinedTopTenData } from '../fetchAPI';

class ExampleInstance extends Component {
    state = {
        instanceData: null
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        console.log('constructor', tablename, id);

        fetchInstanceData(tablename, id).then(instanceData => {
            this.setState({ instanceData });
            console.log('constructor', instanceData);
        });

        fetchJoinedTopTenData(tablename, 'occupations_major', tablename, id, 'total_employment').then(data => {
            console.log('constructor', data);
        });
    }

    render() {
        return <div>this is the example page</div>;
    }
}

export default ExampleInstance;
