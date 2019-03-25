import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import StateMap from '../../components/StateMap';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: '',
      showMsa: false,
    };

    this.handleStateClick = this.handleStateClick.bind(this);
  }
  handleStateClick(geographyProps) {
    this.setState({
      state: {
        name: geographyProps.NAME_1,
        id: geographyProps.HASC_1.substring(geographyProps.HASC_1.length-2),
      },
      showMsa: true,
    });
  }

  render() {
    return (
      <div>
        <CountryMap onStateClick={this.handleStateClick} />
        {(!this.state.showMsa) ? null : <StateMap area={this.state.state} />}
      </div>
    );
  }
}

export default LocationInstance;
