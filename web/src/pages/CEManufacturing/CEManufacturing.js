import React, { Component } from 'react';
import './CEManufacturing.css';
import { IndustryComponent } from '../../components/IndustryComponent';

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
};


export default CEManufacturing;
