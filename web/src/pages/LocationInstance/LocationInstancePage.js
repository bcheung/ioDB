import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import LocationData from '../../components/LocationData';
import { fetchInstanceData, fetchJoinedTopTenData } from '../../fetchAPI';

class LocationInstancePage extends Component {
    constructor(props) {
        super(props);
        const { tablename, id } = props.match.params;
        this.state = {
            initial: {
                tablename,
                id
            },
            state: {
                name: '',
                initial: '',
                id: ''
            },
            showStateInfo: false,
            stateData: {},
            MSA: {
                name: '',
                initial: '',
                id: ''
            },
            showMSAInfo: false,
            MSAData: {}
        };

        this.handleStateClick = this.handleStateClick.bind(this);
        this.handleMSAClick = this.handleMSAClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    async handleStateClick(geographyProps) {
        const stateInitial = geographyProps.HASC_1.substring(geographyProps.HASC_1.length - 2);
        // await fetch(`${proxyurl}${urlNAME}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //     this.setState({ stateData: data });
        //   });
        // const response = await axios.get(`${url}`);

        const stateData = await fetchInstanceData('states', geographyProps.ID);

        // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        // const url = 'http://www.iodb.info/api/instance/states/'+geographyProps.ID;

        // const response = await axios.get(`${url}`);
        // const response = await axios.get(`${proxyurl}${url}`);
        // const data = response.data;

        // console.log(response);
        // console.log(data);

        this.setState({
            state: {
                name: geographyProps.NAME_1,
                initial: stateInitial,
                id: geographyProps.ID
            },
            showStateInfo: true,
            stateData,
            showMSAInfo: false
        });

        // console.log(this.state.state.stateData);
    }

    async handleMSAClick(geographyProps) {
        const stateInitial = geographyProps.NAME.substring(geographyProps.NAME.length - 2);

        const MSAData = await fetchInstanceData('metro_areas', geographyProps.GEOID);
        // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        // const url = 'http://www.iodb.info/api/instance/metro_areas/'+geographyProps.GEOID;

        // const response = await axios.get(`${url}`);
        // const response = await axios.get(`${proxyurl}${url}`);
        // const data = response.data;

        if (Object.keys(MSAData).length === 0) {
            return null;
        }

        // console.log(response);
        // console.log(data);
        this.setState({
            MSA: {
                name: geographyProps.NAME,
                initial: stateInitial,
                id: geographyProps.GEOID
            },
            showMSAInfo: true,
            MSAData
        });
    }

    handleReset() {
        this.setState({
            state: {},
            showStateInfo: false,
            stateData: {},
            MSA: {},
            showMSAInfo: false,
            MSAData: {}
        });
    }

    render() {
        return (
            <div>
                <CountryMap
                    onStateClick={this.handleStateClick}
                    onMSAClick={this.handleMSAClick}
                    onReset={this.handleReset}
                    tablename={this.state.initial.tablename}
                    id={this.state.initial.id}
                />
                <br />
                {this.state.showStateInfo ? (
                    <LocationData data={this.state.stateData} primaryTable="states" id={this.state.state.id} />
                ) : null}
                {this.state.showMSAInfo ? (
                    <LocationData data={this.state.MSAData} primaryTable="metro_areas" id={this.state.MSA.id} />
                ) : null}
            </div>
        );
    }
}

export default LocationInstancePage;
