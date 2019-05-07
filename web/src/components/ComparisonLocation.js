import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'reactstrap';
import { RoutingTopTenWidget } from './RoutingTopTenWidget';
import { WageSalaryTable } from './WageSalaryTable';
import { LinkedTitle } from './LinkedTitle';

class ComparisonLocation extends Component {
    render() {
        const { instance_1, instance_2, selectedModel } = this.props;
        return (
            <div>
                <Row>
                    <Col>
                        <LinkedTitle
                            id={instance_1.data.id}
                            title={instance_1.data.title}
                            tablename={selectedModel.tablename}
                        />
                    </Col>
                    <Col>
                        <LinkedTitle
                            id={instance_2.data.id}
                            title={instance_2.data.title}
                            tablename={selectedModel.tablename}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <WageSalaryTable data={instance_1.data} />
                    </Col>
                    <Col>
                        <WageSalaryTable data={instance_2.data} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RoutingTopTenWidget
                            pieWidth={600}
                            pieHeight={600}
                            barWidth={500}
                            barHeight={500}
                            joined
                            instanceTitle={instance_1.data.title}
                            primaryTable={selectedModel.tablename}
                            secondaryTable="occupations_major"
                            id={instance_1.data.id}
                            totalEmployment={instance_1.data.total_employment}
                        />
                    </Col>
                    <Col>
                        <RoutingTopTenWidget
                            pieWidth={600}
                            pieHeight={600}
                            barWidth={500}
                            barHeight={500}
                            joined
                            instanceTitle={instance_2.data.title}
                            primaryTable={selectedModel.tablename}
                            secondaryTable="occupations_major"
                            id={instance_2.data.id}
                            totalEmployment={instance_2.data.total_employment}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

// prop types validation
ComparisonLocation.propTypes = {
    instance_1: PropTypes.shape({
        data: PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
                PropTypes.objectOf(PropTypes.string)
            ])
        )
    }),
    instance_2: PropTypes.shape({
        data: PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
                PropTypes.objectOf(PropTypes.string)
            ])
        )
    }),
    selectedModel: PropTypes.objectOf(PropTypes.string)
};

export default ComparisonLocation;
