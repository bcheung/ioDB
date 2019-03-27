import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import axios from 'axios';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: '',
      showStateInfo: false,
      stateData: {},
      MSA: '',
      showMSAInfo: false,
      MSAData: {},
    };

    this.handleStateClick = this.handleStateClick.bind(this);
    this.handleMSAClick = this.handleMSAClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  async handleStateClick(geographyProps) {
    let stateID = geographyProps.HASC_1.substring(geographyProps.HASC_1.length-2);

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://www.iodb.info/api/instance/states/'+stateID;
    
    // await fetch(`${proxyurl}${url}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ stateData: data });
    //   });
    // const response = await axios.get(`${url}`);

    const response = await fetch(`${proxyurl}${url}`);
    const data = await response.json();
    console.log(data);

    this.setState({
      state: {
        name: geographyProps.NAME_1,
        id: stateID,
      },
      showStateInfo: true,
      stateData: data,
    });

    console.log(this.state.state.stateData);
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
      state: '',
      showStateInfo: false,
      stateData: {},
      MSA: '',
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
        {this.state.showStateInfo ? this.state.stateData.annual_10 : null}
      </div>
    );
  }
}

export default LocationInstance;
