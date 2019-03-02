import React, { Component } from "react";
import "./about-page.css";
import Brooke from './brooke.jpg';
//import Cooper from './cooper.jpg';
//import Brian from './brian.jpg';
//import Sean from './sean.jpg';
import Cooper from './cooper.png';
import Brian from './brian.jpeg';
import Sean from './sean.jpeg';
//import David from './david.jpg';
//import Johnny from './johnny.jpg';
import logo from './default.jpg';


class AboutPage extends Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      issues: [0,0,0,0,0,0],
      issueNum: 0,
      commits: [0,0,0,0,0,0],
      commitNum: 0,
      urlD: []
		};
  }

  commitCount = 0;
  
  people = [
    {
      name: "Cooper Travis",
      github: "CooperTravis",
      eventURL: "",
      issues: 0
    },
    {
      name: "Brian Cheung",
      github: "bcheung",
      eventURL: "",
      issues: 0
    },
    {
      name: "Brooke Paxman",
      github: "brookepaxman",
      eventURL: "",
      issues: 0
    },
    {
      name: "Sean Wang",
      github: "wang-sz",
      eventURL: "",
      issues: 0
    },
    {
      name: "David Terral",
      github: "dterral504",
      eventURL: "",
      issues: 0
    },
    {
      name: "Johnny Gabriel",
      github: "jmgabriel96",
      eventURL: "",
      issues: 0
    }
  ];
	
  
  componentDidMount() {
    this.fetchTotalIssues();
    this.fetchBranches();
    this.obtainURLs();
    this.fetchCommits();
  }

  obtainURLs(){
    var url = '';
    var user = '';
    var i;
    for (i = 0; i < this.people.length; i++){
      user = this.people[i].github;
      url = `https://api.github.com/users/${user}/events`;
      this.people[i].eventURL = url;
    }
  }

  fetchBranches(){
    const url = "https://api.github.com/repos/bcheung/ioDB/branches";
    fetch(url)
    .then(results => results.json())
    .then(data => {
      console.log(data, "fetchBranches");
      let branchesCopy = JSON.parse(JSON.stringify(data))
      var i;
      for (i = 0; i < data.length; i++){
        branchesCopy[i] = data[i].commit.url;
      }
      this.setState({
        branches:branchesCopy
      })
    })

  }

  fetchCommits() {
    var q;
    var url;
    for(q = 0; q < this.people.length; q++){
      url = this.people[q].eventURL;
      this.fetchURL(url,q);
    }
  }

  fetchURL(url,q){
    if(q < this.people.length){
     fetch(url)
        .then(results => results.json())
        .then(data => {
          let dataCopy = this.state.commits;
          var j;
          for(j = 0; j < data.length; j++){
            if(data[j].type === "PushEvent"){
              if(data[j].repo.name === "bcheung/ioDB"){
                dataCopy[q] += 1;
              }
            }
          }
          this.setState({
            commits:dataCopy
          })
          this.setState({
            commitNum:this.state.commitNum + dataCopy[q]
          })
        })
    }
  }

  fetchTotalIssues() {
    var githubName;
    var index = 0;
    const url = "https://api.github.com/repos/bcheung/ioDB/issues";
    fetch(url)
        .then(results => results.json())
        .then(data => {
          let issuesCopy = this.state.issues;
          var q;
          var l;
          for(q = 0; q < data.length; q++){
            githubName = data[q].user.login;
            console.log(githubName,"gituser");
            for(l = 0; l < this.people.length; l++){
              if(this.people[l].github === githubName){
                index = l;
              }
            }
            console.log(index,'indx');
            issuesCopy[index] += 1;
          }
          console.log(issuesCopy,"fetchIssuesCopy");
          this.setState({
            issues:issuesCopy
          })
          console.log(data,"fetchIssues");
          this.setState({ issueNum:data.length });
        });
  }

  fetchCommitNum(){
    var j;
    var url;
    var num = 0;
    for(j = 0; j < this.state.branches.length; j++){
      url = this.state.branches[j];
      fetch(url)
      .then(results => results.json())
      .then(data => {
        console.log(data, "fetchTotalCommits");
        num += data.length;
      });
    }
    this.setState({ commitNum: num });
  }

  render() {
    const { issueNum,commitNum } = this.state;
    return(
      <div>
        <h1>About ioDB</h1>
        <p>We seek to provide an interface that neatly organizes key metrics of US occupations 
          such as location, occupation category,and industry that people look for while researching 
          occupations and industries in the US. ioDB provides its users with an easy to navigate UI to 
          help users gain a more meaningful understanding of all the available information.</p>
        <h2 id="name">Group Name: Team Amethyst</h2>
        <table id="table.team" align="center">
        <tbody>
          <tr id="row0">
            <td id="cell0-0">
              <h2>{this.people[0].name+ ": "+this.people[0].github}</h2> 
               <img src={Cooper} id="Cooper" width="155" height = "250" alt = "Cooper Travis"></img>
               <ul><li><b>Major:</b>{" Electrical and Computer Engineering"}</li></ul>
               <ul><li>
                  <b>Bio:</b> Cooper is in his fourth year at the University of Texas at Austin studying Electrical 
                  and Computer Engineering with a focus in Software Engineering and Design. With
                  an interest in business and a desire to one day open his own gym he plans on 
                  working in the industry for a few years before pursuing his MBA. In his spare time,
                  you can find him in the gym or out on the river kayaking.
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
               <ul><li><b>Commits: </b>{this.state.commits[0]}</li></ul>
               <ul><li><b>Issues: </b>{this.state.issues[0]}</li></ul>
               <ul><li><b>Unit Tests: </b>2</li></ul>
            </td>
            <td id="cell0-1">
              <h2>{this.people[1].name+ ": "+this.people[1].github}</h2> 
               <img src={Brian} id="Brian" width="250" height = "250" alt = "Brian Cheung"></img>
               <ul><li><b>Major: </b>{" Electrical and Computer Engineering"}</li></ul>
               <ul><li>
                  <b>Bio:</b>
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
               <ul><li><b>Commits: </b>{this.state.commits[1]}</li></ul>
               <ul><li><b>Issues: </b>{this.state.issues[1]}</li></ul>
               <ul><li><b>Unit Tests: </b>0</li></ul>
            </td>
          </tr>
          <tr id="row1">
            <td id="cell1-0">
              <h2>{this.people[2].name+ ": "+this.people[2].github}</h2>
                <img src={Brooke} id="Brooke" width="250" height = "250" alt = "Brooke Paxman"></img>
                <ul><li><b>Major:</b>{" Electrical and Computer Engineering"}</li></ul>
                <ul><li>
                  <b>Bio:</b> Brooke is in her third year at the University of Texas at Austin studying 
                  Electrical and Computer Engineering. She also has a secondary focus in Psychology 
                  and is interested in learning about how the psychology of human behavior and cognition overlaps with 
                  software engineering. She enjoys riding her bike around Austin and soaking up the sun outdoors.
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
                <ul><li><b>Commits: </b>{this.state.commits[2]}</li></ul>
                <ul><li><b>Issues: </b>{this.state.issues[2]}</li></ul>
            </td>
            <td id="cell1-1">
              <h2>{this.people[3].name+ ": "+this.people[3].github}</h2> 
                <img src={Sean} id="Sean" width="250" height = "250" alt = "Sean Wang"></img>
                <ul><li><b>Major:</b>{" Electrical and Computer Engineering"}</li></ul>
                <ul><li>
                  <b>Bio:</b>
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
                <ul><li><b>Commits: </b>{this.state.commits[3]}</li></ul>
                <ul><li><b>Issues: </b>{this.state.issues[3]}</li></ul>
            </td>
          </tr>
          <tr id="row2">
            <td id="cell2-0">
              <h2>{this.people[4].name+ ": "+this.people[4].github}</h2>
                <img src={logo} id="David" width="250" height = "250" alt = "David Terral"></img> 
                <ul><li><b>Major:</b>{" Electrical and Computer Engineering"}</li></ul>
                <ul><li>
                  <b>Bio:</b>
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
                <ul><li><b>Commits: </b>{this.state.commits[4]}</li></ul>
                <ul><li><b>Issues: </b>{this.state.issues[4]}</li></ul>
            </td>
            <td id="cell2-1">
              <h2>{this.people[5].name+ ": "+this.people[5].github}</h2>
                <img src={logo} id="Johnny" width="250" height = "250" alt = "Johnny Gabriel"></img> 
                <ul><li><b>Major:</b>{" Electrical and Computer Engineering"}</li></ul>
                <ul><li>
                  <b>Bio:</b>
                </li></ul>
                <ul><li>
                  <b>Responsibilities:</b>
                </li></ul>
                <ul><li><b>Commits: </b>{this.state.commits[5]}</li></ul>
                <ul><li><b>Issues: </b>{this.state.issues[5]}</li></ul>
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
        <h3>Tools:</h3>
        <p>The following is a link to our Github:
        <a href="https://github.com/bcheung/ioDB/">Github Repo</a>
        </p>
      </div>
    );
  }
}
export default AboutPage;
