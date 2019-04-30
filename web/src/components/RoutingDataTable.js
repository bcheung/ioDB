import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import ReactTable, { toggleRowSubComponent } from 'react-table';
import matchSorter from 'match-sorter';
import {
    stats,
    getModelRoutes,
    getInstanceNames,
    wageStats,
    salaryStats,
    employmentStats,
    popStats,
    formatterType
} from '../constants';
import { ExpandDataTable } from './ExpandDataTable';
import { WageSalaryTable } from './WageSalaryTable';
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

function createColumns(secondaryTable, population) {
    const columns = [
        {
            Header: getInstanceNames[secondaryTable],
            columns: [
                {
                    id: 'id', // Required because our accessor is not a string
                    Header: 'ID',
                    accessor: d => d[secondaryTable].id,
                    width: 100,
                    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['id'] }),
                    filterAll: true
                },
                {
                    id: 'title',
                    Header: 'Title',
                    accessor: d => d[secondaryTable].title,
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
    const { title, data, instanceTitle, primaryTable, secondaryTable, history, population } = props;

    const columns = createColumns(secondaryTable, population);
    let header;
    if (title) {
        header = title;
    } else if (secondaryTable) {
        header = `Other ${getInstanceNames[secondaryTable]} for ${instanceTitle}`;
    } else {
        header = `${getInstanceNames[primaryTable]}`;
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
                defaultPageSize={data.length}
                style={{
                    height: '500px' // This will force the table body to overflow and scroll, since there is not enough room
                    // width: '1200px'
                }}
                history={history}
                getTdProps={(state, rowInfo, column, instance) => ({
                    onClick: (e, handleOriginal) => {
                        if (column.id !== 'expand') {
                            const route = getModelRoutes[secondaryTable];
                            history.push(`/${route}/${secondaryTable}/${rowInfo.original[secondaryTable].id}`);

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

const styles = {
    divStyle: {}
};

const RoutingDataTable = withRouter(DataTable);
export { RoutingDataTable };

/* <div>
                                <select
                                    onChange={event => {
                                        const val = { option: event.target.value, value: filter.value.value };
                                        return onChange(val);
                                    }}
                                    style={{ width: '100%' }}
                                    value={filter ? filter.option : 'e'}
                                >
                                    <option value="gte">GreaterEqual</option>
                                    <option value="e">Equal</option>
                                    <option value="lte">Less Equal </option>
                                </select>
                                <input
                                    value={filter.value}
                                    onChange={event => {
                                        const val = { option: filter.value.option, value: event.target.value };
                                        return onChange(val);
                                    }}
                                />
                            </div> */
