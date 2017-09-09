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

export function getMonthData(
  month,
  balance,
  salary,
  lowerThreshold,
  upperThreshold,
  inflation,
  prePayment,
) {
  let paid = getMonthlyPayment(salary / 12, lowerThreshold);
  const interestRate = prePayment
    ? getPrePaymentInterestRate(inflation)
    : getInterestRate(salary, lowerThreshold, upperThreshold, inflation);
  let newBalance = calculateMonthBalanceChange(balance, paid, interestRate);

  //if balance cleared
  if (newBalance < 0) {
    paid += newBalance;
    newBalance = 0;
  }
  const interestEarned = newBalance - (balance - paid);

  return {
    month,
    balance: newBalance,
    paid,
    interestEarned,
    interestRate,
  };
}

export function getYearData(
  year,
  start,
  balance,
  salary,
  lowerThreshold,
  upperThreshold,
  aprRPI,
  septRPI,
  prePayment,
) {
  const res = {
    months: [],
    salary,
    upperThreshold,
    lowerThreshold,
  };

  const months = [
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
  ];

  for (let i = start; i < 12; i += 1) {
    const prevBalance = (res.months[i - 1] && res.months[i - 1].balance) || balance;
    const inflation = i < 6 ? aprRPI : septRPI;

    if (prePayment) {
      res.months.push(getMonthData(months[i], prevBalance, 0, 0, 0, inflation));
    } else {
      res.months.push(
        getMonthData(months[i], prevBalance, salary, lowerThreshold, upperThreshold, inflation),
      );
    }

    if (res.months[res.months.length - 1].balance === 0) {
      break;
    }
  }

  res.paid = res.months.reduce((acc, { paid }) => acc + paid, 0);
  res.interest = res.months.reduce((acc, { interestEarned }) => acc + interestEarned, 0);
  res.endingBalance = res.months[res.months.length - 1].balance;
  res.years = `${year}/${(year + 1) % 2000}`;

  return res;
}

export default function getLoanData(balance, salary, salaryIncrease, gradYear, loanTermsData) {
  const response = [];

  const now = new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 9) % 12;
  let currentSalary = salary;

  // calculate balance up until april following graduation
  if (now.getFullYear() === gradYear
    || (now.getFullYear() - 1 === gradYear && month > 9)
  ) {
    const startYear = (now.getFullYear() - 1 === gradYear && month > 9)
      ? now.getFullYear() - 1
      : now.getFullYear();
    const aprRPI = loanTermsData.find(o => o.year === now.getFullYear() - 1).rpi;
    const septRPI = loanTermsData.find(o => o.year === now.getFullYear()).rpi;

    response.push(getYearData(
      startYear,
      month,
      balance,
      currentSalary,
      0,
      1,
      aprRPI,
      septRPI,
      true,
    ));

    currentSalary = getSalaryIncrease(salary, salaryIncrease);
    month = 0;
    year += 1;
  }

  for (let i = year; i < gradYear + 31; i += 1) {
    const newBalance = response[i - 1] ? response[i - 1].endingBalance : balance;
    if (newBalance === 0) {
      break;
    }
    const currentLoanTerms = loanTermsData.find(o => o.year === i);
    const aprRPI = loanTermsData.find(o => o.year === i - 1).rpi;

    response.push(getYearData(
      i,
      month,
      newBalance,
      currentSalary,
      currentLoanTerms.lowerThreshold,
      currentLoanTerms.upperThreshold,
      aprRPI,
      currentLoanTerms.rpi,
      false,
    ));

    currentSalary = getSalaryIncrease(currentSalary, salaryIncrease);
    month = 0;
  }

  return response;
}
