import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Conditionally display Bar or Pie Chart depending on property passed
// What property is actually passed?

class BarComponent extends Component {
    static defaultProps = {
        data: {}
    };
    // Apparently there's a state where we keep all of the data

    // Constuctor runs when component is initialzied
    constructor(props) {
        super(props); // Pass properties to compnents(idk what properties)
        // Like things such as height
        // so when we call this component we can pass in height like such:
        // <Chart height="200"/>

        // to create state

        // My question is how do we pass in values to the state

        // NOTE: Apparently, we should have blank data inbetween labels and datasets when
        // passing in actual data?

        // NEED TO UNDERSTAND:

        /** 1. Distinguishing which chart component to create
         *
         * We need to understand how to distinguish between which chart component to make
         * pie, line, or bar, when passed in a property
         * so essentially we need an if and else statement in this constructor
         *
         * 2. Passing in the data from the parent into the state data[DONE]
         * We need to figure out how to take data passed in from parent and into the data
         */
        this.state = {
            data: {}
        };
        // this.setState({ data: props.data });
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

export { BarComponent };
