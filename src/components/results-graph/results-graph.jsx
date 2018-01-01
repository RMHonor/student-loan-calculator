import React, { Component } from 'react';
import { connect } from 'react-redux';

import paintGraph from './paint-graph';

import './results-graph.scss';

const CHART_ID = 'chart-container';

class ResultsGraph extends Component {
  componentDidUpdate() {
    paintGraph(CHART_ID, this.props.data);
  }

  getPaidOffDateText(data) {
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
    const months = (data.length - 1) % 12;

    return `
      ${monthNames[data[data.length - 1].date.getMonth()]}
      ${data[data.length - 1].date.getFullYear()}
      (${years} years${months ? ` ${months} month` : ''}${months > 1 ? 's' : ''})
    `;
  }

  render() {
    if (!this.props.data) return null;

    return (
      <div className="results-graph">
        <hr />
        <figure className="results-graph__container" >
          <figcaption className="results-graph__caption margin--bottom--35">
            Date of final payment: <br />
            {this.getPaidOffDateText(this.props.data)}
          </figcaption>
          <hr />
          <div className="margin--top--25" id={CHART_ID} />
        </figure>
      </div>
    );
  }
}

function mapStateToProps({ calculator }) {
  return { data: calculator && calculator.months };
}

export default connect(mapStateToProps)(ResultsGraph);
