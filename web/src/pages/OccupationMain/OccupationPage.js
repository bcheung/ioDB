import React, { Component } from 'react';
import './Occupation-page.css';

class OccupationPage extends Component {
  render() {
    return (
      <div className="Links">
        <header className="OccupationMain-Header">
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
            className="Occupation1"
            href="https://www.iodb.info/occupation/ChemicalEngineers"
            target="_self"
          >
            Occupation1
          </a>
          <a
            className="Occupation2"
            href="https://www.iodb.info/occupation/DentistsGen"
            target="_self"
          >
            Occupation2
          </a>
          <a
            className="Occupation3"
            href="https://www.iodb.info/occupation/SoftwareDevSystems"
            target="_self"
          >
            Occupation3
          </a>
        </p>
      </div>
    );
  }
}

export default OccupationPage;
