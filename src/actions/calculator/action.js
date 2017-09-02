import calculate from './calculator';

export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  // stubbed TODO
  console.log(calculate(0, 0, 0));
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}
