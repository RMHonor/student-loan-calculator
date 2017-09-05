import calculate from './calculator';
import getLoanTerms from './loan-terms';

export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  // stubbed TODO
  const loanTerms = getLoanTerms(details.graduationYear, details.graduationYear + 31);
  console.log(calculate(details.loanBalance, details.salary, details.salaryIncrease, loanTerms));
  return {
    type: CALCULATE_LOAN,
    payload: details,
  };
}
