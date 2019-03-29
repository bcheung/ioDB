import React, { Component } from 'react';
import './Industry-page.css';
// import { fetchInstanceData } from '../../../fetchAPI';

class IndustryPage extends Component {
    state = {
        instanceData: null
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        console.log('constructor', tablename, id);
        const instanceData = this.fetchInstanceData(tablename, id);
        // this.setState({ instanceData });
        console.log('constructor', instanceData);
    }

    fetchInstanceData = async (tablename, id) => {
        // try {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';

        const url = `${proxyurl}http://iodb.info/api/instance/${tablename}/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('fetch request', data);
        return data;
        // } catch (error) {
        //     console.log(error.message);
        // }
    };

    render() {
        return <div>this is the industry main page</div>;
    }
}

export default IndustryPage;
