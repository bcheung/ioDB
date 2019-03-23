import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: '',
    };

    this.handleStateClick = (stateName) => {
      this.setState({state: stateName});
    };
  }
  
  render() {
    return (
      <div>
          <CountryMap onStateClick={this.handleStateClick} />
      </div>
    );
  }
}

export default LocationInstance;
