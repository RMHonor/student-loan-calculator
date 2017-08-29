export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  console.log('dispatch');
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}

export function getMonthPayment(salary, threshold) {
  return Math.max((salary - threshold) * 0.09) / 12;
}
