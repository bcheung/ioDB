import React, { Component } from 'react';
import Select from 'react-select';
import { Container } from 'reactstrap';
import { stats, statsWithPop } from '../constants';

const StatsDropdown = ({ value = stats[0], onChange, population = false }) => {
    let options = stats;
    if (population) {
        options = statsWithPop;
    }
    return (
        <Container style={styles.containerStyle}>
            <Select
                className="dropDown"
                options={options}
                defaultValue={options[0]}
                value={value}
                onChange={onChange}
                isSearchable={false}
            />
        </Container>
    );
};

const styles = {
    containerStyle: {
        width: 250
    }
};

export { StatsDropdown };
