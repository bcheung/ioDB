import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps"
import { geoAlbersUsa } from "d3-geo";
import { Motion, spring } from "react-motion"
import geoData from '../static/usa-states.json'

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
    // this.handleZoomIn = this.handleZoomIn.bind(this);
    // this.handleZoomOut = this.handleZoomOut.bind(this);
    // this.handleStateClick = this.handleStateClick.bind(this);
    this.handleStateClick = (geography) => {
      console.log("Geo data: ", geography);
      this.props.onStateClick(geography.properties.NAME_1);
    }
  }


  render() {
    return (
      <div className="map-container">
        {/* <Motion
          defaultStyle={{
            zoom: 1,
            x: -97,
            y: 40,
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness:210, damping: 20}),
            y: spring(this.state.center[1], {stiffness:210, damping: 20}),
          }}
          >
          {({zoom,x,y}) => ( */}
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
              <ZoomableGroup center={[ -97, 40 ]} disablePanning zoom={1}>
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
          {/* )}
        </Motion> */}
      </div>
    );
  }
}

export default CountryMap;
