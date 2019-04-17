import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import LocationData from '../../components/LocationData';
import { fetchInstanceData, fetchJoinedTopTenData } from '../../fetchAPI';

class LocationInstancePage extends Component {
    constructor(props) {
        super(props);
        const { tablename, id } = props.match.params;
        this.state = {
            state: null,
            showStateInfo: false,
            stateData: null,
            MSA: null,
            showMSAInfo: false,
            MSAData: null
        };
    }

    // componentDidMount() {
    //     const { tablename, id } = this.props.match.params;
    //     this.fetchData(tablename, id);
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate LocationInstancePage', nextProps);
        // if (
        //     nextProps.match.params.tablename !== this.props.match.params.tablename ||
        //     nextProps.match.params.id !== this.props.match.params.id
        // ) {
        //     // this.setState({ isDataLoaded: false });
        //     console.log('shouldComponentUpdate true props', nextProps.match.params.id);
        //     // const { tablename, id } = nextProps.match.params;
        //     // this.fetchData(tablename, id);
        //     return true;
        // }
        // if (nextState.showStateInfo !== this.state.showStateInfo || nextState.showMSAInfo !== this.state.showMSAInfo) {
        //     // this.setState({ isDataLoaded: false });
        //     console.log('shouldComponentUpdate true fetch state');
        //     // const { tablename, id } = nextProps.match.params;
        //     // this.fetchData(tablename, id);
        //     return true;
        // }
        // // if (nextState.isDataLoaded) {
        // //     console.log('shouldComponentUpdate true', nextProps, nextState);
        // //     return true;
        // // }
        // // console.log('shouldComponentUpdate false', nextState);
        // return false;
        return true;
    }

    handleStateClick = async geographyProps => {
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
    };

    handleMSAClick = async geographyProps => {
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
    };

    handleReset = () => {
        this.setState({
            state: null,
            showStateInfo: false,
            stateData: null,
            MSA: null,
            showMSAInfo: false,
            MSAData: null
        });
    };

    render() {
        const { tablename, id } = this.props.match.params;
        console.log('render', tablename, id);
        const { showStateInfo, showMSAInfo, state, stateData, MSA, MSAData } = this.state;
        return (
            <div>
                <CountryMap
                    onStateClick={this.handleStateClick}
                    onMSAClick={this.handleMSAClick}
                    onReset={this.handleReset}
                    tablename={tablename}
                    id={id}
                />
                <br />
                {showStateInfo ? <LocationData data={stateData} primaryTable="states" id={state.id} /> : null}
                {showMSAInfo ? <LocationData data={MSAData} primaryTable="metro_areas" id={MSA.id} /> : null}
            </div>
        );
    }
}

export default LocationInstancePage;
