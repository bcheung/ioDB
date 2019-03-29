import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const OccupationComponent = ({ data: { info, percentile, industries, states, metropolitan } }) => {
    const percentileHeaders = percentile.headers.map(percent => <th>{percent}%</th>);
    const percentileData = percentile.values.map(amount => (
        <td>
            {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount)}
        </td>
    ));
    const industryHeaders = industries.headers.map(col => <th>{col}</th>);
    const industryData = industries.values.map(row => (
        <tr>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[3])}
            </td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[4])}
            </td>
        </tr>
    ));
    const stateHeaders = states.headers.map(col => <th>{col}</th>);
    const stateData = states.values.map(row => (
        <tr>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[4])}
            </td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[5])}
            </td>
        </tr>
    ));
    const metroHeaders = metropolitan.headers.map(col => <th>{col}</th>);
    const metroData = metropolitan.values.map(row => (
        <tr>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[4])}
            </td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[5])}
            </td>
        </tr>
    ));
    return (
        <div style={styles.divStyle} className="OccupationComponent">
            <header style={styles.headerStyle} className="OccupationComponent-header">
                {info.occupation} {info.naics}
            </header>
            <body>{info.description}</body>
            <body>{info.meanWage}</body>
            <br />
            <table>
                <th colSpan="5">{percentile.title}</th>
                <tr>{percentileHeaders}</tr>
                <tr>{percentileData}</tr>
            </table>
            <br />
            <table>
                <tr>{industryHeaders}</tr>
                {industryData}
            </table>
            <br />
            <table>
                <tr>{stateHeaders}</tr>
                {stateData}
            </table>
            <br />
            <table>
                <tr>{metroHeaders}</tr>
                {metroData}
            </table>
        </div>
    );
};

const styles = {
    divStyle: {
        flexDirection: 'column',
        alignContent: 'center',
        alignSelf: 'center',
        align: 'center',
        width: 1000
    },
    headerStyle: {}
};

export { OccupationComponent };
