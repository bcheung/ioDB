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
          <button
            className="Occupation1"
          >
            Occupation1
          </button>
          <button
            className="Occupation2"
          >
            Occupation2
          </button>
          <button
            className="Occupation3"
          >
            Occupation3
          </button>
        </p>
      </div>
    );
  }
}

export default OccupationPage;
