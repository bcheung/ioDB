import React, { Component } from 'react';

const IndustryComponent = ({ data: { info, industries } }) => {

  
 
  const industryHeaders = industries.headers.map((col) =>
    <th>{col}</th>
  );
  const industryData = industries.values.map((row) =>
    <tr>
      <td>{row[0]}</td>
      <td>{row[1]}</td>
      <td>{row[2]}</td>
      <td>{
        new Intl.NumberFormat('en-US',{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(row[3])}
      </td>
    </tr>
  );
  
  

 


  return (
    <div style={styles.divStyle} className="IndustryComponent">
      <header style={styles.headerStyle} className="IndustryComponent-header">{info.occupation} {info.naics}</header>
      <body>{info.description}</body>
      <body>{info.meanWage}</body>
      <br/>
      <br/>
      <table>
        <tr>{industryHeaders}</tr>
        {industryData}
      </table>
      
     
    </div>
  );
};

const styles = {
  divStyle: {
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'center',
    align: 'center',
    width: 1000
  },
  headerStyle: {

  }
};

export {IndustryComponent};