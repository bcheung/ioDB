import React, { Component } from 'react';
import './location2.css';

class SanJose extends Component {
  render() {
    return (
      <div className="Page">
        <header className="Page-header"></header>
        <body>

        <h2>San Jose-Sunnyvale-Santa Clara, CA</h2>
        <p>Annual Mean: $77,180</p>
        <p>Occupations</p>

        <table style="width:100%">
            <tr>
            <th>Occupation</th>
            <th>SOC</th> 
            <th>Employment</th>
            <th>Annual Mean</th>
            <th>Location Quotient</th>
            
            </tr>
            <tr>
            <td>Office and Administrative Support Occupations</td>
            <td>430000</td>
            <td>135970</td>
            <td>48050</td>
            <td>0.81</td>
            </tr>
            
            <tr>
            <td>Sales and Related Occupations</td>
            <td>410000</td>
            <td>99190</td>
            <td>55290</td>
            <td>0.89</td>
            </tr>
            
            <tr>
            <td>Food Preparation and Serving Related Occupations</td>
            <td>350000</td>
            <td>82000</td>
            <td>29730</td>
            <td>0.81</td>
            </tr>
            
            <tr>
            <td>Management Occupations</td>
            <td>110000</td>
            <td>84760</td>
            <td>163380</td>
            <td>1.52</td>
            </tr>
            
            
            <tr>
            <td>Computer and Mathematical Occupations</td>
            <td>150000</td>
            <td>132140</td>
            <td>122900</td>
            <td>4.06</td>
            </tr>
            
            
        </table>

        </body>
        </div>
    );
  }
}

export default SanJose;