export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  console.log('dispatch');
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}

export function getInterest(salary, lowerThreshold, upperThreshold, inflation) {
  const thresholdRange = upperThreshold - lowerThreshold;
  const salaryAboveThreshold = salary - lowerThreshold;

  const percentIntoThresholdRange = Math.max(0, Math.min(salaryAboveThreshold / thresholdRange, 1));

  return (percentIntoThresholdRange * 3) + inflation;
}

export function getMonthlyPayment(salary, threshold) {
  return Math.max((salary - threshold) * 0.09, 0);
}

export function calculateMonthBalanceChange(balance, payment, interest) {
  const postPaymentBalance = balance - payment;

  if (postPaymentBalance < 0) {
    return postPaymentBalance;
  }

  return postPaymentBalance * (1 + ((interest / 12) / 100));
}
