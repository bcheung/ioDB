import React, { Component } from 'react';
import './Industry-page.css';

class Page extends Component {
  render() {
    return (
      <div className="Links">
        <header className="IndustryMain-Header">
          <a
            className="Home-link"
            href="https://www.iodb.info/"
            target="_self"
          >
            Home
          </a>
          <a 
            className="About-link"
            href="https://www.iodb.info/about"
            target="_self"
          >
            About
          </a>
          <a
            className="Industry-link"
            href="https://www.iodb.info/industry"
            target="_self"
          >
            Industry
          </a>
          <a
            className="Occupation-link"
            href="https://www.iodb.info/occupation"
            target="_self"
          >
            Occupation
          </a>
          <a
            className="Location-link"
            href="https://www.iodb.info/location"
            target="_self"
          >
            Location
          </a>
        </header>
        <p
          className="Search-Area"
        >
          <input
            className="Industry-Search"
            type="text"
          >
          </input>
          <input
            className="Industry-Button"
            type="button"
          >
            Search
          </input>
        </p>
        <p
          className="Buttons"
        >
          <button
            className="Industry1"
          >
            Industry1
          </button>
          <button
            className="Industry2"
          >
            Industry2
          </button>
          <button
            className="Industry3"
          >
            Industry3
          </button>
        </p>
      </div>
    );
  }
}

export default Page;
