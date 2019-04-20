import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { scaleLinear } from 'd3-scale';
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

// Finding the maximum loc_quotient value for this locationData set
function getMaxLocQuotient(locationData) {
    let maxLocQuotient = 0;
    console.log('locationData array quotient calculation', locationData);
    locationData.forEach(stateData => {
        if (stateData.loc_quotient > maxLocQuotient) {
            maxLocQuotient = stateData.loc_quotient;
        }
    });
    return maxLocQuotient;
}

class ChoroplethMap extends Component {
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
            }
        };
    }

    componentDidMount() {
        setTimeout(() => {
            ReactTooltip.rebuild();
        }, 100);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate CountryMap', this.state);

        // if (nextProps.tablename !== this.props.tablename || nextProps.id !== this.props.id) {
        //     console.log('false props', nextProps.id);
        //     const { stateGeos } = this.state;
        //     this.handleStateClick(stateGeos[nextProps.id]);
        //     return false;
        // }
        if (nextState.state !== this.state.state) {
            console.log('true state', nextState.state);
            return true;
        }
        if (nextProps.data !== this.props.data) {
            console.log('true data', nextProps.data);
            return true;
        }
        return false;
    }

    handleReset = () => {
        const { onReset } = this.props;

        this.setState({
            center: [-97, 40],
            zoom: 0.05,
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
            }
        });

        onStateClick(geography.properties);
    };

    projection = () =>
        geoTimes()
            .translate([this.props.width / 2, this.props.height / 2])
            .scale(160);

    render() {
        const { width, height, data } = this.props;
        const { zoom, center, state, detail } = this.state;
        const maxquotient = getMaxLocQuotient(data);
        const popScale = scaleLinear()
            .domain([0, maxquotient / 2, maxquotient])
            .range(['#FFFF84', '#FF8084', '#FF0084']);

        const hoverScale = scaleLinear()
            .domain([0, maxquotient / 2, maxquotient])
            .range(['#FFFF9D', '#FF999D', '#FF339D']);

        console.log('THIS IS THE DATA', data);
        return (
            <div style={wrapperStyles}>
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
                    <ZoomableGroup disablePanning>
                        <Geographies geography={stateData} disableOptimization>
                            {(geographies, projection) => {
                                console.log('geographies', geographies);
                                const stateGeos = {};
                                this.setState({ stateGeos });
                                return geographies.map((stateGeo, i) => {
                                    stateGeos[stateGeo.properties.ID] = stateGeo;
                                    const tip = `${stateGeo.properties.NAME_1}\n${data[i].jobs_1000}`;
                                    return (
                                        <Geography
                                            key={i}
                                            data-tip={tip}
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
                                                              fill: popScale(data[i].loc_quotient),
                                                              // fill: '#ECEFF1',
                                                              stroke: '#607D8B',
                                                              strokeWidth: 0.75,
                                                              outline: 'none'
                                                          },
                                                          hover: {
                                                              fill: hoverScale(data[i].loc_quotient),
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
                    </ZoomableGroup>
                </ComposableMap>
                <ReactTooltip />
            </div>
        );
    }
}

export { ChoroplethMap };
