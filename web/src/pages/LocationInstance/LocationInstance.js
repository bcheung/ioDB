import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: '',
      showStateInfo: false,
      MSA: '',
      showMSAInfo: false,
    };

    this.handleStateClick = this.handleStateClick.bind(this);
    this.handleMSAClick = this.handleMSAClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleStateClick(geographyProps) {
    this.setState({
      state: {
        name: geographyProps.NAME_1,
        id: geographyProps.HASC_1.substring(geographyProps.HASC_1.length-2),
      },
      showStateInfo: true,
    });
  }
  handleMSAClick(geographyProps) {
    this.setState({
      MSA: {

      },
      showMSAInfo: true,
    })
  }
  handleReset() {

  }

  render() {
    return (
      <div>
        {/* <some title/header component/> */}
        <CountryMap 
          onStateClick={this.handleStateClick} 
          onMSAClick={this.handleMSAClick} 
          onReset={this.handlReset}
        />
        {/* <state info component></state>
        <msa info component></msa> */}
      </div>
    );
  }
}

export default LocationInstance;
