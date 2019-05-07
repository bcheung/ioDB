import React from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { formatSalary, formatWage, wageSalaryTableColumns } from '../constants';

function getTableData(data) {
    return {
        title: data.title,
        total_employment: data.total_employment,
        columns: wageSalaryTableColumns,
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

const WageSalaryTable = ({ data }) => {
    const tableData = getTableData(data);
    console.log('wage salary table', data);
    return (
        <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <h1 style={{ margin: 'auto' }}>Wage and Salary Statistics</h1>
            <BootstrapTable hover keyField="type" data={tableData.rows} columns={tableData.columns} />
        </Row>
    );
};

// Prop types validation
WageSalaryTable.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
        ])
    )
};

export { WageSalaryTable };
