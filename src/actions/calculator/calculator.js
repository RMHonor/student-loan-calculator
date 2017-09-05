export function getSalaryIncrease(salary, increase) {
  return salary * (1 + (increase / 100));
}

export function getMonthlyPayment(monthlySalary, threshold) {
  return Math.max((monthlySalary - (threshold / 12)) * 0.09, 0);
}

export function getPrePaymentInterestRate(inflation) {
  return inflation + 3;
}

export function getInterestRate(salary, lowerThreshold, upperThreshold, inflation) {
  debugger;

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

export function getYearData(
  start,
  balance,
  salary,
  lowerThreshold,
  upperThreshold,
  aprRPI,
  septRPI,
  prePayment,
) {
  const res = {};
  const months = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];

  for (let i = start; i < 12; i += 1) {
    const prevBalance = (res[months[i - 1]] && res[months[i - 1]].balance) || balance;
    const inflation = i < 6 ? aprRPI : septRPI;

    if (prePayment) {
      res[months[i]] =
        getMonthData(prevBalance, salary, lowerThreshold, upperThreshold, inflation);
    } else {
      const interest = getPrePaymentInterestRate(inflation);
      res[months[i]] =
        getMonthData(prevBalance, 0, 0, 0, interest);
    }
  }

  return res;
}

export default function getLoanData(balance, salary, salaryIncrease, gradYear, loanTermsData) {
  const now = new Date();
  const response = {};
  // calculate balance up until april following graduation
  if (now.getFullYear() <= gradYear) {
    if (now.getFullYear() < gradYear) {
      response[now.getFullYear()] = {};
    }
  }

  return {
    balance,
    salary,
    salaryIncrease,
    loanTermsData,
  };
}
