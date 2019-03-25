import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { geoAlbersUsa } from "d3-geo";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";
import geoData from '../static/usa-map.json';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class CountryMap extends Component {
  static defaultProps = {
    width: 980,
    height: 551,
  }
  constructor(props) {
    super(props);
    this.state = {
      center: [-97, 40],
      zoom: 1,
    }
    this.handleStateClick = this.handleStateClick.bind(this);
    this.projection = this.projection.bind(this);
  }
  handleStateClick(geography) {
    console.log("Geo data: ", geography);
    const path = geoPath().projection(this.projection());
    const center = this.projection().invert(path.centroid(geography));
    // const bounds = path.bounds(geography);
    // const dx = bounds[1][0] - bounds[0][0];
    // const dy = bounds[1][1] - bounds[0][1];
    // const zoom = 0.9 / Math.max(dx / this.props.width, dy / this.props.height);
    this.setState({
      center,
      zoom: 2,
    });
    this.props.onStateClick(geography.properties);
  }
  projection() {
    return geoTimes()
      .translate([this.props.width/2, this.props.height/2])
      .scale(160);
  }

  render() {
    return (
      <div className="map-container">
        <ComposableMap
          projection={geoAlbersUsa}
          projectionConfig={{ scale: 1000 }}
          width={this.props.width}
          height={this.props.height}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
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
