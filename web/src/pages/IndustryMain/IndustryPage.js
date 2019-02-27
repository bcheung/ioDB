import React, { Component } from 'react';
import './Industry-page.css';

class IndustryPage extends Component {
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
        <form
          className="Search-Area"
        >
          <input
            className="Location-Search"
            type="text"
          />
          <input 
            className="Location-Button"
            type="submit"
          />
        </form>
        <p
          className="Buttons"
        >
          <a
            className="Industry1"
            href="https://www.iodb.info/industry/Dentists"
            target="_self"
          >
            Industry1
          </a>
          <a
            className="Industry2"
            href="https://www.iodb.info/industry/CEManufacturing"
            target="_self"
          >
            Industry2
          </a>
          <a
            className="Industry3"
            href="https://www.iodb.info/industry/Research"
            target="_self"
          >
            Industry3
          </a>
        </p>
      </div>
    );
  }
}

export default IndustryPage;
