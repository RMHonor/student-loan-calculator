export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  console.log('dispatch');
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}

export function getSalaryIncrease(salary, increase) {
  return salary * (1 + (increase / 100));
}

export function getMonthlyPayment(monthlySalary, threshold) {
  return Math.max((monthlySalary - threshold) * 0.09, 0);
}

export function getInterestRate(salary, lowerThreshold, upperThreshold, inflation) {
  const thresholdRange = upperThreshold - lowerThreshold;
  const salaryAboveThreshold = salary - lowerThreshold;

  if (salaryAboveThreshold <= 0) {
    return inflation;
  }

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

export function getMonthData(balance, salary, lowerThreshold, upperThreshold, inflation) {
  let paid = getMonthlyPayment(salary / 12, lowerThreshold);
  const interestRate = getInterestRate(salary, lowerThreshold, upperThreshold, inflation);
  let newBalance = calculateMonthBalanceChange(balance, paid, interestRate);

  //if balance cleared
  if (newBalance < 0) {
    paid += newBalance;
    newBalance = 0;
  }
  const interestEarned = newBalance - (balance - paid);

  return {
    balance: newBalance,
    paid,
    interestEarned,
    interestRate,
  };
}

// export function generateLoanData(balance, salary, loanTermsData) {
//
// }
