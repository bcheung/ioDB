import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { fetchInstanceData, fetchJoinedTopTenData, fetchJoinedInstanceData } from '../fetchAPI';
import { RoutingTopTenWidget } from '../components/RoutingTopTenWidget';
import { stats } from '../constants';
import { RoutingDataTable } from '../components';

// {
//     id: 'friendName', // Required because our accessor is not a string
//     Header: 'Friend Name',
//     accessor: d => d.friend.name // Custom value accessors!
// },
// {
//     Header: props => <span>Friend Age</span>, // Custom header components!
//     accessor: 'friend.age'
// }
class TestPage extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        // const { tablename, id } = this.props.match.params;
        // console.log('constructor', tablename, id);
        // fetchInstanceData(tablename, id).then(instanceData => {
        //     this.setState({ instanceData });
        //     console.log('constructor', instanceData);
        // });
        // fetchJoinedTopTenData(tablename, 'occupations_major', tablename, id, 'total_employment').then(data => {
        //     console.log('constructor', data);
        // });
        // console.log('constructor onChange', this.onChange(), this.state.selectedOption);
        fetchJoinedInstanceData('occupations_major', 'states', '11-0000').then(data => {
            console.log('constructor', data);
            this.setState({ data });
        });
    }

    render() {
        const { data } = this.state;
        // return (
        //     <div>
        //         this is the test page
        //         {/* <RoutingTopTenWidget
        //             joined
        //             population
        //             tablename1="states"
        //             tablename2="occupations_major"
        //             keyModel="occupations_major"
        //             id="11-0000"
        //         /> */}
        //         <ReactTable data={data} columns={columns} />
        //     </div>
        // );\

        return <RoutingDataTable data={data} secondaryTable="states" />;
    }
}

export default TestPage;
