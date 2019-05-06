import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './industry-instance-page.css';
import { isMajorModel } from '../../constants';
import {
    RoutingDataTable,
    DetailedInstanceList,
    RoutingTopTenWidget,
    WageSalaryTable,
    InstanceInfo,
    LoadingComponent
} from '../../components';

class IndustryInstancePage extends Component {
    state = {
        industryData: null,
        occupationData: null,
        isDataLoaded: false,
        collapse: false
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        this.fetchData(tablename, id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.match.params.tablename !== this.props.match.params.tablename ||
            nextProps.match.params.id !== this.props.match.params.id
        ) {
            this.setState({ isDataLoaded: false });
            console.log('shouldComponentUpdate false fetch', nextProps.match.params.tablename);
            const { tablename, id } = nextProps.match.params;
            this.fetchData(tablename, id);
            return false;
        }
        if (nextState.isDataLoaded) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        console.log('shouldComponentUpdate false', nextState);
        return false;
    }

    // Handles toggle button for collapsible detailed occupations list
    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    };

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
        const { tablename } = this.props.match.params;
        const { industryData } = this.state;

        if (industryData) {
            return <DetailedInstanceList majorModel={tablename} data={industryData.industries_4d} />;
        }
    };

    render() {
        console.log('render');
        const { tablename, id } = this.props.match.params;
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
                        <InstanceInfo
                            title={industryData.title}
                            idLabel="NAICS Code"
                            id={industryData.id}
                            totalEmployment={industryData.total_employment}
                            description={industryData.description}
                        />
                        {isMajorModel[tablename] && industryData ? (
                            <DetailedInstanceList
                                collapse={collapse}
                                label="Show Specific Industries List"
                                onClick={this.toggle}
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

export default IndustryInstancePage;
