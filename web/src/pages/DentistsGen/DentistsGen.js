import React, { Component } from 'react';
import './DentistsGen.css';
import { OccupationComponent } from '../../components/OccupationComponent';

class DentistsGen extends Component {
  render() {
    return (
      <OccupationComponent data={data} />
    );
  }
}

const data = {
  info: {
    occupation: 'Dentists, General',
    naics: '(29-1021)',
    description: 'Examine, diagnose, and treat diseases, injuries, and malformations of teeth and gums. May treat diseases of nerve, pulp, and other dental tissues affecting oral hygiene and retention of teeth. May fit dental appliances or provide preventive care. Excludes "Prosthodontists" (29-1024), "Orthodontists" (29-1023), "Oral and Maxillofacial Surgeons" (29-1022) and "Dentists, All Other Specialists" (29-1029).',
    meanWage: 'Annual mean wage: $174,110'
  },
  percentile: {
    title: 'Annual Percentile Wages',
    headers: [10, 25, 50, 75, 90],
    values: [69210, 104800, 151440, -1, -1]
  },
  industries: {
    headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
    values: [
      ['Ambulatory Health Care Services', '6621000', 105660, 175290, 152550],
      ['Offices of Dentists', '621200', 99490, 176630, 154130],
      ['Outpatient Care Centers', '621400', 2880, 152810, 141740],
      ['Offices of Physicians', '621100', 2760, 155690, 141730],
      ['Hospitals (including private, state, and local government hospitals)', '622000', 1850, 139020, 134250]
    ]
  },
  states: {
    headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
    values: [
      ['Hawaii', '1500000', 1.42, 700, 174070, 130080],
      ['California', '0600000', 1.33, 17130, 157890, 135490],
      ['Montana', '3000000', 1.29, 460, 161060, 139820],
      ['Arizona', '0400000', 1.25, 2620, 175310, 166990],
      ['New Jersey', '3400000', 1.25, 3880, 164310, 132190]
    ]
  },
  metropolitan: {
    headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
    values: [
      ['Northwest Florida nonmetropolitan area', '1200001', 3.21, 80, 110010, 78110],
      ['Barnstable Town, MA', '0070900', 2.67, 210, 175880, 125460],
      ['Fayetteville, NC', '0022180', 2.29, 230, 209590, 166680],
      ['Flint, MI', '0022420', 2.27, 240, 207700, 193210],
      ['Hawaii/Kauai nonmetropolitan area', '1500001', 2.09, 160, 108320, 19690]
    ]
  }
};

export default DentistsGen;
