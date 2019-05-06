import React, { Component } from 'react';
import { WageSalaryTable } from './WageSalaryTable';
import { RoutingTopTenWidget } from './RoutingTopTenWidget';
import { Row, Col } from 'reactstrap';

class ComparisonLocation extends Component {
    render() {
        const { instance_1, instance_2,
            selectedInstance_1, selectedInstance_2, selectedModel
        } = this.props;
        return (
            <div>
                <Row>
                    <Col><h2>{instance_1.data.title}</h2></Col>
                    <Col><h2>{instance_2.data.title}</h2></Col>
                </Row>
                <Row>
                    <Col><WageSalaryTable data={instance_1.data} /></Col>
                    <Col><WageSalaryTable data={instance_2.data} /></Col>
                </Row>
                <Row>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_1.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="occupations_major"
                        id={selectedInstance_1.id}
                        totalEmployment={instance_1.data.total_employment}
                    /></Col>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_2.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="occupations_major"
                        id={selectedInstance_2.id}
                        totalEmployment={instance_2.data.total_employment}
                    /></Col>
                </Row>
            </div>
        );
    }
}

export default ComparisonLocation;