import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Select from 'react-select';
import { fetchTopTenData, fetchJoinedTopTenData } from '../fetchAPI';
import { stats, statsWithPop } from '../constants';
import { Bar } from 'react-chartjs-2';

let labelArray = [];
let dataArray = [];
let instanceData = {};

class TopTenWidget extends Component {

    state = {
        selectedColumn: stats[0],
        data: null
    };

    componentDidMount() {
        this.fetchStats();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.tablename1 !== this.props.tablename1
            || prevProps.id !== this.props.id) {
            console.log('componentDidUpdate', prevProps.tablename1, this.props.tablename1);
            this.fetchStats();
        }
    }

    updateGraph = data => {
        const { tablename2 } = this.props;
        const { selectedColumn } = this.state;
        data.forEach(instance => {
            labelArray.push(instance[tablename2].title);
            dataArray.push(instance[selectedColumn.value]);
        });


        instanceData = {
            labels: labelArray,
            datasets: [
                {
                    label: selectedColumn.label,
                    backgroundColor: 'rgba(255,99,132,1)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: dataArray
                }
            ]
        }
    }

    handleColumnChange = selectedColumn => {
        console.log('handleColumnChange', selectedColumn);
        this.setState({ selectedColumn });
        this.fetchStats();
    };

    fetchStats() {
        labelArray = [];
        dataArray = [];
        instanceData = {};
        const { selectedColumn } = this.state;
        console.log(selectedColumn);
        const { joined, tablename1 } = this.props;

        if (joined) {
            const { tablename2, keyModel, id } = this.props;
            fetchJoinedTopTenData(tablename1, tablename2, keyModel, id, selectedColumn.value).then(data => {
                this.updateGraph(data);
                this.setState({ data });
                console.log(data);
            });
        } else {
            fetchTopTenData(tablename1, selectedColumn.value).then(data => {
                this.updateGraph(data);
                this.setState({ data });
                console.log(data);
            });
        }
    }

    render() {
        const { selectedColumn } = this.state;
        const { population } = this.props;
        let options = stats;
        if (population) {
            options = statsWithPop;
        }
        return (
            <div>
                <div style={[styles.dropDown, { margin: 'auto' }]}>
                    <Select
                        className="dropDown"
                        options={options}
                        // defaultValue={options[0]}
                        value={selectedColumn}
                        onChange={this.handleColumnChange}
                        isSearchable={false}
                    />
                </div>
                <Bar
                    data={instanceData}
                    width={900}
                    height={500}
                />
            </div>
        );
    }
}

const styles = {
    dropDown: {
        width: 250
    }
};

export { TopTenWidget };
