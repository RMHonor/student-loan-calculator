import React from 'react';
import { connect } from 'react-redux';


function ResultsTable(props) {
  console.log(props.data);
  return (
    <table>
      <thead>
        <tr>
          <th>
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stuff</td>
        </tr>
      </tbody>
    </table>
  );
}

function mapStateToProps({ calculator }) {
  return { data: calculator };
}

export default connect(mapStateToProps)(ResultsTable);
