import React, { Component } from 'react';
import { fetchInstanceData, fetchJoinedTopTenData } from '../fetchAPI';
import { StatsDropdown } from '../components';

class ExampleInstance extends Component {
    state = {
        instanceData: null,
        selectedOption: null
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
        console.log('constructor onChange', this.onChange(), this.state.selectedOption);
    }

    onChange = selectedOption => {
        console.log('onChange', selectedOption);
        this.setState({ selectedOption });
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                this is the example page
                <StatsDropdown value={selectedOption} onChange={this.onChange} population />
            </div>
        );
    }
}

export default ExampleInstance;
