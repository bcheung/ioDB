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

export default IndustryPage;
