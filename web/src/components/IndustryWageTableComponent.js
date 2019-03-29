import React from 'react';

const IndustryWageTableComponent = ({ data: { industries } }) => {
    const industryHeaders = industries.headers.map(col => <th>{col}</th>);
    const industryData = industries.values.map(row => (
        <tr>
            <td>{row[0]}</td>
            <td>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(row[1])}
            </td>
        </tr>
    ));

    return (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
            <tr>{industryHeaders}</tr>
            {industryData}
        </table>
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

export { IndustryWageTableComponent };
