import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { BarComponent } from '../../components/BarComponent';
import { PieComponent } from '../../components/PieComponent';
import { IndustryComponent } from '../../components/IndustryComponent';
import { IndustryTableComponent } from '../../components/IndustryTableComponent';
import { IndustryWageTableComponent } from '../../components/IndustryWageTableComponent';
// es6
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './industry-instance-page.css';

// http://www.iodb.info/api/instance/industries_3d/113000

const industry = {
    annual_10: 23530,
    annual_25: 30730,
    annual_75: 49830,
    annual_90: 62560,
    annual_mean: 42310,
    annual_median: 39220,
    description:
        'Industries in the Forestry and Logging subsector grow and harvest timber on a long production cycle (i.e., of 10 years or more).  Long production cycles use different production processes than short production cycles, which require more horticultural interventions prior to harvest, resulting in processes more similar to those found in the Crop Production subsector.  Consequently, Christmas tree production and other production involving production cycles of less than 10 years, are classified in the Crop Production subsector. \n\nIndustries in this subsector specialize in different stages of the production cycle.  Reforestation requires production of seedlings in specialized nurseries.  Timber production requires natural forest or suitable areas of land that are available for a long duration.  The maturation time for timber depends upon the species of tree, the climatic conditions of the region, and the intended purpose of the timber.  The harvesting of timber (except when done on an extremely small scale) requires specialized machinery unique to the industry.  Establishments gathering forest products, such as gums, barks, balsam needles, rhizomes, fibers, Spanish moss, and ginseng and truffles, are also included in this subsector.',
    hourly_10: 11.31,
    hourly_25: 14.77,
    hourly_75: 23.96,
    hourly_90: 30.08,
    hourly_mean: 20.34,
    hourly_median: 18.86,
    id: '113000',
    industries_4d: ['113300'],
    title: 'Forestry and Logging',
    total_employment: 49250
};

const logging = {
    annual_10: 23530,
    annual_25: 30730,
    annual_75: 49830,
    annual_90: 62560,
    annual_mean: 42310,
    annual_median: 39220,
    description:
        'This industry comprises establishments primarily engaged in one or more of the following: (1) cutting timber; (2) cutting and transporting timber; and (3) producing wood chips in the field.',
    hourly_10: 11.31,
    hourly_25: 14.77,
    hourly_75: 23.96,
    hourly_90: 30.08,
    hourly_mean: 20.34,
    hourly_median: 18.86,
    id: '113300',
    industry_3d: { id: '113000', title: 'Forestry and Logging' },
    title: 'Logging',
    total_employment: 49250
};

// Industries 4d still confusing, will get back to it

const data = {
    info: {
        industry: 'Dental Industry',
        naics: '(621200)',
        description:
            'Industry operators are primarily engaged in the independent practice of general or specialized dentistry or dental surgery. These practitioners operate private or group practices in their own offices (e.g. centers or clinics) or in the facilities of others, such as hospitals or HMO medical centers.',
        meanWage: 'Annual mean wage: $64,590'
    },
    industries: {
        headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
        values: [
            ['Healthcare Practitioners and Technical Occupations', '290000', 319720, 112220],
            ['Healthcare Support Occupations', '310000', 311330, 38580],
            ['Other Healthcare Support Occupations', '319000', 3111270, 38580],
            ['Miscellaneous Healthcare Support', '319090', 311250, 38580],
            ['Dental Assistants', '319091', 305150, 38680]
        ]
    }
};
const occupationWageData = {
    industries: {
        headers: ['Occupation', 'Mean Wage'],
        values: [
            ['Healthcare Practitioners and Technical Occupations', 112220],
            ['Healthcare Support Occupations', 38580],
            ['Other Healthcare Support Occupations', 38580],
            ['Miscellaneous Healthcare Support', 38580],
            ['Dental Assistants', 38680]
        ]
    }
};
const occupationData = {
    industries: {
        headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
        values: [
            ['Healthcare Practitioners and Technical Occupations', '290000', 319720, 112220],
            ['Healthcare Support Occupations', '310000', 311330, 38580],
            ['Other Healthcare Support Occupations', '319000', 3111270, 38580],
            ['Miscellaneous Healthcare Support', '319090', 311250, 38580],
            ['Dental Assistants', '319091', 305150, 38680]
        ]
    }
};

// Chart Data Options
/** We need labels = top occupations
 *
 * data = wages, (constantly pushed from each until 10j)
 */
const chartData = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
        {
            label: 'Videos Made',
            backgroundColor: 'rgba(255,0,255,0.75)',
            data: [4, 5, 1, 10, 32, 2, 12]
        }
    ]
};

// {} = objects
// [] = arrays
// we need to add new arrays to a specific object in a specific key
const tempArray = {
    industries: {
        headers: ['Occupation', 'Employment', 'Annual Mean Wage'],
        values: [{}]
    }
};

const tempArrays = {
    industries: {
        headers: ['Occupation', 'Annual Mean Wage'],
        values: [{}]
    }
};

const tempArraysD = [
    {
        dataField: 'name',
        text: 'Occupation'
    },
    {
        dataField: 'wage',
        text: 'Annual Mean Wage'
    }
];

const dataTable = [];

const chartDatas = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#FFC300']
        }
    ]
};

// THIS IS HOW WE'LL BE ABLE TO CALL ALL OUR FETCHES
// fetchGithubStats() {
//     this.fetchIssues();
//     this.fetchCommits();
//     this.calculateUnitTests();
//     this.setState({ contributorStats: this.contributorStats });
// }

/** backgroundColor: 'rgba(255,0,255,0.75)',
            data: [] */
class IndustryInstances extends Component {
    state = { commitsTotal: 0 };

    componentWillMount() {
        this.fetchOccupations();
    }

    // This will fetch every occupation from this instance
    // Used in the table components
    async fetchOccupations() {
        const commitsTotal = 0;
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = `${proxyurl}http://www.iodb.info/api/joined_instance/ind_3d_occ_major/industries_3d/113000`;

        const response = await fetch(url); // get a response
        const dataS = await response.json(); // get json object from response
        // console.log(dataS); // log this response

        // This formats the data
        // For us, we need to take each "title" and add it to our
        // representation of this object
        let i = 0;
        const arr = [];
        const tempName = [];
        const tempWage = [];
        dataS.forEach(contributor => {
            const tempArr = [];
            const tempArrs = [];

            const name = contributor.occupation_major.title;
            const emp = contributor.total_employment;
            const wage = contributor.annual_mean;
            if (i < 10) {
                chartDatas.labels.push(name);
                arr.push(wage);
            }
            tempArr.push(name, emp, wage);
            tempArrs.push(name, wage);
            tempName.push(name);
            tempWage.push(wage);

            // Push into the actual array
            tempArray.industries.values.push(tempArr);
            tempArrays.industries.values.push(tempArrs);

            i++;
        });
        chartDatas.datasets[0].data = arr;
        dataTable.name = tempName;
        dataTable.wage = tempWage;
        console.log(dataTable);

        // would we need to set the state? i doubt it right
        this.setState({ commitsTotal });
    }

    render() {
        return (
            <body className="app sidebar-show aside-menu-show">
                <div>
                    <Jumbotron fluid>
                        <Container>
                            <h1>{industry.title}</h1>
                        </Container>
                    </Jumbotron>
                    ;
                </div>

                <div className="app-body">
                    <main className="main">
                        {/* // Industry + Name(from backend) */}

                        <h2>Overview</h2>
                        <p>{industry.description}</p>

                        <p> Annual median wage: ${industry.annual_median}</p>
                        <p>Annual mean wage: ${industry.annual_mean}</p>

                        {/* Charts located at: https://www.chartjs.org/docs/latest/ */}

                        <h2> Top Occupations By Wage</h2>

                        <div className="row">
                            <div className="col-md-2 col-md-offset-5" />
                            <BarComponent
                                data={chartDatas}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                        </div>

                        <h2> Occupation Distributions</h2>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-5" />
                            <PieComponent
                                data={chartDatas}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                        </div>

                        <h2>Occupations in this Industry</h2>
                        {/* We need a table here */}
                        <IndustryTableComponent data={tempArray} />
                    </main>
                    <aside className="aside-menu">
                        <h2> Top Industry Occupations by Wage</h2>
                        <IndustryWageTableComponent data={tempArrays} />

                        <BootstrapTable keyField="name" data={dataTable} columns={tempArraysD} />
                    </aside>
                </div>
                <footer className="app-footer">
                    <p> footer</p>
                </footer>

                <script
                    src="http://code.jquery.com/jquery-3.3.1.min.js"
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                    crossOrigin="anonymous"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossOrigin="anonymous"
                />
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
                    integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                    crossOrigin="anonymous"
                />
                <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js" />
            </body>
        );
    }
}

export default IndustryInstances;
