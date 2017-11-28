import Highcharts from 'highcharts';

export default function (selectorID, data) {
  Highcharts.chart(selectorID, {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Balance over time',
    },
    xAxis: {
      title: {
        text: 'Date',
      },
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Balance (£)',
      },
    },
    tooltip: {
      xDateFormat: '%B %Y',
      valuePrefix: '£',
      shared: true,
      valueDecimals: 0,
    },
    series: [
      {
        data: data.map(month => [month.date.getTime(), month.balance]),
        name: 'Balance',
      },
      {
        data: data.map(month => [month.date.getTime(), month.totalPaid]),
        name: 'Total paid',
      },
    ],
  });
}