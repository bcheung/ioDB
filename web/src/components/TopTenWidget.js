import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Select from 'react-select';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchTopTenData, fetchJoinedTopTenData } from '../fetchAPI';
import { stats, statsWithPop, graphType } from '../constants';

let labelArray = [];
let dataArray = [];
let instanceData = {};
let isPieGraph = false;

class TopTenWidget extends Component {
    state = {
        selectedColumn: stats[0],
        data: null
    };

    componentDidMount() {
        this.fetchStats();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.tablename1 !== this.props.tablename1 ||
            prevProps.id !== this.props.id ||
            prevState.selectedColumn !== this.state.selectedColumn
        ) {
            console.log('componentDidUpdate', prevProps.tablename1, this.props.tablename1);
            this.fetchStats();
        }
    }

    updateGraph = data => {
        const { tablename2, total_employment } = this.props;
        const { selectedColumn } = this.state;
        isPieGraph = graphType[selectedColumn.value].graph === 'pie';
        let sum = 0;
        data.forEach(instance => {
            labelArray.push(instance[tablename2].title);
            dataArray.push(instance[selectedColumn.value]);
            if (isPieGraph) {
                sum += instance[selectedColumn.value];
            }
        });

        if (isPieGraph) {
            labelArray.push('Other');
            dataArray.push(total_employment - sum);
            instanceData = {
                labels: labelArray,
                datasets: [
                    {
                        label: selectedColumn.label,
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(252,135,186,1)',
                            'rgba(186,198,230,1)',
                            'rgba(250,225,201,1)',
                            'rgba(165,216,255,1)',
                            'rgba(255,188,201,1)',
                            'rgba(203,247,237,1)',
                            'rgba(160,155,229,1)',
                            'rgba(140,237,167,1)',
                            'rgba(252,246,189,1)',
                            'rgba(57,122,215,1)'
                        ],
                        data: dataArray
                    }
                ]
            };
        } else {
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
            };
        }
    };

    handleColumnChange = selectedColumn => {
        console.log('handleColumnChange', selectedColumn);
        this.setState({ selectedColumn });
        // this.fetchStats();
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
                {isPieGraph ? (
                    <Doughnut data={instanceData} width={600} height={600} />
                ) : (
                    <Bar data={instanceData} width={900} height={500} />
                )}
            </div>
        );
    }
}

const styles = {
    containerStyle: {
        width: 250,
        margin: 30
    }
};

export { TopTenWidget };
