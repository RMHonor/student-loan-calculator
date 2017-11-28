import React, { Component } from 'react';
import { connect } from 'react-redux';

import paintGraph from './paint-graph';

import './results-graph.scss';

const CHART_ID = 'chart-container';

class ResultsGraph extends Component {
  // componentDidMount() {
  //   paintGraph(CHART_ID, this.props.data.months);
  // }

  componentDidUpdate() {
    paintGraph(CHART_ID, this.props.data.months);
  }

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
    const years = Math.floor(data.months.length / 12);
    const months = (data.months.length % 12) - 1;

    const now = new Date();
    const finishDate = new Date(now.getFullYear() + years, now.getMonth() + months);

    return (
      <span className="results-graph__text">
        Your loan will be paid off by {monthNames[finishDate.getMonth()]} {finishDate.getFullYear()}
        ({years} years and {months} months)
      </span>
    );
  }

  render() {
    if (!this.props.data) return null;

    return (
      <div className="row results-graph">
        <div className="col-md-8">
          <div id={CHART_ID} className="results-graph__container" />
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
