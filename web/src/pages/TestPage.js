import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { fetchInstanceData, fetchJoinedTopTenData, fetchJoinedInstanceData, fetchFilteredResults } from '../fetchAPI';
import { RoutingTopTenWidget } from '../components/RoutingTopTenWidget';
import { stats } from '../constants';
import { RoutingDataTable } from '../components';
import { RoutingChoroplethMap } from '../components/RoutingChoroplethMap';

class TestPage extends Component {
    componentDidMount() {
        const data = fetchFilteredResults('occupations_major', 'hourly_mean', 'gt', 10);
    }

    render() {
        return <div />;
    }
}

export default TestPage;
