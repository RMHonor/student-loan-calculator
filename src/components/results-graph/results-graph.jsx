import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultsGraph extends Component {
  renderPaidOffDate(data) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const years = data.length - 1;
    const months = data[data.length - 1].months.length;

    const now = new Date();
    const finishDate = new Date(now.getFullYear() + years, now.getMonth() + months);

    return (
      <p className="results-graph__text">
        Your loan will be paid off by {monthNames[finishDate.getMonth()]} {finishDate.getFullYear()}
        ({years} years and {months} months)
      </p>
    );
  }

  render() {
    return (
      <div className="row results-graph">
        <div className="col-md-8">
          Graph
        </div>
        <div className="col-md-4">
          {this.renderPaidOffDate(this.props.data)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ calculator }) {
  return { data: calculator };
}

export default connect(mapStateToProps)(ResultsGraph);
