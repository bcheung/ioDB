import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import {
    getModelRoutes,
    getModelLabelPlural,
    wageStats,
    salaryStats,
    employmentStats,
    formatterType
} from '../constants';
import { ExpandDataTable } from './ExpandDataTable';
import { FilterColumnComponent } from './FilterColumnComponent';

function filterNum(filter, row) {
    const { option, value } = filter.value;
    const rowValue = row._original[filter.id].value;
    if (value === '') {
        return true;
    }
    switch (option) {
        case 1:
            return rowValue >= value;
        case 2:
            return rowValue === value;
        case 3:
            return rowValue <= value;
        default:
            return true;
    }
}

function createColumns(joined, routingTable, population) {
    const columns = [
        {
            Header: getModelLabelPlural[routingTable],
            columns: [
                {
                    id: 'id', // Required because our accessor is not a string
                    Header: 'ID',
                    accessor: d => (joined ? d[routingTable].id : d.id),
                    width: 100,
                    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['id'] }),
                    filterAll: true
                },
                {
                    id: 'title',
                    Header: 'Title',
                    accessor: d => (joined ? d[routingTable].title : d.title),
                    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['title'] }),
                    filterAll: true
                }
            ]
        },
        {
            Header: 'Total',
            columns: [
                {
                    id: employmentStats.value,
                    Header: employmentStats.label,
                    accessor: `${employmentStats.value}.label`,
                    filterMethod: (filter, row) => filterNum(filter, row),
                    Filter: ({ filter, onChange }) => <FilterColumnComponent filter={filter} onChange={onChange} />
                }
                // ...(population
                //     ? [
                //           {
                //               Header: popStats.label,
                //               accessor: `${popStats.value}_label`,
                //               filterMethod: (filter, row) => filterRow(filter, row),
                //               Filter: ({ filter, onChange }) => (
                //                   <FilterColumnComponent filter={filter} onChange={onChange} />
                //               )
                //           }
                //       ]
                //     : [])
            ]
        },
        {
            Header: 'Wage',
            columns: [
                ...wageStats.map(column => ({
                    id: column.value,
                    Header: column.label,
                    accessor: `${column.value}.label`,
                    filterMethod: (filter, row) => filterNum(filter, row),
                    Filter: ({ filter, onChange }) => <FilterColumnComponent filter={filter} onChange={onChange} />
                }))
            ]
        },
        {
            Header: 'Salary',
            columns: [
                ...salaryStats.map(column => ({
                    id: column.value,
                    Header: column.label,
                    accessor: `${column.value}.label`,
                    filterMethod: (filter, row) => filterNum(filter, row),
                    Filter: ({ filter, onChange }) => <FilterColumnComponent filter={filter} onChange={onChange} />
                }))
            ]
        },
        {
            id: 'expand',
            expander: true,
            Header: () => <strong>More</strong>,
            width: 50,
            Expander: ({ isExpanded, ...rest }) => (
                <div>{isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}</div>
            ),
            style: {
                cursor: 'pointer',
                fontSize: 25,
                padding: '0',
                textAlign: 'center',
                userSelect: 'none'
            }
        }
    ];
    return columns;
}

const DataTable = props => {
    const { title, data, instanceTitle, primaryTable, routingTable, history, population, joined } = props;

    const columns = createColumns(joined, routingTable, population);
    let header;
    if (title) {
        header = title;
    } else if (routingTable) {
        header = `Other ${getModelLabelPlural[routingTable]} for ${instanceTitle}`;
    } else {
        header = `${getModelLabelPlural[primaryTable]}`;
    }
    return (
        <div style={{ padding: '1em' }}>
            <Row>
                <h1 style={{ margin: 'auto' }}>{header}</h1>
            </Row>
            <ReactTable
                data={data}
                columns={columns}
                filterable
                defaultFilterMethod={(filter, row) => {
                    console.log(row._original, filter);
                    return String(row._original[filter.id].value) === filter.value;
                }}
                className="-striped -highlight"
                showPagination={false}
                defaultPageSize={-1}
                style={{
                    height: '500px' // This will force the table body to overflow and scroll, since there is not enough room
                    // width: '1200px'
                }}
                history={history}
                getTdProps={(state, rowInfo, column, instance) => ({
                    onClick: (e, handleOriginal) => {
                        if (column.id !== 'expand') {
                            const route = getModelRoutes[routingTable];
                            const id = joined ? rowInfo.original[routingTable].id : rowInfo.original.id;
                            history.push(`/${route}/${routingTable}/${id}`);
                            // console.log('A Td Element was clicked!', handleOriginal);
                            // console.log('it produced this event:', e);
                            // console.log('It was in this column:', column);
                            // console.log('It was in this row:', rowInfo);
                            // console.log('It was in this table instance:', instance);
                        }
                        if (handleOriginal) {
                            handleOriginal();
                        }
                    }
                })}
                resolveData={tableData =>
                    tableData.map(row => {
                        const labels = {};
                        Object.keys(row).forEach(key => {
                            if (formatterType[key]) {
                                row[key] = { value: row[key], label: formatterType[key](row[key]) };
                            }
                        });
                        // console.log(row);

                        return row;
                    })
                }
                SubComponent={rowData => <ExpandDataTable data={rowData} />}
            />
        </div>
    );
};

const RoutingDataTable = withRouter(DataTable);

// Prop type validation
DataTable.propTypes = {
    joined: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            ])
        )
    ),
    instanceTitle: PropTypes.string,
    primaryTable: PropTypes.string,
    routingTable: PropTypes.string,
    history: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func, PropTypes.objectOf(PropTypes.string)])
    ),
    population: PropTypes.bool
};

export { RoutingDataTable };
