import React, { Component } from 'react';
import './Location-page.css';

class LocationPage extends Component {
  render() {
    return (
      <div className="Links">
        <header className="LocationMain-Header">
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
            className="Location1"
          >
            Location1
          </button>
          <button
            className="Location2"
          >
            Location2
          </button>
          <button
            className="Location3"
          >
            Location3
          </button>
        </p>
      </div>
    );
  }
}

export default LocationPage;
