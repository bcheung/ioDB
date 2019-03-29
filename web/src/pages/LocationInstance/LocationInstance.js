import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import LocationData from '../../components/LocationData';
import { fetchInstanceData } from '../../fetchAPI';

class LocationInstance extends Component {
  constructor(props) {
    super(props);
    const { tablename, id } = props.match.params;
    this.state = {
      initial: {
        tablename,
        id,
      },
      state: {
        name: '',
        initial: '',
        id: '',
      },
      showStateInfo: false,
      stateData: {},
      MSA: {
        name: '',
        initial: '',
        id: '',
      },
      showMSAInfo: false,
      MSAData: {},
    };

    this.handleStateClick = this.handleStateClick.bind(this);
    this.handleMSAClick = this.handleMSAClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  async handleStateClick(geographyProps) {

    const stateInitial = geographyProps.HASC_1.substring(geographyProps.HASC_1.length-2);
        // await fetch(`${proxyurl}${urlNAME}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //     this.setState({ stateData: data });
        //   });
        // const response = await axios.get(`${url}`);

    const data = await fetchInstanceData('states', geographyProps.ID);

    // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    // const url = 'http://www.iodb.info/api/instance/states/'+geographyProps.ID;

    // const response = await axios.get(`${url}`);
    // const response = await axios.get(`${proxyurl}${url}`);
    // const data = response.data;

    // console.log(response);
    // console.log(data);
    const stateData = {
      title: data.title,
      total_population: data.total_population,
      total_employment: data.total_employment,
      columns: [{
        dataField: 'type',
        text: 'Type',
      },{
        dataField: 'mean',
        text: 'Mean',
      },{
        dataField: 'median',
        text: 'Median',
      },{
        dataField: '10',
        text: '10th Percentile',
      },{
        dataField: '25',
        text: '25th Percentile',
      },{
        dataField: '75',
        text: '75th Percentile',
      },{
        dataField: '90',
        text: '90th Percentile',
      }],
      rows: [{
        type: 'Annual Salary',
        mean: data.annual_mean,
        median: data.annual_median,
        '10': data.annual_10,
        '25': data.annual_25,
        '75': data.annual_75,
        '90': data.annual_90,
      },{
        type: 'Hourly Wage',
        mean: data.hourly_mean,
        median: data.hourly_median,
        '10': data.hourly_10,
        '25': data.hourly_25,
        '75': data.hourly_75,
        '90': data.hourly_90,
      }]
    };

    this.setState({
      state: {
        name: geographyProps.NAME_1,
        initial: stateInitial,
        id: geographyProps.ID,
      },
      showStateInfo: true,
      stateData: stateData,
      showMSAInfo: false,
    });

    // console.log(this.state.state.stateData);
  }
  async handleMSAClick(geographyProps) {
    let stateInitial = geographyProps.NAME.substring(geographyProps.NAME.length-2);

    const data = await fetchInstanceData('metro_areas', geographyProps.GEOID);
    // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    // const url = 'http://www.iodb.info/api/instance/metro_areas/'+geographyProps.GEOID;

    // const response = await axios.get(`${url}`);
    // const response = await axios.get(`${proxyurl}${url}`);
    // const data = response.data;

    if(Object.keys(data).length === 0) {
      return null;
    }

    const MSAData = {
      title: data.title,
      total_population: data.total_population,
      total_employment: data.total_employment,
      columns: [{
        dataField: 'type',
        text: 'Type',
      },{
        dataField: 'mean',
        text: 'Mean',
      },{
        dataField: 'median',
        text: 'Median',
      },{
        dataField: '10',
        text: '10th Percentile',
      },{
        dataField: '25',
        text: '25th Percentile',
      },{
        dataField: '75',
        text: '75th Percentile',
      },{
        dataField: '90',
        text: '90th Percentile',
      }],
      rows: [{
        type: 'Annual Salary',
        mean: data.annual_mean,
        median: data.annual_median,
        '10': data.annual_10,
        '25': data.annual_25,
        '75': data.annual_75,
        '90': data.annual_90,
      },{
        type: 'Hourly Wage',
        mean: data.hourly_mean,
        median: data.hourly_median,
        '10': data.hourly_10,
        '25': data.hourly_25,
        '75': data.hourly_75,
        '90': data.hourly_90,
      }]
    };

    // console.log(response);
    // console.log(data);
    this.setState({
      MSA: {
        name: geographyProps.NAME,
        initial: stateInitial,
        id: geographyProps.GEOID,
      },
      showMSAInfo: true,
      MSAData: MSAData,
    })
  }
  handleReset() {
    this.setState({
      state: {},
      showStateInfo: false,
      stateData: {},
      MSA: {},
      showMSAInfo: false,
      MSAData: {},
    });
  }

  render() {
    return (
      <div>
        {console.log(this.state.initial.tablename, this.state.initial.id)}
        <CountryMap 
          onStateClick={this.handleStateClick} 
          onMSAClick={this.handleMSAClick} 
          onReset={this.handleReset}
          tablename={this.state.initial.tablename}
          id={this.state.initial.id}
        />
        {/* <state info component></state>
        <msa info component></msa> */}
        <br/>
        {this.state.showStateInfo ? <LocationData data={this.state.stateData} /> : null}
        {this.state.showMSAInfo ? <LocationData data={this.state.MSAData} /> : null}
      </div>
    );
  }
}

export default LocationInstance;
