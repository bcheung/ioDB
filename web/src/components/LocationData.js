import React, { Component } from 'react';
import { 
  Container, 
  Row,
  Col,
  CardHeader,
  Table,
  Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import './stylesheets/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// picture of flag?

class LocationData extends Component {
  render() {
    return (
      <Card className="container wage-data">
        <CardHeader>
          <h1>{this.props.data.title}</h1>
          <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <Col className="text-center">Total Population: {this.props.data.total_population}</Col>
            <Col className="text-center">Total Employment: {this.props.data.total_employment}</Col>
          </Row>
        </CardHeader>
        <br/>
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
          <h5 style={{ margin: 'auto' }}>Salary and Wage Statistics</h5>
          <BootstrapTable
            hover
            keyField='type'
            data={ this.props.data.rows }
            columns={ this.props.data.columns }
          />
        </Row>
        <br/>
        {/* <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
          <h5 style={{ margin: 'auto' }}>Top 10 Occupations</h5>
          <BootstrapTable
            hover
            keyField='type'
            data={ this.props.data.occ.rows }
            columns={ this.props.data.occ.columns }
          />
        </Row> */}
      </Card>
    );
  }
}

export default LocationData;