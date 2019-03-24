import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoAlbersUsa } from "d3-geo";

class StateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 0],
      zoom: 1,
      geoData: null,
    }
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }
  componentWillUpdate() {
    const { path } = this.props.stateName;
    console.log(path);
    import(`${path}`).then(file => this.setState({geoData: file.default}));
  }
  handleAreaClick(geography) {
    console.log("Geo data: ", geography);
    
  }
  render() {
    return (
      <div className="map-container">
        <ComposableMap
          projection={geoAlbersUsa}
          projectionConfig={{ scale: 1000 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={this.state.center} zoom={this.state.zoom} disablePanning>
            <Geographies geography={this.state.geoData} disableOptimization>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  onClick={this.handleAreaClick}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#CFD8DC",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default StateMap;