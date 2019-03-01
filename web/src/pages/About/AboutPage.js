import React, { Component } from "react";
import "./about-page.css";
import Brooke from './brooke.jpg';
//import Cooper from './cooper.jpg';
//import Brian from './brian.jpg';
//import Sean from './sean.jpg';
//import David from './david.jpg';
//import Johnny from './johnny.jpg';
import logo from './default.jpg';


class AboutPage extends Component {
  constructor() {
    super();
    this.state = {
      branches: [],
      issues: 0,
      commitNum: 0,
      commits: [0,0,0,0,0,0],
      urlD: []
		};
  }
  
  people = [
    {
      name: "Cooper Travis",
      github: "CooperTravis",
      eventURL: "",
    },
    {
      name: "Brian Cheung",
      github: "bcheung",
      eventURL: "",
    },
    {
      name: "Brooke Paxman",
      github: "brookepaxman",
      eventURL: "",
    },
    {
      name: "Sean Wang",
      github: "wang-sz",
      eventURL: "",
    },
    {
      name: "David Terral",
      github: "dterral504",
      eventURL: "",
    },
    {
      name: "Johnny Gabriel",
      github: "jmgabriel96",
      eventURL: "",
    }
  ];
	
	
  
  componentDidMount() {
    this.fetchIssues();
    this.fetchBranches();
    this.obtainURLs();
    this.fetchCommits();
    this.fetchCommitNum();
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
      var commitNum = 0;
     fetch(url)
        .then(results => results.json())
        .then(data => {
          let dataCopy = this.state.commits;
          var j;
          for(j = 0; j < data.length; j++){
            if(data[j].type == "PushEvent"){
              if(data[j].repo.name == "bcheung/ioDB"){
                dataCopy[q] += 1;
              }
            }
          }
          this.setState({
            commits:dataCopy
          })
        })
    }
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
    const { issues,commitNum } = this.state;
    return(
      <div>
        <h1>About ioDB</h1>
        <p>We seek to provide a more intuitive and less cluttered interface 
          that will focus on the key metrics that people look for while 
          researching occupations and industries in the US. This includes implementing
           a versatile graphical view of the data to help users gain a more meaningful 
           understanding of all the available information.</p>
        <p>Group Name: Team Amethyst</p>
        <ul>
          <h2><li>{this.people[0].name+ ": "+this.people[0].github}</li></h2> 
            <img src={logo} id="Cooper" width="200" height = "200" alt = "Cooper Travis"></img>
            <ul><li>{"Commits: " +this.state.commits[0]}</li></ul>
          <h2><li>{this.people[1].name+ ": "+this.people[1].github}</li></h2> 
          <img src={logo} id="Brian" width="200" height = "200" alt = "Brian Cheung"></img>
            <ul><li>{"Commits: " +this.state.commits[1]}</li></ul>
          <h2><li>{this.people[2].name+ ": "+this.people[2].github}</li></h2>
            <img src={Brooke} id="Brooke" width="200" height = "200" alt = "Brooke Paxman"></img>
            <ul><li>{"Commits: " +this.state.commits[2]}</li></ul> 
          <h2><li>{this.people[3].name+ ": "+this.people[3].github}</li></h2> 
            <img src={logo} id="Sean" width="200" height = "200" alt = "Sean Wang"></img>
            <ul><li>{"Commits: " +this.state.commits[3]}</li></ul>
          <h2><li>{this.people[4].name+ ": "+this.people[4].github}</li></h2>
            <img src={logo} id="David" width="200" height = "200" alt = "David Terral"></img> 
            <ul><li>{"Commits: " +this.state.commits[4]}</li></ul>
          <h2><li>{this.people[5].name+ ": "+this.people[5].github}</li></h2>
          <img src={logo} id="Johnny" width="200" height = "200" alt = "Johnny Gabriel"></img> 
            <ul><li>{"Commits: " +this.state.commits[5]}</li></ul>
        </ul>    
        <p>Total Stats:</p>
        <ul>
          <li>Issues: {issues}</li>
          <li>Commits: {commitNum}</li>
        </ul>
        <p>The following is a link to our Github:
        <a href="https://github.com/bcheung/ioDB/">Github Repo</a>
        </p>
      </div>
    );
  }
}
export default AboutPage;
