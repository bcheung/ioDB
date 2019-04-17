import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Button } from 'reactstrap';
import { geoAlbersUsa, geoPath } from 'd3-geo';
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

    componentDidMount() {
        setTimeout(() => {
            ReactTooltip.rebuild();
        }, 100);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate CountryMap', this.state);

        if (nextProps.tablename !== this.props.tablename || nextProps.id !== this.props.id) {
            console.log('false props', nextProps.id);
            const { stateGeos } = this.state;
            this.handleStateClick(stateGeos[nextProps.id]);
            return false;
        }
        if (nextState.state !== this.state.state) {
            console.log('true state', nextState.state);
            return true;
        }
        return false;
    }

    handleReset = () => {
        const { onReset } = this.props;

        this.setState({
            center: [-97, 40],
            zoom: 1,
            detail: false,
            state: ''
        });
        onReset();
    };

    handleStateClick = geography => {
        console.log('State data: ', geography);
        const { width, height, onStateClick } = this.props;

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
            zoom = 0.07 / Math.max(dx / width, dy / height);
            if (zoom > 8) {
                zoom = 8;
            }
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

        onStateClick(geography.properties);
    };

    handleMSAClick = geography => {
        console.log('MSA data: ', geography);

        const { onMSAClick } = this.props;

        this.setState({
            MSA: {
                name: geography.properties.NAME,
                initial: geography.properties.NAME.substring(geography.properties.NAME.length - 2),
                id: geography.properties.GEOID
            }
        });
        onMSAClick(geography.properties);
    };

    projection = () =>
        geoTimes()
            .translate([this.props.width / 2, this.props.height / 2])
            .scale(160);

    render() {
        const { width, height, id, tablename } = this.props;
        const { zoom, center, state, detail } = this.state;

        console.log('render countrymap', id);

        return (
            <div style={wrapperStyles}>
                <Button onClick={this.handleReset}>Reset</Button>
                <Motion
                    defaultStyle={{
                        zoom,
                        x: center[0],
                        y: center[1]
                    }}
                    style={{
                        zoom: spring(zoom, { stiffness: 210, damping: 20 }),
                        x: spring(center[0], { stiffness: 210, damping: 20 }),
                        y: spring(center[1], { stiffness: 210, damping: 20 })
                    }}
                >
                    {({ mapZoom, x, y }) => (
                        <ComposableMap
                            projection={geoAlbersUsa}
                            projectionConfig={{ scale: 1000 }}
                            width={width}
                            height={height}
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        >
                            <ZoomableGroup center={[x, y]} zoom={mapZoom}>
                                <Geographies geography={stateData}>
                                    {(geographies, projection) => {
                                        console.log('geographies', geographies);
                                        const stateGeos = {};
                                        this.setState({ stateGeos });
                                        return geographies.map((stateGeo, i) => {
                                            stateGeos[stateGeo.properties.ID] = stateGeo;
                                            if (id === stateGeo.properties.ID) {
                                                this.setState({ stateGeo });
                                                this.handleStateClick(stateGeo);
                                            }
                                            return (
                                                <Geography
                                                    key={i}
                                                    data-tip={stateGeo.properties.NAME_1}
                                                    geography={stateGeo}
                                                    projection={projection}
                                                    onClick={
                                                        detail && state.id === stateGeo.properties.ID
                                                            ? null
                                                            : this.handleStateClick
                                                    }
                                                    onMouseEnter={event => {
                                                        console.log(event);
                                                    }}
                                                    style={
                                                        detail && state.id === stateGeo.properties.ID
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
                                                                      fill: '#8294a5',
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
                                        geographies.map((msaGeo, i) => {
                                            if (
                                                msaGeo.properties.NAME.substring(msaGeo.properties.NAME.length - 2) !==
                                                state.initial
                                            ) {
                                                return null;
                                            }
                                            if (id === msaGeo.properties.GEOID) {
                                                this.handleMSAClick(msaGeo);
                                            }
                                            return (
                                                <Geography
                                                    key={i}
                                                    geography={msaGeo}
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
                <ReactTooltip />
            </div>
        );
    }
}

export default CountryMap;
