import React, { Component } from 'react';
import './Research.css';
import { IndustryComponent } from '../../components/IndustryComponent';

class Research extends Component {
  render() {
    return (
      <IndustryComponent data={data} />
    );
  }
}

const data = {
  info: {
    industry: 'Scientific Research and Development Services',
    naics: '(514700)',
    description: 'The scientific research and development services industry comprises establishments engaged in research and experimental development on a contract, consultancy or outsourced basis in the areas such as biotechnology, physical sciences, engineering sciences, life sciences and social sciences.',
    meanWage: 'Annual mean wage: $97,930',
    
  },

  industries: {
    headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
    values: [
      ['Life, Physical, and Social Science Occupations', '190000', 169500,87650],
      ['Architecture and Engineering Occupations', '170000', 101510, 104870],
      ['Management Occupations', '110000',87380, 167180],
      ['Engineers', '172000', 81540, 11330],
      ['Computer and Mathematical Occupations', '75120', 75120, 104370]
    ]
  },

};



export default Research;
