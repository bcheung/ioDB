import React, { Component } from "react";
import "./about-page.css";

//Include logo
//Include links to About, Industry, Location, Occupation

class AboutPage extends Component {
  constructor() {
    super();
    this.state = {
      commits: 0,
      issues: 0
		};
	}
	
	people = [
		{
			name: "Cooper Travis",
			github: "CooperTravis"
		},
		{
			name: "Johnny Gabriel",
			github: "jmgabriel96"
		},
		{
			name: "Brooke Paxman",
			github: "brookepaxman"
		},
		{
			name: "Sean Wang",
			github: "wang-sz"
		},
		{
			name: "David Terral",
			github: "dterral504"
		},
		{
			name: "Brian Cheung",
			github: "bcheung"
		}
	];

  componentDidMount() {
    this.fetchCommits();
    this.fetchIssues();
  }

  fetchCommits() {
    const url = "https://api.github.com/repos/bcheung/ioDB/commits";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        console.log(data, "fetchCommits");
        this.setState({ commits: data.length });
      });
  }

  fetchIssues() {
    const url = "https://api.github.com/repos/bcheung/ioDB/issues";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        console.log(data, "fetchIssues");
        this.setState({ issues: data.length });
      });
  }

  render() {
    const { commits, issues } = this.state;
    console.log(commits, "render");
    return (
      <div>
				<ul>
					{this.people.map((data, index) => {
						return (
							<li key={index}>{data.name} : {data.github}</li>
						);
					})}
				</ul>
				<a href="https://github.com/bcheung/ioDB/">Github Repo</a>

        <p>Commits: {commits}</p>
        <p>Issues: {issues}</p>
      </div>
    );
  }
}

export default AboutPage;
