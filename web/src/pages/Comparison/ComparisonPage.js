import React, { Component } from 'react';
import { modelOptions } from '../../constants';
import { RoutingComparisonBar } from '../../components/RoutingComparisonBar';

class ComparisonPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedModel: modelOptions[0]
        };
    }

    setSelectedModel = selectedModel => {
        this.setState({ selectedModel });
    };

    render() {
        const { selectedModel } = this.state;
        return (
            <RoutingComparisonBar
                modelOptions={modelOptions}
                selectedModel={selectedModel}
                setSelectedModel={this.setSelectedModel}
            />
        );
    }
}

export default ComparisonPage;
