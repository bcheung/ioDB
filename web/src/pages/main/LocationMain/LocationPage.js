import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Location-page.css";

class LocationPage extends Component {
  render() {
    return (
      <div>
        <form className="Search-Area">
          <input className="Location-Search" type="text" />
          <input className="Location-Button" type="submit" />
        </form>
        <p className="Buttons">
          <Link to="/location/Austin">Location1</Link>
          <Link to="/location/SanJose">Location2</Link>
          <Link to="/location/NewYork">Location3</Link>
        </p>
      </div>
    );
  }
}

export default LocationPage;
