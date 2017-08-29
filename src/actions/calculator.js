export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}
