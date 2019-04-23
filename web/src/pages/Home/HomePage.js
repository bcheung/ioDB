import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { RoutingTopTenWidget } from '../../components/RoutingTopTenWidget';
import { getInstanceNames } from '../../constants';

class HomePage extends Component {
    render() {
        const { tablename } = this.props;
        const instanceName = getInstanceNames[tablename];
        return <Container>{<RoutingTopTenWidget primaryTable={tablename} />}</Container>;
    }
}

export default HomePage;
