import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Occupation-page.css";

class OccupationPage extends Component {
  render() {
    return (
      <div>
        <form className="Search-Area">
          <input className="Location-Search" type="text" />
          <input className="Location-Button" type="submit" />
        </form>
        <p className="Buttons">
          <Link to="/occupation/ChemicalEngineers">Occupation1</Link>
          <Link to="/occupation/DentistsGen">Occupation2</Link>
          <Link to="/occupation/SoftwareDevSystems">Occupation3</Link>
        </p>
      </div>
    );
  }
}

export default OccupationPage;
