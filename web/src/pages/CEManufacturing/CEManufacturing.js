import React, { Component } from 'react';
import './CEManufacturing.css';
import { OccupationComponent } from '../../components/OccupationComponent';

class CEManufacturing extends Component {

  //TODO AFTER CLASS: TEST ON YARN, SEE IF IT'S GOOD,
  //THEN DO FOR THE OTHER 3 PAGES
  //THEN PUSH TO GIT AND BE DONE

  /* Problem:
  1. Git pull doesn't work for reactRouter
  2. IndustryComponent is a bit confusing
  3. How do we test this on local machine?

  Status:

  Have all of the main js files completed.
  Have a basic understanding of the component industry
  */
  render() {
    return (
      <IndustryComponent data={data} />
    );


  }
}


const data = {
  info: {
    industry: 'Computer and Electronic Manufacturing',
    naics: '(33-400)',
    description: 'The computer and electronic product manufacturing industry produces computers, computer peripherals, communications equipment, and similar electronic products. These products are used in homes and businesses, as well as in government and military establishments. In addition, many electronics products or components are incorporated into other industries’ products, such as cars, toys, and appliances.',
    meanWage: 'Annual mean wage: $79,820',
    
  },
  // percentile: {
  //   title: 'Annual Percentile Wages',
  //   headers: [10, 25, 50, 75, 90],
  //   values: [65670, 84290, 107600, 135740, 164150]
  // },
  industries: {
    headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
    values: [
      ['Production Occupations', '510000', 290600,38770],
      ['Architecture and Engineering Occupations', '170000', 222880, 110970, 93960],
      ['Engineers', '334000', 172000, 160910, 106580],
      ['Assemblers and Fabricators', '512000', 158150, 34040],
      ['Computer and Mathematical Occupations', '150000', 139950, 107560]
    ]
  },
  // states: {
  //   headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
  //   values: [
  //     ['Massachusetts', '2500000', 2.72, 26560, 114900, 112880],
  //     ['Virginia', '5100000', 2.35, 24650, 121560, 119430],
  //     ['Maryland', '2400000', 2.04, 15030, 118330, 114660],
  //     ['Colorado', '0800000', 1.87, 13260, 122170, 115110],
  //     ['California', '0600000', 1.79, 82630, 127230, 124190]
  //   ]
  // },
  // metropolitan: {
  //   headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
  //   values: [
  //     ['Lowell-Billerica-Chelmsford, MA-NH NECTA Division', '0074804', 8.27, 3560, 126090, 123910],
  //     ['San Jose-Sunnyvale-Santa Clara, CA', '0041940', 7.99, 24070, 141890, 139960],
  //     ['Framingham, MA NECTA Division', '0073104', 6.97, 3330, 110680, 110240],
  //     ['California-Lexington Park, MD', '0015680', 5.97, 750, 112190, 111060],
  //     ['Palm Bay-Melbourne-Titusville, FL', '0037340', 4.22, 2420, 111000, 109860]
  //   ]
  // }
};


export default CEManufacturing;
