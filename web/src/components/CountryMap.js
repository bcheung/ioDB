import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsa } from 'd3-geo';
import { geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';
import { Motion, spring } from 'react-motion';
import stateData from '../static/usa-map.json';
import msaData from '../static/msa-map.json';

const wrapperStyles = {
    width: '100%',
    maxWidth: 980,
    margin: '0 auto'
};

class CountryMap extends Component {
    static defaultProps = {
        width: 980,
        height: 551
    };

    constructor(props) {
        super(props);
        this.state = {
            initial: {
                tablename: props.tablename !== undefined ? props.tablename : '',
                id: props.id !== undefined ? props.id : ''
            },
            center: [-97, 40],
            zoom: 1,
            detail: false,
            state: {
                name: '',
                initial: '',
                id: ''
            },
            MSA: {
                name: '',
                initial: '',
                id: ''
            },
            stateGeo: null,
            stateGeos: null
        };
    }

    // componentDidMount() {
    //   console.log(this.props);
    //   if(this.props.id !== undefined) {
    //     if(this.props.id !== this.state.state.id && this.props.id !== this.state.MSA.id) {
    //       this.setState({
    //         initial: {
    //           tablename: this.props.tablename,
    //           id: this.props.id,
    //         },
    //       });
    //     }
    //   }
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate CountryMap', this.state);
        if (nextProps.tablename !== this.props.tablename || nextProps.id !== this.props.id) {
            // this.setState({ isDataLoaded: false });
            console.log('false props', nextProps.id);
            // const { tablename, id } = nextProps.match.params;
            // this.fetchData(tablename, id);
            // this.setState({
            //     initial: {
            //         tablename: nextProps.tablename !== undefined ? nextProps.tablename : '',
            //         id: nextProps.id !== undefined ? nextProps.id : ''
            //     }
            // });
            const { stateGeos } = this.state;
            this.handleStateClick(stateGeos[nextProps.id]);
            return false;
        }
        // if (
        //     nextState.initial.tablename !== this.state.initial.tablename ||
        //     nextState.initial.id !== this.state.initial.id
        // ) {
        //     // this.setState({ isDataLoaded: false });
        //     console.log('true state', nextState.initial.id);
        //     // const { tablename, id } = nextProps.match.params;
        //     // this.fetchData(tablename, id);

        //     return true;
        // }
        // if (nextState.stateGeo !== this.state.stateGeo) {
        //     console.log('false stateGeo', nextState.stateGeo);
        //     this.handleStateClick(nextState.stateGeo);
        //     return false;
        // }
        if (nextState.zoom !== this.state.zoom) {
            console.log('true zoom', nextState.zoom);
            return true;
        }
        // if (nextState.showStateInfo !== this.state.showStateInfo || nextState.showMSAInfo !== this.state.showMSAInfo) {
        //     // this.setState({ isDataLoaded: false });
        //     console.log('shouldComponentUpdate true fetch state');
        //     // const { tablename, id } = nextProps.match.params;
        //     // this.fetchData(tablename, id);
        //     return true;
        // }
        // // if (nextState.isDataLoaded) {
        // //     console.log('shouldComponentUpdate true', nextProps, nextState);
        // //     return true;
        // // }
        // // console.log('shouldComponentUpdate false', nextState);
        // return false;
        return false;
    }

    handleReset = () => {
        this.setState({
            center: [-97, 40],
            zoom: 1,
            detail: false,
            state: ''
        });
        this.props.onReset();
    };

    handleStateClick = geography => {
        console.log('State data: ', geography);
        const path = geoPath().projection(this.projection());
        const center = this.projection().invert(path.centroid(geography));
        let zoom;
        if (geography.properties.NAME_1 === 'Alaska') {
            zoom = 2.5;
        } else if (geography.properties.NAME_1 === 'Hawaii') {
            zoom = 4.7;
        } else {
            const bounds = path.bounds(geography);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            zoom = 0.07 / Math.max(dx / this.props.width, dy / this.props.height);
        }
        console.log(zoom);
        this.setState({
            center,
            zoom,
            detail: true,
            state: {
                name: geography.properties.NAME_1,
                initial: geography.properties.HASC_1.substring(geography.properties.HASC_1.length - 2),
                id: geography.properties.ID
            },
            MSA: {}
        });
        this.props.onStateClick(geography.properties);
    };

    handleMSAClick = geography => {
        console.log('MSA data: ', geography);
        this.setState({
            MSA: {
                name: geography.properties.NAME,
                initial: geography.properties.NAME.substring(geography.properties.NAME.length - 2),
                id: geography.properties.GEOID
            }
        });
        this.props.onMSAClick(geography.properties);
    };

    projection = () =>
        geoTimes()
            .translate([this.props.width / 2, this.props.height / 2])
            .scale(160);

    render() {
        console.log('render countrymap', this.state.initial.id);
        return (
            <div style={wrapperStyles}>
                <button onClick={this.handleReset}>Reset</button>
                <Motion
                    defaultStyle={{
                        zoom: this.state.zoom,
                        x: this.state.center[0],
                        y: this.state.center[1]
                    }}
                    style={{
                        zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
                        x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
                        y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
                    }}
                >
                    {({ zoom, x, y }) => (
                        <ComposableMap
                            projection={geoAlbersUsa}
                            projectionConfig={{ scale: 1000 }}
                            width={this.props.width}
                            height={this.props.height}
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        >
                            <ZoomableGroup center={[x, y]} zoom={zoom}>
                                <Geographies geography={stateData}>
                                    {(geographies, projection) => {
                                        console.log('geographies', geographies);
                                        const stateGeos = {};
                                        this.setState({ stateGeos });
                                        return geographies.map((stateGeo, i) => {
                                            stateGeos[stateGeo.properties.ID] = stateGeo;
                                            if (this.state.initial.id === stateGeo.properties.ID) {
                                                this.setState({ stateGeo });
                                                this.handleStateClick(stateGeo);
                                            }
                                            return (
                                                <Geography
                                                    key={i}
                                                    geography={stateGeo}
                                                    projection={projection}
                                                    onClick={
                                                        this.state.detail &&
                                                        this.state.state.id === stateGeo.properties.ID
                                                            ? null
                                                            : this.handleStateClick
                                                    }
                                                    style={
                                                        this.state.detail &&
                                                        this.state.state.id === stateGeo.properties.ID
                                                            ? {
                                                                  default: {
                                                                      fill: '#ECEFF1',
                                                                      stroke: '#607D8B',
                                                                      strokeWidth: 0.75,
                                                                      outline: 'none'
                                                                  }
                                                              }
                                                            : {
                                                                  default: {
                                                                      fill: '#ECEFF1',
                                                                      stroke: '#607D8B',
                                                                      strokeWidth: 0.75,
                                                                      outline: 'none'
                                                                  },
                                                                  hover: {
                                                                      fill: '#CFD8DC',
                                                                      stroke: '#607D8B',
                                                                      strokeWidth: 0.75,
                                                                      outline: 'none'
                                                                  },
                                                                  pressed: {
                                                                      fill: '#FF5722',
                                                                      stroke: '#607D8B',
                                                                      strokeWidth: 0.75,
                                                                      outline: 'none'
                                                                  }
                                                              }
                                                    }
                                                />
                                            );
                                        });
                                    }}
                                </Geographies>
                                <Geographies geography={msaData} disableOptimization>
                                    {(geographies, projection) =>
                                        geographies.map((geography, i) => {
                                            if (
                                                geography.properties.NAME.substring(
                                                    geography.properties.NAME.length - 2
                                                ) !== this.state.state.initial
                                            ) {
                                                return null;
                                            }
                                            if (this.state.initial.id === geography.properties.GEOID) {
                                                this.handleMSAClick(geography);
                                            }
                                            return (
                                                <Geography
                                                    key={i}
                                                    geography={geography}
                                                    projection={projection}
                                                    onClick={this.handleMSAClick}
                                                    style={{
                                                        default: {
                                                            fill: '#a8c6f7',
                                                            stroke: '#607D8B',
                                                            strokeWidth: 0.75,
                                                            outline: 'none'
                                                        },
                                                        hover: {
                                                            fill: '#8ca6d1',
                                                            stroke: '#607D8B',
                                                            strokeWidth: 0.75,
                                                            outline: 'none'
                                                        },
                                                        pressed: {
                                                            fill: '#FF5722',
                                                            stroke: '#607D8B',
                                                            strokeWidth: 0.75,
                                                            outline: 'none'
                                                        }
                                                    }}
                                                />
                                            );
                                        })
                                    }
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
