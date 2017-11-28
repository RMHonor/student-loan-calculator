import React, { Component } from 'react';
import { connect } from 'react-redux';

import paintGraph from './paint-graph';

import './results-graph.scss';

const CHART_ID = 'chart-container';

class ResultsGraph extends Component {
  componentDidUpdate() {
    paintGraph(CHART_ID, this.props.data.months);
  }

  getPaidOffDateString(data) {
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
    const years = Math.floor(data.length / 12);
    const months = (data.length - 2) % 12;
    return `
        Your loan will be paid off by ${monthNames[data[0].date.getMonth()]} ${data[0].date.getFullYear()}
        (${years} years and ${months} month${months !== 1 ? 's' : ''})
      `;
  }

  render() {
    if (!this.props.data) return null;

    return (
      <div className="results-graph">
        <figure>
          <figcaption className="results-graph__caption">
            {this.getPaidOffDateString(this.props.data.months)}
          </figcaption>
          <div id={CHART_ID} className="results-graph__container" />
        </figure>
      </div>
    );
  }
}

function mapStateToProps({ calculator }) {
  return { data: calculator };
}

export default connect(mapStateToProps)(ResultsGraph);
