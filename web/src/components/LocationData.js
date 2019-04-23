import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, Table, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import './stylesheets/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { RoutingTopTenWidget, WageSalaryTable } from '.';
// picture of flag?
import { RoutingDataTable } from './RoutingDataTable';
import { formatNum } from '../constants';

class LocationData extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const { instanceData, primaryTable, id, occData } = this.props;
        return (
            <Card className="container wage-instanceData">
                <CardHeader>
                    <h1>{instanceData.title}</h1>
                    <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <Col className="text-center">Total Employment: {formatNum(instanceData.total_employment)}</Col>
                        {primaryTable === 'metro_areas' ? null : (
                            <Col className="text-center">
                                Total Population: {formatNum(instanceData.total_population)}
                            </Col>
                        )}
                    </Row>
                </CardHeader>
                <br />
                <WageSalaryTable data={instanceData} />
                <br />

                <RoutingTopTenWidget
                    joined
                    instanceTitle={instanceData.title}
                    primaryTable={primaryTable}
                    secondaryTable="occupations_major"
                    id={id}
                    totalEmployment={instanceData.total_employment}
                />
                <RoutingDataTable
                    data={occData}
                    instanceTitle={instanceData.title}
                    primaryTable={primaryTable}
                    secondaryTable="occupations_major"
                />
            </Card>
        );
    }
}

export default LocationData;
