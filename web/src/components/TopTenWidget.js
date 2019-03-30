import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Select from 'react-select';
import { fetchTopTenData, fetchJoinedTopTenData } from '../fetchAPI';
import { stats, statsWithPop } from '../constants';

class TopTenWidget extends Component {
    state = {
        selectedColumn: stats[0],
        data: null
    };

    componentDidMount() {
        this.fetchStats();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tablename1 !== this.props.tablename1) {
            console.log('componentDidUpdate', prevProps.tablename1, this.props.tablename1);
            this.fetchStats();
        }
    }

    handleColumnChange = selectedColumn => {
        console.log('handleColumnChange', selectedColumn);
        this.setState({ selectedColumn });

        this.fetchStats();
    };

    fetchStats() {
        const { selectedColumn } = this.state;
        const { joined, tablename1 } = this.props;

        if (joined) {
            const { tablename2, keyModel, id } = this.props;
            fetchJoinedTopTenData(tablename1, tablename2, keyModel, id, selectedColumn.value).then(data => {
                this.setState({ data });
            });
        } else {
            fetchTopTenData(tablename1, selectedColumn.value).then(data => {
                this.setState({ data });
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
            <div style={styles.dropDown}>
                <Select
                    className="dropDown"
                    options={options}
                    // defaultValue={options[0]}
                    value={selectedColumn}
                    onChange={this.handleColumnChange}
                    isSearchable={false}
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
