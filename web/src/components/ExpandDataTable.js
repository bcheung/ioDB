import React, { Component } from 'react';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { formatSalary, formatWage } from '../constants';

const ExpandDataTable = ({ data }) => {
    const tableData = getTableData(data);
    console.log('table data', data);

    return (
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <BootstrapTable hover keyField="type" data={tableData.rows} columns={tableData.columns} />
        </Row>
    );
};

const styles = {
    style: {}
};

export { ExpandDataTable };

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
                dataField: '10',
                text: '10th Percentile'
            },
            {
                dataField: '25',
                text: '25th Percentile'
            },
            {
                dataField: 'median',
                text: 'Median'
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
                mean: data.original.annual_mean.label,
                median: data.original.annual_median.label,
                '10': data.original.annual_10.label,
                '25': data.original.annual_25.label,
                '75': data.original.annual_75.label,
                '90': data.original.annual_90.label
            },
            {
                type: 'Hourly Wage',
                mean: data.original.hourly_mean.label,
                median: data.original.hourly_median.label,
                '10': data.original.hourly_10.label,
                '25': data.original.hourly_25.label,
                '75': data.original.hourly_75.label,
                '90': data.original.hourly_90.label
            }
        ]
    };
}
