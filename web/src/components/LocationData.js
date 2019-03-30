import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, Table, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import './stylesheets/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { TopTenWidget, WageSalaryTable } from '.';
// picture of flag?

class LocationData extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const { data, primaryTable, id } = this.props;
        return (
            <Card className="container wage-data">
                <CardHeader>
                    <h1>{data.title}</h1>
                    <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                        <Col className="text-center">Total Population: {data.total_population}</Col>
                        <Col className="text-center">Total Employment: {data.total_employment}</Col>
                    </Row>
                </CardHeader>
                <br />
                <WageSalaryTable data={data} />
                <br />
                <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                    <div style={{ margin: 'auto' }}>
                        <Row>
                            <Col className="align-middle">
                                <h5>Top 10 Occupations by</h5>
                            </Col>
                        </Row>
                        <Row>
                            <h6>
                                <TopTenWidget
                                    joined
                                    primaryTable={primaryTable}
                                    secondaryTable="occupations_major"
                                    id={id}
                                    total_employment={data.total_employment}
                                />
                            </h6>
                        </Row>
                    </div>
                    {/* <BootstrapTable
            hover
            keyField='type'
            data={ data.occ.rows }
            columns={ data.occ.columns }
          /> */}
                </Row>
            </Card>
        );
    }
}

export default LocationData;
