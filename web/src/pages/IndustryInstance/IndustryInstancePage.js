import React, { Component } from 'react';
import { Container, Col, Card } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './industry-instance-page.css';
import { isMajorModel } from '../../constants';
import {
    RoutingDataTable,
    SpecificInstanceList,
    RoutingTopTenWidget,
    WageSalaryTable,
    InstanceInfo,
    LoadingComponent
} from '../../components';

class IndustryInstancePage extends Component {
    state = {
        industryData: null,
        occupationData: null,
        isDataLoaded: false
    };

    componentDidMount() {
        const { match } = this.props;
        const { tablename, id } = match.params;
        this.fetchData(tablename, id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { match } = this.props;
        if (
            nextProps.match.params.tablename !== match.params.tablename ||
            nextProps.match.params.id !== match.params.id
        ) {
            this.setState({ isDataLoaded: false });
            console.log('shouldComponentUpdate false fetch', nextProps.match.params.tablename);
            const { tablename, id } = nextProps.match.params;
            this.fetchData(tablename, id);
            return false;
        }
        if (nextState.isDataLoaded !== this.state.isDataLoaded) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        console.log('shouldComponentUpdate false', nextState);
        return false;
    }

    fetchData = async (tablename, id) => {
        console.log('fetchData', tablename, id);
        const industryData = await fetchInstanceData(tablename, id);
        const occupationData = await fetchJoinedInstanceData(tablename, 'occupations_major', id);

        this.setState({
            industryData,
            occupationData,
            isDataLoaded: true
        });
    };

    renderDetailedInstanceList = () => {
        const { match } = this.props;
        const { tablename } = match.params;
        const { industryData } = this.state;

        if (industryData) {
            return <SpecificInstanceList majorModel={tablename} data={industryData.industries_4d} />;
        }
    };

    render() {
        console.log('render');
        const { match } = this.props;
        const { tablename, id } = match.params;
        const { isDataLoaded, occupationData, industryData, collapse } = this.state;

        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        if (isDataLoaded) {
            return (
                <Container>
                    <Col>
                        <InstanceInfo idLabel="NAICS Code" tablename={tablename} data={industryData} />
                        {isMajorModel[tablename] && industryData ? (
                            <SpecificInstanceList
                                label="Show Specific Industries List"
                                majorModel={tablename}
                                data={industryData.industries_4d}
                            />
                        ) : null}
                        <br />
                        <Card className="container wage-data">
                            <br />
                            {<WageSalaryTable data={industryData} />}
                            <br />
                        </Card>
                        <RoutingTopTenWidget
                            joined
                            instanceTitle={industryData.title}
                            primaryTable={tablename}
                            secondaryTable="occupations_major"
                            id={id}
                            totalEmployment={industryData.total_employment}
                        />
                        <RoutingDataTable
                            joined
                            data={occupationData}
                            instanceTitle={industryData.title}
                            primaryTable={tablename}
                            routingTable="occupations_major"
                        />
                    </Col>
                </Container>
            );
        }
        return <LoadingComponent />;
    }
}

// Prop type validation: checking if tablename and id are of type string
IndustryInstancePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tablename: PropTypes.string,
            id: PropTypes.string
        })
    })
};

export default IndustryInstancePage;
