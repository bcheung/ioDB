import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoAlbersUsa } from "d3-geo";
import geoData from '../static/usa-map.json';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class CountryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-97, 40],
      zoom: 1,
    }
    this.handleStateClick = this.handleStateClick.bind(this);
  }
  handleStateClick(geography) {
    console.log("Geo data: ", geography);
    this.props.onStateClick(geography.properties);
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
            <Geographies geography={geoData} disableOptimization>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  onClick={this.handleStateClick}
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
    );
  }
}

export default CountryMap;
