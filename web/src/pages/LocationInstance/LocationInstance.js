import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import axios from 'axios';
import LocationData from '../../components/LocationData';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: {
        name: '',
        initial: '',
        id: '',
      },
      showStateInfo: false,
      stateData: {},
      MSA: {},
      showMSAInfo: false,
      MSAData: {},
    };

    this.handleStateClick = this.handleStateClick.bind(this);
    this.handleMSAClick = this.handleMSAClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  async handleStateClick(geographyProps) {
    let stateInitial = geographyProps.HASC_1.substring(geographyProps.HASC_1.length-2);

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://www.iodb.info/api/instance/states/'+geographyProps.ID;
    
    // await fetch(`${proxyurl}${url}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ stateData: data });
    //   });
    // const response = await axios.get(`${url}`);

    const response = await axios.get(`${proxyurl}${url}`);
    const data = response.data;
    // console.log(response);
    // console.log(data);
    const table = {
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
      stateData: table,
    });

    // console.log(this.state.state.stateData);
  }
  handleMSAClick(geographyProps) {
    this.setState({
      MSA: {

      },
      showMSAInfo: true,
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
        {/* <some title/header component/> */}
        <CountryMap 
          onStateClick={this.handleStateClick} 
          onMSAClick={this.handleMSAClick} 
          onReset={this.handleReset}
        />
        {/* <state info component></state>
        <msa info component></msa> */}
        <br/>
        {this.state.showStateInfo ? <LocationData data={this.state.stateData} /> : null}
      </div>
    );
  }
}

export default LocationInstance;
