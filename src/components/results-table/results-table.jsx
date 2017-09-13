import React from 'react';
import { connect } from 'react-redux';

import './results-table.scss';

function ResultsTable(props) {
  if (!props.data) return null;

  return (
    <div className="margin--bottom--20">
      <table className="results-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Balance</th>
            <th>Salary</th>
            <th>Paid</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(year => (
            <tr key={year.years}>
              <td>{year.years}</td>
              <td>£{Math.round(year.endingBalance)}</td>
              <td>£{Math.round(year.salary)}</td>
              <td>£{Math.round(year.paid)}</td>
              <td>£{Math.round(year.interest)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function mapStateToProps({ calculator }) {
  return { data: calculator };
}

export default connect(mapStateToProps)(ResultsTable);
