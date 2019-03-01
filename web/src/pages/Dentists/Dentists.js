import React, { Component } from 'react';
import './Dentists.css';
import { IndustryComponent } from '../../components/IndustryComponent';


class Dentists extends Component {
  render() {
    return (
      <IndustryComponent data={data} />
    );
  }
}


const data = {
  info: {
    industry: 'Dental Industry',
    naics: '(621200)',
    description: 'Industry operators are primarily engaged in the independent practice of general or specialized dentistry or dental surgery. These practitioners operate private or group practices in their own offices (e.g. centers or clinics) or in the facilities of others, such as hospitals or HMO medical centers.',
    meanWage: 'Annual mean wage: $64,590',
    
  },
  industries: {
    headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
    values: [
      ['Healthcare Practitioners and Technical Occupations', '290000', 319720,112220],
      ['Healthcare Support Occupations', '310000', 311330, 38580, ],
      ['Other Healthcare Support Occupations', '319000', 3111270, 38580],
      ['Miscellaneous Healthcare Support', '319090', 311250, 38580],
      ['Dental Assistants', '319091', 305150, 38680]
    ]
  },
};


export default Dentists;
