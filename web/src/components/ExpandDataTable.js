import React from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { wageSalaryTableColumns } from '../constants';

function getTableData(data) {
    console.log('table data', data);
    return {
        title: data.title,
        total_employment: data.total_employment,
        columns: wageSalaryTableColumns,
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

const ExpandDataTable = ({ data }) => {
    const tableData = getTableData(data);
    return (
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <BootstrapTable hover keyField="type" data={tableData.rows} columns={tableData.columns} />
        </Row>
    );
};

// Prop type validation: checking if title and total_employment are of type string
// and checking if array of salary and mean data are objects of strings or numbers
ExpandDataTable.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        total_employment: PropTypes.string,
        original: PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            ])
        )
    })
};

export { ExpandDataTable };
