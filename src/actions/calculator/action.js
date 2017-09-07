import calculate from './calculator';
import getLoanTerms from './loan-terms';

export const CALCULATE_LOAN = 'calculate_loan';

export default function (details) {
  const loanTerms = getLoanTerms(+details.gradYear, +details.gradYear + 31);
  const payload =
    calculate(+details.loan, +details.salary, +details.salaryInc, +details.gradYear, loanTerms);
  return {
    type: CALCULATE_LOAN,
    payload,
  };
}
