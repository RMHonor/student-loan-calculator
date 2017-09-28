import { select } from 'd3-selection';

export default function (node, data) {
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

  select(node);
}
