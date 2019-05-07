import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { WageSalaryTable } from './WageSalaryTable';
import { RoutingTopTenWidget } from './RoutingTopTenWidget';

class ComparisonLocation extends Component {
    render() {
        const { instance_1, instance_2, selectedInstance_1, selectedInstance_2, selectedModel } = this.props;
        console.log('Comparison location props', this.props);
        return (
            <div>
                <Row>
                    <Col>
                        <h2>{instance_1.data.title}</h2>
                    </Col>
                    <Col>
                        <h2>{instance_2.data.title}</h2>
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
                            id={selectedInstance_1.id}
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
                            id={selectedInstance_2.id}
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
