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
      contributorStats: this.contributorStats,
      issuesTotal: 0,
      commitsTotal: 0,
      unitTestsTotal: 0
    };
  }

  contributorKeys = [
    "CooperTravis",
    "bcheung",
    "brookepaxman",
    "wang-sz",
    "dterral504",
    "jmgabriel96"
  ];

  contributorInfo = {
    CooperTravis: {
      name: "Cooper Travis",
      image: Cooper,
      username: "CooperTravis",
      major: "Electrical and Computer Engineering",
      bio:
        "Cooper is in his fourth year at the University of Texas at Austin studying Electrical and Computer Engineering with a focus in Software Engineering and Design. With an interest in business and a desire to one day open his own gym he plans on working in the industry for a few years before pursuing his MBA. In his spare time, you can find him in the gym or out on the river kayaking.",
      responsibilities:
        "Develop data scraper using Python, create 3 static web pages using React.js and deploy onto GCP, configure backend framework for data using Python."
    },
    bcheung: {
      name: "Brian Cheung",
      image: Brian,
      username: "bcheung",
      major: "Electrical and Computer Engineering",
      bio:
        "Brian is a second year student at the University of Texas at Austin. He is currently pursuing an Electrical and Computer Engineering degree with a focus in software engineering. At the moment, Brian is looking to gain some industry experience in order to narrow down his area of interest in software engineering. Some of Brian’s hobbies include learning piano, playing basketball, weightlifting, and of course, eating.",
      responsibilities:
        "Set up frontend and backend infrastructure and deploy onto GCP, configure dynamic routing, create 3 static main web pages for Industry, Location, and Occupation using React.js."
    },
    brookepaxman: {
      name: "Brooke Paxman",
      image: Brooke,
      username: "brookepaxman",
      major: "Electrical and Computer Engineering",
      bio:
        "Brooke is in her third year at the University of Texas at Austin studying Electrical and Computer Engineering. She also has a secondary focus in Psychology and is interested in learning about how the psychology of human behavior and cognition overlaps with software engineering. She enjoys riding her bike around Austin and soaking up the sun outdoors.",
      responsibilities:
        "Create About page with GitHub stats derived dynamically from the GitHub API and deploy to GCP, create issues and post to issue board on GitHub."
    },
    "wang-sz": {
      name: "Sean Wang",
      image: Sean,
      username: "wang-sz",
      major: "Electrical and Computer Engineering",
      bio:
        "Sean is a second year Electrical and Computer Engineering student at the University of Texas at Austin. He has completed a minor in business, but would like to pursue a career and gain experience in software engineering before making a decision on obtaining a higher degree, such as an MBA. In his free time, he enjoys playing piano or taking a nice and relaxing nap.",
      responsibilities:
        "Create 3 static web pages for 3 different occupation instances, create issues and post to issue board on GitHub. Write tests to make sure the links direct to the correct pages."
    },
    dterral504: {
      name: "David Terral",
      image: David,
      username: "dterral504",
      major: "Electrical and Computer Engineering",
      bio:
        "David is a third year student at the University of Texas from New Orleans, LA. He is pursuing a degree in Electrical and Computer Engineering with a focus in Software Engineering and Design. His main interests are application development as well as database management and analysis. In his free time he plays and watches football and soccer. His favorite teams are the New Orleans Saints and Arsenal.",
      responsibilities:
        "Create 3 static pages with location data using React.js and deploy onto GCP, configure backend framework for data using Python."
    },
    jmgabriel96: {
      name: "Johnny Gabriel",
      image: Johnny,
      username: "jmgabriel96",
      major: "Electrical and Computer Engineering",
      bio:
        "John is studying Electrical and Computer Engineering with a focus in Software Engineering and Design. His interests lie in startups and his plans after graduation is to start his own company.",
      responsibilities:
        "Create 3 static web pages for 3 different industry instances and deploy onto GCP."
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
    "wang-sz": {
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
    var commitsTotal = 0;
    const url = "https://api.github.com/repos/bcheung/ioDB/stats/contributors";

    // without async await
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     data.forEach(contributor => {
    //       const username = contributor.author.login;
    //       this.contributorStats[username].commits = contributor.total;
    //       commitsTotal += contributor.total;
    //     });
    //   });

    let response = await fetch(url);
    let data = await response.json();
    data.forEach(contributor => {
      const username = contributor.author.login;
      this.contributorStats[username].commits = contributor.total;
      commitsTotal += contributor.total;
    });

    this.setState({
      commitsTotal
    });
  }

  async fetchIssues() {
    var issuesTotal = 0;
    const url = "https://api.github.com/repos/bcheung/ioDB/issues";

    // without async await
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     data.forEach(issue => {
    //       const username = issue.user;
    //       this.contributorStats[username].issues++;
    //       issuesTotal++;
    //     });
    //   });

    let response = await fetch(url);
    let data = await response.json();
    data.forEach(issue => {
      const username = issue.user.login;
      this.contributorStats[username].issues++;
      issuesTotal++;
    });

    this.setState({
      issuesTotal
    });
  }

  calculateUnitTests() {
      var unitTestsTotal = 0;
      this.contributorKeys.forEach((username) => {
        unitTestsTotal += this.contributorStats[username].unitTests;
      });
      this.setState({ unitTestsTotal });
  }

  renderProfile(id) {
    const username = this.contributorKeys[id];
    const { contributorStats } = this.state;
    console.log("renderProfile", id, username, contributorStats[username]);
    
    // calculate cell position
    const rowNum = Math.floor(id / 2);
    const colNum = id % 2;
    console.log(`cell${rowNum}-${colNum}`);

    return (
      <td id={`cell${rowNum}-${colNum}`}>
        <h2>
          {this.contributorInfo[username].name +
            ": " +
            this.contributorInfo[username].github}
        </h2>
        <img
          src={this.contributorInfo[username].image}
          id={username}
          width="250"
          height="250"
          alt={this.contributorInfo[username].name}
        />
        <ul>
          <li>
            <b>Major:</b>
            {this.contributorInfo[username].major}
          </li>
        </ul>
        <ul>
          <li>
            <b>Bio:</b>
            {this.contributorInfo[username].bio}
          </li>
        </ul>
        <ul>
          <li>
            <b>Responsibilities:</b>
            {this.contributorInfo[username].responsibilities}
          </li>
        </ul>
        <ul>
          <li>
            <b>Commits: </b>
            {contributorStats[username].commits}
          </li>
        </ul>
        <ul>
          <li>
            <b>Issues: </b>
            {contributorStats[username].issues}
          </li>
        </ul>
        <ul>
          <li>
            <b>Unit Tests: </b>
            {contributorStats[username].unitTests}
          </li>
        </ul>
      </td>
    );
  }

  renderProfiles() {
    const profiles = [];
    for (var id = 0; id < this.contributorKeys.length; id += 2) {
      const rowNum = Math.floor(id / 2);

      // render each row
      profiles.push(
        <tr id={`row${rowNum}`} key={id}>
          {this.renderProfile(id)}
          {this.renderProfile(id + 1)}
        </tr>
      );
    }
    return profiles;
  }

  render() {
    const { commitsTotal, issuesTotal, unitTestsTotal } = this.state;
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
          <tbody>{this.renderProfiles()}</tbody>
        </table>
        <h3>Total Stats:</h3>
        <ul>
          <li>Total Commits: {commitsTotal}</li>
          <li>Issues: {issuesTotal}</li>
          <li>Unit Tests: {unitTestsTotal} </li>
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
