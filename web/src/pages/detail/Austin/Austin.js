import React, { Component } from 'react';
import './location1.css';

class Austin extends Component {
    render() {
        return (
            <div className="Page">
                <header className="Page-header" />
                <body>
                    <h2>Austin-Round Rock, TX</h2>
                    <p>Annual Mean: $51,840</p>
                    <p>Occupations</p>

                    <table>
                        <tr>
                            <th>Occupation</th>
                            <th>SOC</th>
                            <th>Employment</th>
                            <th>Annual Mean</th>
                            <th>Location Quotient</th>
                        </tr>
                        <tr>
                            <td>Office and Administrative Support Occupations</td>
                            <td>430000</td>
                            <td>175300</td>
                            <td>38780</td>
                            <td>1.14</td>
                        </tr>

                        <tr>
                            <td>Sales and Related Occupations</td>
                            <td>410000</td>
                            <td>113350</td>
                            <td>47860</td>
                            <td>1.12</td>
                        </tr>

                        <tr>
                            <td>Food Preparation and Serving Related Occupations</td>
                            <td>350000</td>
                            <td>107270</td>
                            <td>25080</td>
                            <td>1.16</td>
                        </tr>

                        <tr>
                            <td>Business and Financial Operations Occupations</td>
                            <td>130000</td>
                            <td>61340</td>
                            <td>75200</td>
                            <td>1.17</td>
                        </tr>

                        <tr>
                            <td>Computer and Mathematical Occupations</td>
                            <td>150000</td>
                            <td>60070</td>
                            <td>90420</td>
                            <td>2.02</td>
                        </tr>
                    </table>
                </body>
            </div>
        );
    }
}

const data = {
    info: {
        location: 'Austin-Round Rock, TX',
        meanWage: '$51,840'
    },
    occupations: {
        title: 'Occupations',
        headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean', 'Location Quotient'],
        values: [
            ['Office and Administrative Support Occupations', 430000, 175300, 38780, 1.14],
            ['Sales and Related Occupations', 410000, 113350, 47860, 1.12],
            ['Food Preparation and Serving Related Occupations', 350000, 107270, 25080, 1.16],
            ['Business and Financial Operations Occupations', 130000, 61340, 75200, 1.17],
            ['Computer and Mathematical Occupations', 150000, 60070, 90420, 2.02]
        ]
    }
};

export default Austin;
