import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

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
                mean: data.annual_mean,
                median: data.annual_median,
                '10': data.annual_10,
                '25': data.annual_25,
                '75': data.annual_75,
                '90': data.annual_90
            },
            {
                type: 'Hourly Wage',
                mean: data.hourly_mean,
                median: data.hourly_median,
                '10': data.hourly_10,
                '25': data.hourly_25,
                '75': data.hourly_75,
                '90': data.hourly_90
            }
        ]
    };
}

const WageSalaryTable = ({ data }) => {
    const tableData = getTableData(data);

    return (
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <h5 style={{ margin: 'auto' }}>Wage and Salary Statistics</h5>
            <BootstrapTable hover keyField="type" data={tableData.rows} columns={tableData.columns} />
        </Row>
    );
};

const styles = {
    style: {}
};

export { WageSalaryTable };
