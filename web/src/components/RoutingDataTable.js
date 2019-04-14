import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable, { toggleRowSubComponent } from 'react-table';
import matchSorter from 'match-sorter';
import { stats, getModelRoutes, getInstanceNames } from '../constants';
import { WageSalaryTable } from './WageSalaryTable';

function createColumns(secondaryTable) {
    const columns = [
        {
            Header: getInstanceNames[secondaryTable],
            columns: [
                {
                    id: 'id', // Required because our accessor is not a string
                    Header: 'ID',
                    accessor: d => d[secondaryTable].id,
                    width: 75
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
            Header: 'Wage and Salary Stats',
            columns: [
                ...stats.map(column => ({
                    Header: column.label,
                    accessor: column.value
                })),
                {
                    id: 'expand',
                    expander: true,
                    Header: () => <strong>More Stats</strong>,
                    width: 100,
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
            ]
        }
    ];
    return columns;
}

const DataTable = props => {
    const { data, secondaryTable, history } = props;

    const columns = createColumns(secondaryTable);

    return (
        <div>
            <ReactTable
                data={data}
                columns={columns}
                filterable
                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
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

                            console.log('A Td Element was clicked!', handleOriginal);
                            console.log('it produced this event:', e);
                            console.log('It was in this column:', column);
                            console.log('It was in this row:', rowInfo);
                            console.log('It was in this table instance:', instance);
                        }
                        if (handleOriginal) {
                            handleOriginal();
                        }
                    }
                })}
                SubComponent={rowData => <WageSalaryTable data={rowData} />}
            />
        </div>
    );
};

const styles = {
    divStyle: {}
};

const RoutingDataTable = withRouter(DataTable);
export { RoutingDataTable };
