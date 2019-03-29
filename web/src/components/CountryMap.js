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
import { Motion, spring } from "react-motion"
import stateData from '../static/usa-map.json';
import msaData from '../static/msa-map.json';

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
      detail: false,
      state: {
        name: '',
        initial: '',
        id: '',
      },
      MSA: '',
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleMSAClick = this.handleMSAClick.bind(this);
    this.handleStateClick = this.handleStateClick.bind(this);
    this.projection = this.projection.bind(this);
  }
  handleReset() {
    this.setState({
      center: [-97, 40],
      zoom: 1,
      detail: false,
      state: '',
    });
    this.props.onReset();
  }
  handleStateClick(geography) {
    console.log("State data: ", geography);
    const path = geoPath().projection(this.projection());
    const center = this.projection().invert(path.centroid(geography));
    let zoom;
    if(geography.properties.NAME_1 === "Alaska") {
      zoom = 2.5;
    } else if (geography.properties.NAME_1 === "Hawaii") {
      zoom = 4.7;
    } else {
      const bounds = path.bounds(geography);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      zoom = 0.1 / Math.max(dx / this.props.width, dy / this.props.height);
    }
    console.log(zoom);
    this.setState({
      center,
      zoom,
      detail: true,
      state: {
        name: geography.properties.NAME_1,
        initial: geography.properties.HASC_1.substring(geography.properties.HASC_1.length-2),
        id: geography.properties.ID,
      },
      MSA: {},
    });
    this.props.onStateClick(geography.properties);
  }
  handleMSAClick(geography) {
    console.log("MSA data: ", geography);
    this.setState({
      MSA: geography,
    });
    this.props.onMSAClick(geography);
  }
  projection() {
    return geoTimes()
      .translate([this.props.width/2, this.props.height/2])
      .scale(160);
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <button onClick={this.handleReset}>Reset</button>
        <Motion
          defaultStyle={{
            zoom: this.state.zoom,
            x: this.state.center[0],
            y: this.state.center[1],
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
          }}
          >
          {({zoom, x, y}) => (
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
              <ZoomableGroup center={[x,y]} zoom={zoom}>
                <Geographies geography={stateData} disableOptimization>
                  {(geographies, projection) =>
                    geographies.map((geography, i) =>
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={
                        (this.state.detail &&
                          this.state.state.id === geography.properties.ID
                          ? null : this.handleStateClick)
                      }
                      style={
                        (this.state.detail &&
                          this.state.state.id === geography.properties.ID)
                          ? {
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        } : {
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
                <Geographies geography={msaData} disableOptimization>
                  {(geographies, projection) =>
                    geographies.map((geography, i) => {
                    if(geography.properties.NAME.substring(geography.properties.NAME.length - 2) !== this.state.state.initial) {
                      return null;
                    }
                    return (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        onClick={this.handleMSAClick}
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
                  )}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      </div>
    );
  }
}

export default CountryMap;
