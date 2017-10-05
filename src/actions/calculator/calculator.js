export function getSalaryIncrease(salary, increase) {
  return salary * (1 + (increase / 100));
}

export function getMonthlyPayment(salary, threshold) {
  return Math.max((salary - threshold) * 0.09, 0) / 12;
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
  date,
  balance,
  salary,
  lowerThreshold,
  upperThreshold,
  inflation,
  totalPaid,
  totalInterest,
  prePayment,
) {
  let paid = getMonthlyPayment(salary, lowerThreshold);
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
    date,
    salary,
    balance: newBalance,
    paid,
    totalPaid: totalPaid + paid,
    interestEarned,
    interestRate,
    totalInterest: totalInterest + interestEarned,
    thresholds: {
      lower: lowerThreshold,
      upper: upperThreshold,
    },
  };
}

export function getAnnualSummaries(data) {
  const startMonth = data[0].date.getMonth() - 3;

  const getYearSummary = (months) => ({
    years: months[0].date.getFullYear() === months[months.length - 1].date.getFullYear()
      ? String(months[0].date.getFullYear())
      : `${months[0].date.getFullYear()}/${months[months.length - 1].date.getFullYear()}`,
    endingBalance: months[months.length - 1].balance,
    interestRate: {
      april: months[0].interestRate,
      september: months[0].interestRate,
    },
    months,
    paid: months.reduce((acc, { paid }) => acc + paid, 0),
    interest: months.reduce((acc, { interestEarned }) => acc + interestEarned, 0),
    salary: months[0].salary,
    thresholds: months[0].thresholds,
    totalPaid: months[months.length - 1].totalPaid,
    totalInterest: months[months.length - 1].totalInterest,
  });

  const groupedMonths = data.reduce((acc, month, i) => {
    const yearIndex = Math.floor((i + startMonth) / 12);
    if (acc[yearIndex]) {
      acc[yearIndex].push(month);
    } else {
      acc[yearIndex] = [month];
    }
    return acc;
  }, new Array(Math.ceil(data.length / 12)));

  return groupedMonths.map(months => getYearSummary(months));
}

export default function getLoanData(balance, salary, salaryIncrease, gradYear, loanTermsData) {
  const months = [];

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let currentSalary = salary;

  const isPrePayment = (graduationYear, date) => (
    date.getFullYear() === graduationYear ||
    (date.getFullYear() - 1 === graduationYear && date.getMonth() < 4)
  );
  const getCurrentLoanTerms = (date) => {
    const searchDate = date.getFullYear() - ((date.getMonth() < 3) ? 1 : 0);
    const res = Object.assign({}, loanTermsData.find(terms => terms.year === searchDate));
    //if september, get new rpi
    if (date.getMonth() > 7) {
      res.rpi = loanTermsData.find(terms => terms.year === date.getFullYear()).rpi;
    }

    return res;
  };

  for (year; year < gradYear + 32; year += 1) {
    for (month; month < 12; month += 1) {
      //break if april of final payment year or balance is 0
      if (
        (year === gradYear + 31 && month === 3) ||
        (months.length && months[months.length - 1]).balance === 0
      ) {
        break;
      }

      //update loan terms and salary
      if (month === 3) {
        currentSalary = getSalaryIncrease(currentSalary, salaryIncrease);
      }

      const monthDate = new Date(year, month);
      let totalPaid = 0;
      let totalInterest = 0;
      let currentBalance = balance;
      const currentTerms = getCurrentLoanTerms(monthDate);

      if (months.length) {
        const latestMonth = months[months.length - 1];
        totalPaid = latestMonth.totalPaid;
        totalInterest = latestMonth.totalInterest;
        currentBalance = latestMonth.balance;
      }

      months.push(getMonthData(
        monthDate,
        currentBalance,
        currentSalary,
        currentTerms.lowerThreshold,
        currentTerms.upperThreshold,
        currentTerms.rpi,
        totalPaid,
        totalInterest,
        isPrePayment(gradYear, monthDate),
      ));
    }
    month = 0;
  }

  return {
    months,
    years: getAnnualSummaries(months),
  };
}
