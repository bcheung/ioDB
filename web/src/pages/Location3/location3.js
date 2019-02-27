import React, { Component } from 'react';
import 'location3.css';

class NewYork extends Component {
  render() {
    return (
      <div className="Page">
        <header className="Page-header"></header>
        <body>

        <h2>New York-Newark-Jersey City, NY-NJ-PA</h2>
        <p>Annual Mean: $62,870</p>
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
            <td>1522930</td>
            <td>43870</td>
            <td>1.06</td>
            </tr>
            
            <tr>
            <td>Sales and Related Occupations</td>
            <td>410000</td>
            <td>954440</td>
            <td>53740</td>
            <td>1.01</td>
            </tr>
            
            <tr>
            <td>Food Preparation and Serving Related Occupations</td>
            <td>350000</td>
            <td>713170</td>
            <td>29000</td>
            <td>0.83</td>
            </tr>
            
            <tr>
            <td>Business and Financial Operations Occupations</td>
            <td>130000</td>
            <td>593610</td>
            <td>97410</td>
            <td>1.22</td>
            </tr>
            
            
            <tr>
            <td>Food Preparation and Serving Related Occupations</td>
            <td>250000</td>
            <td>667590</td>
            <td>68140</td>
            <td>1.17</td>
            </tr>
            
            
          </table>

        </body>
      </div>
    );
  }
}

export default NewYork;