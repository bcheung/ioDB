import React, { Component } from 'react';
import CountryMap from '../../components/CountryMap';
import StateMap from '../../components/StateMap';

class LocationInstance extends Component {
  constructor() {
    super();
    this.state = {
      state: '',
    };

    this.handleStateClick = this.handleStateClick.bind(this);
  }
  handleStateClick(stateName) {
    this.setState({
      state: stateName,
      statePath: "../static/"+stateName+".json",
    });
    console.log(this.state.statePath);
  }

  render() {
    return (
      <div>
        <CountryMap onStateClick={this.handleStateClick} />
        {(this.state.state === '') ? null : <StateMap stateName={'../static/'+this.state.stateName} />}
      </div>
    );
  }
}

export default LocationInstance;
