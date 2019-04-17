import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

// Conditionally display Bar or Pie Chart depending on property passed
// What property is actually passed?

export default class BarComponent extends Component {
    static defaultProps = {
        data: {}
    };
    // Apparently there's a state where we keep all of the data

    // Constuctor runs when component is initialzied
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            test: false
        };
    }

    getChartData = canvas => {
        const { data } = this.state;

        return data;
    };

    /** Once we know which chart component to make, we need to have an if and else statement
     * in here in order to display that exact component
     */
    render() {
        const { data } = this.props;
        return (
            <div style={{ position: 'relative', width: 600, height: 550 }}>
                <Bar
                    // this data will call the data in the state
                    options={{
                        responsive: true
                    }}
                    data={data}
                />
            </div>
        );
    }
}
