import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

export default function (node, data, aspectRatio) {
  //TODO streamline this
  const maxBalance = data.reduce((maxBalanceAcc, { months }) => (
    Math.max(
      maxBalanceAcc,
      months.reduce(
        (maxBalanceInYear, month) => Math.max(maxBalanceInYear, month.balance),
        0,
      ),
    )
  ), 0);
  const monthCount = ((data.length - 1) * 12) + data[data.length - 1].months.length;

  const height = 100;
  const width = height * aspectRatio;
  const margins = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  const xScale = scaleLinear()
    .domain([0, monthCount])
    .range([0, width - (margins.left + margins.right)]);
  const yScale = scaleLinear()
    .domain([0, maxBalance])
    .range([0, height - (margins.top + margins.bottom)]);

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale);

  select(node)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`)
      .attr('class', 'graph-svg__yaxis')
      .call(yAxis);

  select(node)
    .append('g')
      .attr('class', 'graph-svg__xaxis')
      .call(xAxis)
      .attr('transform', `translate(${margins.left}, ${height - margins.bottom})`);
}
