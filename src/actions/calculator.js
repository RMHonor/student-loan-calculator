export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  console.log('dispatch');
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}

// export function getMonthData(balance, salary, lowerThreshold, upperThreshold, inflation) {
  // const payment = getMonthlyPayment()
  // return {
  //   balance: calculateMonthBalanceChange(balance, )
  // }
// }

export function getSalaryIncrease(salary, increase) {
  return salary * (1 + (increase / 100));
}

export function getMonthlyPayment(monthlySalary, threshold) {
  return Math.max((monthlySalary - threshold) * 0.09, 0);
}

export function getInterestRate(salary, lowerThreshold, upperThreshold, inflation) {
  const thresholdRange = upperThreshold - lowerThreshold;
  const salaryAboveThreshold = salary - lowerThreshold;

  const percentIntoThresholdRange = Math.max(0, Math.min(salaryAboveThreshold / thresholdRange, 1));

  return (percentIntoThresholdRange * 3) + inflation;
}

export function getMonthInterestPayment(balance, interest) {
  return Math.max(balance * ((interest / 12) / 100), 0);
}

export function calculateMonthBalanceChange(balance, payment, interest) {
  const postPaymentBalance = balance - payment;

  return postPaymentBalance + getMonthInterestPayment(postPaymentBalance, interest);
}
