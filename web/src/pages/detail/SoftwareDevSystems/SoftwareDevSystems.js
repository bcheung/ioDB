import React, { Component } from 'react';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './SoftwareDevSystems.css';

class SoftwareDevSystems extends Component {
  render() {
    return (
      <OccupationComponent data={data} />
    );
  }
}

const data = {
  info: {
    occupation: 'Software Developers, Systems Software',
    naics: '(15-1133)',
    description: 'Research, design, develop, and test operating systems-level software, compilers, and network distribution software for medical, industrial, military, communications, aerospace, business, scientific, and general computing applications. Set operational specifications and formulat and analyze software requirements. May design embedded systems software. Apply principles and techniques of computer science, engineering, and mathematical analysis.',
    meanWage: 'Annual mean wage: $111,780'
  },
  percentile: {
    title: 'Annual Percentile Wages',
    headers: [10, 25, 50, 75, 90],
    values: [65670, 84290, 107600, 135740, 164150]
  },
  industries: {
    headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
    values: [
      ['Professional, Scientific, and Technical Services', '541000', 170630, 111840, 107060],
      ['Computer Systems Design and Related Services', '541500', 123240, 110970, 106180],
      ['Computer and Electronic Product Manufacturing', '334000', 48060, 119270, 116710],
      ['Publishing Industries (except Internet)', '511000', 24510, 112080, 108420],
      ['Software Publishers', '511200', 22980, 112110, 108610]
    ]
  },
  states: {
    headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
    values: [
      ['Massachusetts', '2500000', 2.72, 26560, 114900, 112880],
      ['Virginia', '5100000', 2.35, 24650, 121560, 119430],
      ['Maryland', '2400000', 2.04, 15030, 118330, 114660],
      ['Colorado', '0800000', 1.87, 13260, 122170, 115110],
      ['California', '0600000', 1.79, 82630, 127230, 124190]
    ]
  },
  metropolitan: {
    headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
    values: [
      ['Lowell-Billerica-Chelmsford, MA-NH NECTA Division', '0074804', 8.27, 3560, 126090, 123910],
      ['San Jose-Sunnyvale-Santa Clara, CA', '0041940', 7.99, 24070, 141890, 139960],
      ['Framingham, MA NECTA Division', '0073104', 6.97, 3330, 110680, 110240],
      ['California-Lexington Park, MD', '0015680', 5.97, 750, 112190, 111060],
      ['Palm Bay-Melbourne-Titusville, FL', '0037340', 4.22, 2420, 111000, 109860]
    ]
  }
};

export default SoftwareDevSystems;
