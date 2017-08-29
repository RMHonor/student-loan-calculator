export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  console.log('dispatch');
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}
