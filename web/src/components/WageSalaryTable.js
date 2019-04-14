import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const WageSalaryTable = ({ data }) => {
    const tableData = getTableData(data);

    return (
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <h1 style={{ margin: 'auto' }}>Wage and Salary Statistics</h1>
            <BootstrapTable hover keyField="type" data={tableData.rows} columns={tableData.columns} />
        </Row>
    );
};

const styles = {
    style: {}
};

export { WageSalaryTable };

const wageFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const salaryFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

function formatWage(wage) {
    const formattedWage = wageFormatter.format(wage);
    if (wage === 100) {
        return `≥ ${formattedWage}`;
    }
    return formattedWage;
}

function formatSalary(salary) {
    const formattedSalary = salaryFormatter.format(salary);
    if (salary === 208000) {
        return `≥ ${formattedSalary}`;
    }
    return formattedSalary;
}

function getTableData(data) {
    return {
        title: data.title,
        total_employment: data.total_employment,
        columns: [
            {
                dataField: 'type',
                text: 'Type'
            },
            {
                dataField: 'mean',
                text: 'Mean'
            },
            {
                dataField: 'median',
                text: 'Median'
            },
            {
                dataField: '10',
                text: '10th Percentile'
            },
            {
                dataField: '25',
                text: '25th Percentile'
            },
            {
                dataField: '75',
                text: '75th Percentile'
            },
            {
                dataField: '90',
                text: '90th Percentile'
            }
        ],
        rows: [
            {
                type: 'Annual Salary',
                mean: formatSalary(data.annual_mean),
                median: formatSalary(data.annual_median),
                '10': formatSalary(data.annual_10),
                '25': formatSalary(data.annual_25),
                '75': formatSalary(data.annual_75),
                '90': formatSalary(data.annual_90)
            },
            {
                type: 'Hourly Wage',
                mean: formatWage(data.hourly_mean),
                median: formatWage(data.hourly_median),
                '10': formatWage(data.hourly_10),
                '25': formatWage(data.hourly_25),
                '75': formatWage(data.hourly_75),
                '90': formatWage(data.hourly_90)
            }
        ]
    };
}
