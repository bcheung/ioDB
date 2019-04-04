import React, { Component } from 'react';
import './about-page.css';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
    Container,
    CardDeck,
    CardHeader,
    Jumbotron,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap';
import Brian from './brian.jpeg';
import Brooke from './brooke.jpg';
import Cooper from './cooper.png';
import David from './david.jpeg';
import John from './johnny.jpg';
import Sean from './sean.jpeg';

const contributorInfo = {
    CooperTravis: {
        name: 'Cooper Travis',
        image: Cooper,
        username: 'CooperTravis',
        major: 'Electrical & Computer Eng.',
        bio:
            'Cooper is in his fourth year at the University of Texas at Austin studying Electrical and Computer Engineering with a focus in Software Engineering and Design. With an interest in business and a desire to one day open his own gym he plans on working in the industry for a few years before pursuing his MBA. In his spare time, you can find him in the gym or out on the river kayaking.',
        responsibilities:
            'Develop data scraper using Python, create 3 static web pages using React.js and deploy onto GCP, configure backend framework for data using Python. Wrote initial scraper to populate database with information for many instances of each model. Worked with Brian to design REST API to effectively query for the required data. Worked with Brian to implement a search bar component to be used for search and navigation on the home page.'
    },
    bcheung: {
        name: 'Brian Cheung',
        image: Brian,
        username: 'bcheung',
        major: 'Electrical & Computer Eng.',
        bio:
            'Brian is a second year student at the University of Texas at Austin. He is currently pursuing an Electrical and Computer Engineering degree with a focus in software engineering. At the moment, Brian is looking to gain some industry experience in order to narrow down his area of interest in software engineering. Some of Brian’s hobbies include learning piano, playing basketball, weightlifting, and of course, eating.',
        responsibilities:
            'Set up frontend and backend infrastructure and deploy onto GCP, configure dynamic routing, create 3 static main web pages for Industry, Location, and Occupation using React.js. Configured backend on Google cloud Platform. Analyzed CSV files to design and implement the PostgreSQL database. Updated Cooper’s scraper to populate the database with SQLAlchemy. Designed and implemented the REST API to effectively query the data. Designed general layout with Sean to determine what data was needed for each page. Created frontend fetch API library. Created reusable components to display general information, wage and salary statistics, search bars and dropdown menus. Implemented the home page with search bar to display top ten instances of each model. Helped Brooke implement the heat maps with the data from the REST API. Helped John implement the Industry instance page. Designed and created the router to link all the pages together.'
    },
    brookepaxman: {
        name: 'Brooke Paxman',
        image: Brooke,
        username: 'brookepaxman',
        major: 'Electrical & Computer Eng.',
        bio:
            'Brooke is in her third year at the University of Texas at Austin studying Electrical and Computer Engineering. She also has a secondary focus in Psychology and is interested in learning about how the psychology of human behavior and cognition overlaps with software engineering. She enjoys riding her bike around Austin and soaking up the sun outdoors.',
        responsibilities:
            'Create About page with GitHub stats derived dynamically from the GitHub API and deploy to GCP, create issues and post to issue board on GitHub. Designed UI for all occupation instances including a choropleth map of location data, bar graphs with wage data, and collapsible navigation bar for detailed occupation instances. Populated all data with API requests.'
    },
    'wang-sz': {
        name: 'Sean Wang',
        image: Sean,
        username: 'wang-sz',
        major: 'Electrical & Computer Eng.',
        bio:
            'Sean is a second year Electrical and Computer Engineering student at the University of Texas at Austin. He has completed a minor in business, but would like to pursue a career and gain experience in software engineering before making a decision on obtaining a higher degree, such as an MBA. In his free time, he enjoys playing piano or taking a nice and relaxing nap.',
        responsibilities:
            'Create 3 static web pages for 3 different occupation instances, create issues and post to issue board on GitHub. Write tests to make sure the links direct to the correct pages. Designed general UI layout with Brian, determining what data to show and how to show it graphically. Designed locations page and implemented an interactive map for states and metropolitan areas and dynamically showing data based on selected areas. Put together reusable components for general wage statistics and for a “Top 10” graphical ranking.'
    },
    dterral504: {
        name: 'David Terral',
        image: David,
        username: 'dterral504',
        major: 'Electrical & Computer Eng.',
        bio:
            'David is a third year student at the University of Texas from New Orleans, LA. He is pursuing a degree in Electrical and Computer Engineering with a focus in Software Engineering and Design. His main interests are application development as well as database management and analysis. In his free time he plays and watches football and soccer. His favorite teams are the New Orleans Saints and Arsenal.',
        responsibilities:
            'Create 3 static pages with location data using React.js and deploy onto GCP, configure backend framework for data using Python. Added styling and layout to the About page and overall theme of the app with Reactstrap. Implemented the navigation bar. '
    },
    jmgabriel96: {
        name: 'John Gabriel',
        image: John,
        username: 'jmgabriel96',
        major: 'Electrical & Computer Eng.',
        bio:
            'John is studying Electrical and Computer Engineering with a focus in Software Engineering and Design. His interests lie in startups and his plans after graduation is to start his own company.',
        responsibilities:
            'Create 3 static web pages for 3 different industry instances and deploy onto GCP. Worked on Industry instance page and chart components. Researched React-ChartJS-2 and Reactstrap UI libraries. Verified REST API documentation.'
    }
};
const contributorStats = {
    CooperTravis: {
        commits: 0,
        issues: 0,
        unitTests: 2
    },
    bcheung: {
        commits: 0,
        issues: 0,
        unitTests: 2
    },
    brookepaxman: {
        commits: 0,
        issues: 0,
        unitTests: 2
    },
    'wang-sz': {
        commits: 0,
        issues: 0,
        unitTests: 3
    },
    dterral504: {
        commits: 0,
        issues: 0,
        unitTests: 3
    },
    jmgabriel96: {
        commits: 0,
        issues: 0,
        unitTests: 2
    }
};

class AboutPage extends Component {
    state = {
        contributorStats,
        issuesTotal: 0,
        commitsTotal: 0,
        unitTestsTotal: 0
    };

    contributorKeys = ['CooperTravis', 'bcheung', 'brookepaxman', 'wang-sz', 'dterral504', 'jmgabriel96'];

    componentDidMount() {
        console.log('componentDidMount');
        this.fetchGithubStats();
    }

    fetchGithubStats() {
        this.fetchIssues();
        this.fetchCommits();
        this.calculateUnitTests();
        this.setState({ contributorStats });
    }

    async fetchCommits() {
        let commitsTotal = 0;
        const url = 'https://api.github.com/repos/bcheung/ioDB/stats/contributors';

        // fetch() and json() are asynchronous
        // we use await to make the main thread wait until the asynchronous thread terminates and returns a value
        const response = await fetch(url); // make get request to url and wait until response is returned
        const data = await response.json(); // convert response to a json object and wait until the data is returned
        // loop through array
        console.log(data);
        data.forEach(contributor => {
            // for each element in array (contributor is the variable for the element)
            // do something
            const username = contributor.author.login;
            contributorStats[username].commits = contributor.total;
            commitsTotal += contributor.total;
        });

        this.setState({ commitsTotal });
    }

    async fetchIssues() {
        let issuesTotal = 0;
        const url = 'https://api.github.com/repos/bcheung/ioDB/issues';

        const response = await fetch(url);
        const data = await response.json();
        data.forEach(issue => {
            const username = issue.user.login;
            contributorStats[username].issues++;
            issuesTotal++;
        });

        this.setState({ issuesTotal });
    }

    calculateUnitTests() {
        let unitTestsTotal = 0;
        this.contributorKeys.forEach(username => {
            unitTestsTotal += contributorStats[username].unitTests;
        });
        this.setState({ unitTestsTotal });
    }

    renderProfile(id) {
        const username = this.contributorKeys[id];
        const { contributorStats } = this.state;
        console.log('renderProfile', id, username, contributorStats[username]);

        return (
            <Card
                key={id}
                body
                style={{ borderColor: '#333', cursor: 'pointer' }}
                className="text-left"
                tag="a"
                onClick={() => window.open(`https://github.com/${username}`)}
            >
                <CardHeader className="text-center" tag="b">
                    {contributorInfo[username].name} ({contributorInfo[username].username})
                </CardHeader>
                <CardImg top width="100%" src={contributorInfo[username].image} alt="Error" />
                <CardText>
                    <CardText tag="b">Major: </CardText>
                    {contributorInfo[username].major}
                </CardText>
                <CardText>
                    <CardText tag="b">Bio: </CardText>
                    {contributorInfo[username].bio}
                </CardText>
                <CardText>
                    <CardText tag="b">Responsibilities: </CardText>
                    {contributorInfo[username].responsibilities}
                </CardText>
                <CardText>
                    <CardText tag="b">Commits:</CardText> {contributorStats[username].commits}
                </CardText>
                <CardText>
                    <CardText tag="b">Issues:</CardText> {contributorStats[username].issues}
                </CardText>
                <CardText>
                    <CardText tag="b">Unit Tests:</CardText> {contributorStats[username].unitTests}
                </CardText>
            </Card>
        );
    }

    renderProfiles() {
        const profiles = [];
        for (let id = 0; id < this.contributorKeys.length; id += 3) {
            // render each row
            profiles.push(
                <Container key={id}>
                    <CardDeck>
                        {this.renderProfile(id)}
                        {this.renderProfile(id + 1)}
                        {this.renderProfile(id + 2)}
                    </CardDeck>
                </Container>
            );
        }
        return profiles;
    }

    render() {
        const { commitsTotal, issuesTotal, unitTestsTotal } = this.state;
        return (
            <Container>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">About ioDB</h1>
                        <p className="lead">
                            We seek to provide an interface that neatly organizes key metrics of US occupations such as
                            location, occupation category,and industry that people look for while researching
                            occupations and industries in the US. ioDB provides its users with an easy to navigate UI to
                            help users gain a more meaningful understanding of all the available information.
                        </p>
                        <p>
                            The following is a link to our Github:
                            <a href="https://github.com/bcheung/ioDB/">Github Repo</a>
                        </p>
                    </Container>
                </Jumbotron>
                <h2 id="name">Team Amethyst</h2>

                <div>{this.renderProfiles()}</div>

                <Container>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Team Statistics:</ListGroupItemHeading>
                            <ListGroupItemText tag="li">Total Commits: {commitsTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Issues: {issuesTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Unit Tests: {unitTestsTotal}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Data Sources:</ListGroupItemHeading>
                            <ListGroupItemText>
                                Data was scraped using our own scraper written in Python that parses through the CSV
                                files holding our data, equating about 30,000 lines of information.
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                <a href="https://www.bls.gov/oes/tables.htm">BLS OES Data</a>
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                <a href="https://www.bls.gov/ooh/">US Occupational Data</a>- Left column of this page
                                contains each major industry category. Clicking on the category category brings up a
                                table with a description for each occupation in that industry
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                <a href="https://simplemaps.com/data/us-cities">US Census Cities Data</a>- Provides
                                info, such as population, for each US city
                            </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Tools:</ListGroupItemHeading>
                            <ListGroupItemText tag="li">
                                Google App Engine (GCP): Used to set up our PostgreSQL database
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                PyCharm: Python IDE used to write and develop data scraper
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                Postman: Used to design our RESTful API and to test HTTP GET requests from GitHub API
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                PostgreSQL: Used to create our database for each of our models and instances
                            </ListGroupItemText>
                            <ListGroupItemText tag="li">
                                React: Used to write 14 static webpages and dynamic about page to deploy to GCP
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                </Container>
            </Container>
        );
    }
}
export default AboutPage;
