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

class AboutPage extends Component {
    state = {
        contributorStats: this.contributorStats,
        issuesTotal: 0,
        commitsTotal: 0,
        unitTestsTotal: 0
    };

    contributorKeys = ['CooperTravis', 'bcheung', 'brookepaxman', 'wang-sz', 'dterral504', 'jmgabriel96'];

    contributorInfo = {
        CooperTravis: {
            name: 'Cooper Travis',
            image: Brian, // change to cooper once picture is square
            username: 'CooperTravis',
            major: 'Electrical & Computer Eng.',
            bio:
                'Cooper is in his fourth year at the University of Texas at Austin studying Electrical and Computer Engineering with a focus in Software Engineering and Design. With an interest in business and a desire to one day open his own gym he plans on working in the industry for a few years before pursuing his MBA. In his spare time, you can find him in the gym or out on the river kayaking.',
            responsibilities:
                'Develop data scraper using Python, create 3 static web pages using React.js and deploy onto GCP, configure backend framework for data using Python.'
        },
        bcheung: {
            name: 'Brian Cheung',
            image: Brian,
            username: 'bcheung',
            major: 'Electrical & Computer Eng.',
            bio:
                'Brian is a second year student at the University of Texas at Austin. He is currently pursuing an Electrical and Computer Engineering degree with a focus in software engineering. At the moment, Brian is looking to gain some industry experience in order to narrow down his area of interest in software engineering. Some of Brian’s hobbies include learning piano, playing basketball, weightlifting, and of course, eating.',
            responsibilities:
                'Set up frontend and backend infrastructure and deploy onto GCP, configure dynamic routing, create 3 static main web pages for Industry, Location, and Occupation using React.js.'
        },
        brookepaxman: {
            name: 'Brooke Paxman',
            image: Brooke,
            username: 'brookepaxman',
            major: 'Electrical & Computer Eng.',
            bio:
                'Brooke is in her third year at the University of Texas at Austin studying Electrical and Computer Engineering. She also has a secondary focus in Psychology and is interested in learning about how the psychology of human behavior and cognition overlaps with software engineering. She enjoys riding her bike around Austin and soaking up the sun outdoors.',
            responsibilities:
                'Create About page with GitHub stats derived dynamically from the GitHub API and deploy to GCP, create issues and post to issue board on GitHub.'
        },
        'wang-sz': {
            name: 'Sean Wang',
            image: Sean,
            username: 'wang-sz',
            major: 'Electrical & Computer Eng.',
            bio:
                'Sean is a second year Electrical and Computer Engineering student at the University of Texas at Austin. He has completed a minor in business, but would like to pursue a career and gain experience in software engineering before making a decision on obtaining a higher degree, such as an MBA. In his free time, he enjoys playing piano or taking a nice and relaxing nap.',
            responsibilities:
                'Create 3 static web pages for 3 different occupation instances, create issues and post to issue board on GitHub. Write tests to make sure the links direct to the correct pages.'
        },
        dterral504: {
            name: 'David Terral',
            image: David,
            username: 'dterral504',
            major: 'Electrical & Computer Eng.',
            bio:
                'David is a third year student at the University of Texas from New Orleans, LA. He is pursuing a degree in Electrical and Computer Engineering with a focus in Software Engineering and Design. His main interests are application development as well as database management and analysis. In his free time he plays and watches football and soccer. His favorite teams are the New Orleans Saints and Arsenal.',
            responsibilities:
                'Create 3 static pages with location data using React.js and deploy onto GCP, configure backend framework for data using Python.'
        },
        jmgabriel96: {
            name: 'John Gabriel',
            image: John,
            username: 'jmgabriel96',
            major: 'Electrical & Computer Eng.',
            bio:
                'John is studying Electrical and Computer Engineering with a focus in Software Engineering and Design. His interests lie in startups and his plans after graduation is to start his own company.',
            responsibilities: 'Create 3 static web pages for 3 different industry instances and deploy onto GCP.'
        }
    };

    contributorStats = {
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

    componentWillMount() {
        this.fetchGithubStats();
    }

    fetchGithubStats() {
        this.fetchIssues();
        this.fetchCommits();
        this.calculateUnitTests();
        this.setState({ contributorStats: this.contributorStats });
    }

    async fetchCommits() {
        let commitsTotal = 0;
        const url = 'https://api.github.com/repos/bcheung/ioDB/stats/contributors';

        // fetch() and json() are asynchronous
        // we use await to make the main thread wait until the asynchronous thread terminates and returns a value
        const response = await fetch(url); // make get request to url and wait until response is returned
        const data = await response.json(); // convert response to a json object and wait until the data is returned
        // loop through array
        data.forEach(contributor => {
            // for each element in array (contributor is the variable for the element)
            // do something
            const username = contributor.author.login;
            this.contributorStats[username].commits = contributor.total;
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
            this.contributorStats[username].issues++;
            issuesTotal++;
        });

        this.setState({ issuesTotal });
    }

    calculateUnitTests() {
        let unitTestsTotal = 0;
        this.contributorKeys.forEach(username => {
            unitTestsTotal += this.contributorStats[username].unitTests;
        });
        this.setState({ unitTestsTotal });
    }

    renderProfile(id) {
        const username = this.contributorKeys[id];
        const { contributorStats } = this.state;
        console.log('renderProfile', id, username, contributorStats[username]);

        return (
            <Card body style={{ borderColor: '#333' }} className="text-left">
                <CardHeader className="text-center" tag="b">
                    {this.contributorInfo[username].name} ({this.contributorInfo[username].username})
                </CardHeader>
                <CardImg top width="100%" src={this.contributorInfo[username].image} alt="Error" />
                <CardText>
                    <CardText tag="b">Major: </CardText>
                    {this.contributorInfo[username].major}
                </CardText>
                <CardText>
                    <CardText tag="b">Bio: </CardText>
                    {this.contributorInfo[username].bio}
                </CardText>
                <CardText>
                    <CardText tag="b">Responsibilities: </CardText>
                    {this.contributorInfo[username].responsibilities}
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
                <Container>
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
