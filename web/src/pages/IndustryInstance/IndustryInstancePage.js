import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './industry-instance-page.css';
import { isMajorModel } from '../../constants';
import { DetailedInstanceList, TopTenWidget, WageSalaryTable, InstanceInfo } from '../../components';

class IndustryInstancePage extends Component {
    state = {
        industryData: null,
        occupationData: null,
        isDataLoaded: false
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
        const { occupationData, industryData } = this.state;

        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        return (
            <Container>
                <Row>
                    {isMajorModel[tablename] ? this.renderDetailedInstanceList() : null}

                    <Col>
                        <Row>
                            {industryData ? (
                                <InstanceInfo
                                    title={industryData.title}
                                    idLabel="Occupation Code"
                                    id={industryData.id}
                                />
                            ) : null}
                        </Row>
                        <br />
                        <Card className="container wage-data">
                            <br />
                            {industryData ? <WageSalaryTable data={industryData} /> : null}
                            <br />
                            {industryData ? (
                                <TopTenWidget
                                    joined
                                    title="Top 10 Occupations by"
                                    primaryTable={tablename}
                                    secondaryTable="occupations_major"
                                    id={id}
                                    total_employment={industryData.total_employment}
                                />
                            ) : null}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default IndustryInstancePage;
