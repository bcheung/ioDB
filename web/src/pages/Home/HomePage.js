import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { TopTenWidget } from '../../components/TopTenWidget';
import { getInstanceNames } from '../../constants';

class HomePage extends Component {
    render() {
        const { tablename } = this.props;
        const instanceName = getInstanceNames[tablename];
        return <Container>{<TopTenWidget title={`Top 10 ${instanceName} by`} primaryTable={tablename} />}</Container>;
    }
}

export default HomePage;
