import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { scaleLinear } from 'd3-scale';
import { Button } from 'reactstrap';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';
import { Motion, spring } from 'react-motion';
import stateData from '../static/usa-map.json';
import msaData from '../static/msa-map.json';
import { getModelRoutes } from '../constants';

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
            zoom: 1
        };
    }

    componentDidMount() {
        setTimeout(() => {
            ReactTooltip.rebuild();
        }, 100);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate CountryMap', this.state);
        if (nextProps.data !== this.props.data) {
            console.log('true data', nextProps.data);
            return true;
        }
        return false;
    }

    handleStateClick = geography => {};

    projection = () =>
        geoTimes()
            .translate([this.props.width / 2, this.props.height / 2])
            .scale(160);

    // renderGeography = () => {};

    render() {
        const { width, height, data, history } = this.props;
        const { zoom, center } = this.state;
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
                                console.log('geographies', geographies, data);
                                const statesData = data.reduce((obj, item) => {
                                    obj[item.states.id] = item;
                                    return obj;
                                }, {});
                                console.log(statesData);
                                const stateGeos = {};
                                const stateGeoArr = geographies.map((stateGeo, i) => {
                                    stateGeos[stateGeo.properties.ID] = stateGeo;
                                    const stateData = statesData[stateGeo.properties.ID];
                                    let tip = stateGeo.properties.NAME_1;
                                    let defaultFill = '#ECEFF1';
                                    let hoverFill = '#ECEFF1';
                                    if (stateData) {
                                        tip += `\n${stateData.jobs_1000}`;
                                        defaultFill = popScale(stateData.loc_quotient);
                                        hoverFill = hoverScale(stateData.loc_quotient);
                                    }
                                    return (
                                        <Geography
                                            key={i}
                                            data-tip={tip}
                                            geography={stateGeo}
                                            projection={projection}
                                            onClick={geography => {
                                                console.log('clicked: ', geography);
                                                const route = getModelRoutes.states;
                                                history.push(`/${route}/states/${geography.properties.ID}`);
                                            }}
                                            onMouseEnter={event => {
                                                console.log('mouse entered:', event);
                                            }}
                                            style={{
                                                default: {
                                                    fill: defaultFill,
                                                    stroke: '#607D8B',
                                                    strokeWidth: 0.75,
                                                    outline: 'none'
                                                },
                                                hover: {
                                                    fill: hoverFill,
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
                                            }}
                                        />
                                    );
                                });
                                this.setState({ stateGeos });
                                return stateGeoArr;
                            }}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <ReactTooltip />
            </div>
        );
    }
}

const RoutingChoroplethMap = withRouter(ChoroplethMap);
export { RoutingChoroplethMap };
