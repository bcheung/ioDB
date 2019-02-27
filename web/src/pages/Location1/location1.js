import React, { Component } from 'react';
import './location1.css';

class Austin extends Component {
  render() {
    return (



      <div className="Page">
        <header className="Page-header"></header>
   
      </div>
    );
  }
}

const data = {
  info: {
    location: 'Austin-Round Rock, TX',
    meanWage: '$51,840'
  },
  occupations: {
    title: 'Occupations',
    headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean', 'Location Quotient'],
    values: [
      ['Office and Administrative Support Occupations', 430000, 175300, 38780, 1.14],
      ['Sales and Related Occupations', 410000, 113350, 47860, 1.12],
      ['Food Preparation and Serving Related Occupations', 350000, 107270, 25080, 1.16],
      ['Business and Financial Operations Occupations', 130000, 61340, 75200, 1.17],
      ['Computer and Mathematical Occupations', 150000, 60070, 90420, 2.02]
    ]

  }


}


export default Austin;