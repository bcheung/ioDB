import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { PropTypes } from 'prop-types';
import CountryMap from '../../components/CountryMap';
import LocationData from '../../components/LocationData';
import { fetchInstanceData, fetchJoinedTopTenData, fetchJoinedInstanceData } from '../../fetchAPI';

class LocationInstancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: null,
            showStateInfo: false,
            stateData: null,
            stateOccData: null,
            MSA: null,
            showMSAInfo: false,
            MSAData: null,
            msaOccData: null
        };
    }

    handleStateClick = async geographyProps => {
        const stateInitial = geographyProps.HASC_1.substring(geographyProps.HASC_1.length - 2);
        const stateData = await fetchInstanceData('states', geographyProps.ID);
        const stateOccData = await fetchJoinedInstanceData('states', 'occupations_major', geographyProps.ID);

        this.setState({
            state: {
                name: geographyProps.NAME_1,
                initial: stateInitial,
                id: geographyProps.ID
            },
            showStateInfo: true,
            stateData,
            stateOccData,
            showMSAInfo: false
        });
        console.log('handleStateClick', stateData);
    };

    handleMSAClick = async geographyProps => {
        const stateInitial = geographyProps.NAME.substring(geographyProps.NAME.length - 2);

        const MSAData = await fetchInstanceData('metro_areas', geographyProps.GEOID);
        if (MSAData) {
            const msaOccData = await fetchJoinedInstanceData('metro_areas', 'occupations_major', geographyProps.GEOID);
            if (Object.keys(MSAData).length === 0) {
                return null;
            }

            this.setState({
                MSA: {
                    name: geographyProps.NAME,
                    initial: stateInitial,
                    id: geographyProps.GEOID
                },
                showMSAInfo: true,
                MSAData,
                msaOccData
            });
        }
    };

    handleReset = () => {
        this.setState({
            state: null,
            showStateInfo: false,
            stateData: null,
            MSA: null,
            showMSAInfo: false,
            MSAData: null
        });
    };

    render() {
        const { match } = this.props;
        const { tablename, id } = match.params;
        const { showStateInfo, showMSAInfo, state, stateData, stateOccData, MSA, MSAData, msaOccData } = this.state;
        console.log('render', tablename, id, stateData);
        return (
            <Container>
                <CountryMap
                    onStateClick={this.handleStateClick}
                    onMSAClick={this.handleMSAClick}
                    onReset={this.handleReset}
                    tablename={tablename}
                    id={id}
                    metroAreas={stateData ? stateData.metro_areas : null}
                />
                <br />
                {showMSAInfo ? (
                    <LocationData instanceData={MSAData} occData={msaOccData} primaryTable="metro_areas" id={MSA.id} />
                ) : null}
                {showStateInfo ? (
                    <LocationData instanceData={stateData} occData={stateOccData} primaryTable="states" id={state.id} />
                ) : null}
            </Container>
        );
    }
}

// Prop type validation: checking if tablename and id are of type string
LocationInstancePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tablename: PropTypes.string,
            id: PropTypes.string
        })
    })
};

export default LocationInstancePage;
