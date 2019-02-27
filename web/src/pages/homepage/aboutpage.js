import React, { Component } from 'react';
import './about-page.css';
import axios from 'axios'

//Include logo
//Include links to About, Industry, Location, Occupation

class AboutPage extends Component {
  constructor(){
    super();
    this.state={
      commits: 0,
    }
    var people = [
      {
        "name": "Cooper Travis",
        "github": "CooperTravis",
      },
      {
        "name": "Johnny Gabriel",
        "github": "jmgabriel96",
      },
      {
        "name": "Brooke Paxman",
        "github": "brookepaxman",
      },
      {
        "name": "Sean Wang",
        "github": "wang-sz",
      },
      {
        "name": "David Terral",
        "github": "dterral504",
      },
      {
        "name": "Brian Cheung",
        "github": "b-cheung",
      }
    ];
  }

  componentDidMount(){
    const url  = "https://api.github.com/repos/bcheung/ioDB/commits"
    fetch(url)
    .then((results) => results.json())
    .then(data => {
      console.log(data, "componentDidMount");
      this.setState({ commits: data.length })
  });
  }


 render() {
   const { commits }  = this.state;
   console.log(commits, "render");
    return (
      // <ul>
      //   {commits.map(com =>
      //   <li key = {com.objectID}>
      //   </li>
      //   )}
      // </ul>  
      <div>{commits}</div>  
    );
  }
}

export default AboutPage;
