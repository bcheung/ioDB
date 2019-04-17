import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchTopTenData, fetchJoinedTopTenData } from '../fetchAPI';
import { groupedStats, statsWithPop, graphType, popStats, getModelRoutes } from '../constants';

class TopTenWidget extends Component {
    state = {
        instanceData: {},
        selectedColumn: groupedStats[0],
        isPieGraph: false,
        data: null
    };

    componentDidMount() {
        this.fetchStats();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.primaryTable !== this.props.primaryTable ||
            prevProps.id !== this.props.id ||
            prevState.selectedColumn !== this.state.selectedColumn
        ) {
            console.log('componentDidUpdate', prevProps.primaryTable, this.props.primaryTable);
            this.fetchStats();
        }
    }

    updateGraph = (data, joined) => {
        console.log(data);
        const labelArray = [];
        const dataArray = [];
        let instanceData = {};
        const { secondaryTable, totalEmployment } = this.props;
        const { selectedColumn } = this.state;
        console.log('updateGraph selectedColumn', selectedColumn, data);
        const isPieGraph = graphType[selectedColumn.value].graph === 'pie';
        let sum = 0;
        if (joined) {
            data.forEach(instance => {
                labelArray.push(instance[secondaryTable].title);
                dataArray.push(instance[selectedColumn.value]);
                if (isPieGraph) {
                    sum += instance[selectedColumn.value];
                }
            });
        } else {
            data.forEach(instance => {
                labelArray.push(instance.title);
                dataArray.push(instance[selectedColumn.value]);
                if (isPieGraph) {
                    sum += instance[selectedColumn.value];
                }
            });
        }

        if (isPieGraph) {
            labelArray.push('Other');
            dataArray.push(totalEmployment - sum);
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
        this.setState({ data, instanceData, isPieGraph });
    };

    handleColumnChange = selectedColumn => {
        console.log('handleColumnChange', selectedColumn);
        this.setState({ selectedColumn });
        // this.fetchStats();
    };

    handleClick = elems => {
        if (elems.length > 0) {
            const { data } = this.state;
            const { primaryTable, secondaryTable, history, joined } = this.props;

            const index = elems[0]._index;
            if (index < data.length) {
                const instance = data[index];

                console.log(elems);
                if (joined) {
                    const route = getModelRoutes[secondaryTable];
                    history.push(`/${route}/${secondaryTable}/${instance[secondaryTable].id}`);
                } else {
                    const route = getModelRoutes[primaryTable];
                    history.push(`/${route}/${primaryTable}/${instance.id}`);
                }
            }
        }
    };

    fetchStats() {
        const { selectedColumn } = this.state;
        console.log(selectedColumn);
        const { joined, primaryTable } = this.props;

        if (joined) {
            const { secondaryTable, id } = this.props;
            fetchJoinedTopTenData(primaryTable, secondaryTable, id, selectedColumn.value).then(data => {
                this.updateGraph(data, joined);
                // this.setState({ data });
            });
        } else {
            fetchTopTenData(primaryTable, selectedColumn.value).then(data => {
                this.updateGraph(data, joined);
                // this.setState({ data });
            });
        }
    }

    render() {
        const { selectedColumn, instanceData, isPieGraph } = this.state;
        const { title, population } = this.props;
        let options = groupedStats;
        if (population) {
            options = [popStats, ...groupedStats];
        }
        return (
            <Container>
                <Row>
                    <h1 style={{ margin: 'auto' }}>{title}</h1>
                </Row>
                <Row>
                    <Col>
                        <Select
                            className="dropDown"
                            options={options}
                            // defaultValue={options[0]}
                            value={selectedColumn}
                            onChange={this.handleColumnChange}
                            isSearchable={false}
                        />
                    </Col>
                </Row>
                <Row>
                    {isPieGraph ? (
                        <Doughnut
                            onElementsClick={elems => this.handleClick(elems)}
                            data={instanceData}
                            width={600}
                            height={600}
                        />
                    ) : (
                        <Bar
                            onElementsClick={elems => this.handleClick(elems)}
                            data={instanceData}
                            width={900}
                            height={500}
                        />
                    )}
                </Row>
            </Container>
        );
    }
}

const styles = {
    containerStyle: {
        width: 250,
        margin: 30
    }
};

const RoutingTopTenWidget = withRouter(TopTenWidget);

export { RoutingTopTenWidget };
