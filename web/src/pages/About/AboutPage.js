import React, { Component } from "react";
import "./about-page.css";
import Brian from "./brian.jpeg";
import Brooke from "./brooke.jpg";
import Cooper from "./cooper.png";
import David from "./david.jpeg";
import Johnny from "./johnny.jpg";
import Sean from "./sean.jpeg";

class AboutPage extends Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      issues: [0, 0, 0, 0, 0, 0],
      issueNum: 0,
      commits: [0, 0, 0, 0, 0, 0],
      commitNum: 0,
      urlD: []
    };
  }

  commitCount = 0;

  contributors = {
    CooperTravis: {
      name: "Cooper Travis",
      username: "CooperTravis",
      commits: 0,
      issues: 0
    },
    bcheung: {
      name: "Brian Cheung",
      username: "bcheung",
      commits: 0,
      issues: 0
    },
    brookepaxman: {
      name: "Brooke Paxman",
      username: "brookepaxman",
      commits: 0,
      issues: 0
    },
    "wang-sz": {
      name: "Sean Wang",
      username: "wang-sz",
      commits: 0,
      issues: 0
    },
    dterral504: {
      name: "David Terral",
      username: "dterral504",
      commits: 0,
      issues: 0
    },
    jmgabriel96: {
      name: "Johnny Gabriel",
      username: "jmgabriel96",
      commits: 0,
      issues: 0
    }
  };

  componentDidMount() {
    // this.fetchTotalIssues();
    // this.fetchBranches();
    // this.obtainURLs();
    this.fetchCommits();
    // this.fetchMasterCommits();
  }

  fetchCommits() {
    const url = `https://api.github.com/repos/bcheung/ioDB/stats/contributors`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(contributor => {
          const username = contributor.author.login;
          this.contributors[username].commits = contributor.total;
        });
      });
  }

  fetchTotalIssues() {
    const url = "https://api.github.com/repos/bcheung/ioDB/issues";
    fetch(url)
      .then(response => response.json())
      .then(data => {
          data.forEach(issue => {
            const username = issue.user;
            this.contributors[username].issues++;
          })
      });
        // console.log(issuesCopy, "fetchIssuesCopy");
        // this.setState({
        //   issues: issuesCopy
        // });
        // console.log(data, "fetchIssues");
        // this.setState({ issueNum: data.length });
  }

  getTotalCommits() {
    this.setState({ commitNum: num });
  }

  render() {
    const { issueNum, commitNum } = this.state;
    return (
      <div>
        <h1>About ioDB</h1>
        <p>
          We seek to provide an interface that neatly organizes key metrics of
          US occupations such as location, occupation category,and industry that
          people look for while researching occupations and industries in the
          US. ioDB provides its users with an easy to navigate UI to help users
          gain a more meaningful understanding of all the available information.
        </p>
        <h2 id="name">Group Name: Team Amethyst</h2>
        <table id="table.team" align="center">
          <tbody>
            <tr id="row0">
              <td id="cell0-0">
                <h2>
                  {this.contributors[0].name +
                    ": " +
                    this.contributors[0].github}
                </h2>
                <img
                  src={Cooper}
                  id="Cooper"
                  width="155"
                  height="250"
                  alt="Cooper Travis"
                />
                <ul>
                  <li>
                    <b>Major:</b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> Cooper is in his fourth year at the University
                    of Texas at Austin studying Electrical and Computer
                    Engineering with a focus in Software Engineering and Design.
                    With an interest in business and a desire to one day open
                    his own gym he plans on working in the industry for a few
                    years before pursuing his MBA. In his spare time, you can
                    find him in the gym or out on the river kayaking.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Develop data scraper using Python,
                    create 3 static web pages using React.js and deploy onto
                    GCP, configure backend framework for data using Python.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[0]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[0]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>2
                  </li>
                </ul>
              </td>
              <td id="cell0-1">
                <h2>
                  {this.contributors[1].name +
                    ": " +
                    this.contributors[1].github}
                </h2>
                <img
                  src={Brian}
                  id="Brian"
                  width="250"
                  height="250"
                  alt="Brian Cheung"
                />
                <ul>
                  <li>
                    <b>Major: </b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> Brian is a second year student at the University
                    of Texas at Austin. He is currently pursuing an Electrical
                    and Computer Engineering degree with a focus in software
                    engineering. At the moment, Brian is looking to gain some
                    industry experience in order to narrow down his area of
                    interest in software engineering. Some of Brian’s hobbies
                    include learning piano, playing basketball, weightlifting,
                    and of course, eating.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Configure routing for each web
                    page, create 3 static main web pages for Industry, Location,
                    and Occupation using React.js and deploy onto GCP.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[1]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[1]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>2
                  </li>
                </ul>
              </td>
            </tr>
            <tr id="row1">
              <td id="cell1-0">
                <h2>
                  {this.contributors[2].name +
                    ": " +
                    this.contributors[2].github}
                </h2>
                <img
                  src={Brooke}
                  id="Brooke"
                  width="250"
                  height="250"
                  alt="Brooke Paxman"
                />
                <ul>
                  <li>
                    <b>Major:</b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> Brooke is in her third year at the University of
                    Texas at Austin studying Electrical and Computer Engineering
                    with a focus in Software Engineering. She also has a
                    secondary focus in Psychology and is interested in learning
                    about how the psychology of human behavior and cognition
                    overlaps with software engineering. She enjoys riding her
                    bike around Austin and soaking up the sun outdoors.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Create About page with GitHub stats
                    derived dynamically from the GitHub API and deploy to GCP,
                    create issues and post to issue board on GitHub.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[2]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[2]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>2
                  </li>
                </ul>
              </td>
              <td id="cell1-1">
                <h2>
                  {this.contributors[3].name +
                    ": " +
                    this.contributors[3].github}
                </h2>
                <img
                  src={Sean}
                  id="Sean"
                  width="250"
                  height="250"
                  alt="Sean Wang"
                />
                <ul>
                  <li>
                    <b>Major:</b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> Sean is a second year Electrical and Computer
                    Engineering student at the University of Texas at Austin. He
                    has completed a minor in business, but would like to pursue
                    a career and gain experience in software engineering before
                    making a decision on obtaining a higher degree, such as an
                    MBA. In his free time, he enjoys playing piano or taking a
                    nice and relaxing nap.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Create 3 static web pages for 3
                    different occupation instances, create issues and post to
                    issue board on GitHub. Write tests to make sure the links
                    direct to the correct pages.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[3]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[3]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>3
                  </li>
                </ul>
              </td>
            </tr>
            <tr id="row2">
              <td id="cell2-0">
                <h2>
                  {this.contributors[4].name +
                    ": " +
                    this.contributors[4].github}
                </h2>
                <img
                  src={David}
                  id="David"
                  width="250"
                  height="250"
                  alt="David Terral"
                />
                <ul>
                  <li>
                    <b>Major:</b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> David is a third year student at the University
                    of Texas from New Orleans, LA. He is pursuing a degree in
                    Electrical and Computer Engineering with a focus in Software
                    Engineering and Design. His main interests are application
                    development as well as database management and analysis. In
                    his free time he plays and watches football and soccer. His
                    favorite teams are the New Orleans Saints and Arsenal.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Create 3 static pages with location
                    data using React.js and deploy onto GCP, configure backend
                    framework for data using Python.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[4]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[4]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>3
                  </li>
                </ul>
              </td>
              <td id="cell2-1">
                <h2>
                  {this.contributors[5].name +
                    ": " +
                    this.contributors[5].github}
                </h2>
                <img
                  src={Johnny}
                  id="Johnny"
                  width="250"
                  height="250"
                  alt="Johnny Gabriel"
                />
                <ul>
                  <li>
                    <b>Major:</b>
                    {" Electrical and Computer Engineering"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Bio:</b> John is studying Electrical and Computer
                    Engineering with a focus in Software Engineering and Design.
                    His interests lie in startups and his plans after graduation
                    is to start his own company.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Responsibilities:</b> Create 3 static web pages for 3
                    different industry instances and deploy onto GCP.
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Commits: </b>
                    {this.state.commits[5]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Issues: </b>
                    {this.state.issues[5]}
                  </li>
                </ul>
                <ul>
                  <li>
                    <b>Unit Tests: </b>2
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Total Stats:</h3>
        <ul>
          <li>Issues: {issueNum}</li>
          <li>Total Commits: {commitNum}</li>
          <li>Unit Tests: 14 </li>
        </ul>
        <h3>Data:</h3>
        <ul>
          Data was scraped using our own scraper written in Python that parses
          through the CSV files holding our data, equating about 30,000 lines of
          information.
          <li>
            <a href="https://www.bls.gov/oes/tables.htm">BLS OES Data</a>
          </li>
          <li>
            <a href="https://www.bls.gov/ooh/">US Occupational Data</a>
            <ul>
              <li>
                Left column of this page contains each major industry category.
                Clicking on the category brings up a table with a description
                for each occupation in that industry
              </li>
            </ul>
          </li>
          <li>
            <a href="https://simplemaps.com/data/us-cities">
              US Census Cities Data
            </a>
            <ul>
              <li>Provides info for each US city, such as:</li>
              <ul>
                <li>Population</li>
                <li>City</li>
                <li>County</li>
              </ul>
            </ul>
          </li>
        </ul>
        <h3>Tools:</h3>
        <ul>
          <li>
            Google App Engine (GCP): Used to set up our PostgreSQL database.
          </li>
          <li>PyCharm: Python IDE used to write and develop data scraper.</li>
          <li>
            Postman: Used to design our RESTful API and to test HTTP GET
            requests from GitHub API.
          </li>
          <li>
            PostgreSQL: Used to create our database for each of our models and
            instances.
          </li>
          <li>
            React: Used to write 14 static webpages and dynamic about page to
            deploy to GCP.
          </li>
        </ul>
        <p>
          The following is a link to our Github:
          <a href="https://github.com/bcheung/ioDB/">Github Repo</a>
        </p>
      </div>
    );
  }
}
export default AboutPage;
