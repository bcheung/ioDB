import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { RoutingTopTenWidget } from '../../components/RoutingTopTenWidget';
import { getInstanceNames } from '../../constants';

class HomePage extends Component {
    render() {
        const { tablename } = this.props;
        const instanceName = getInstanceNames[tablename];
        return <Container>{<RoutingTopTenWidget primaryTable={tablename} />}</Container>;
    }
}

// Prop types validation
HomePage.propTypes = {
    tablename: PropTypes.string
};

export default HomePage;
