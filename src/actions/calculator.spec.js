import {
  getMonthlyPayment,
} from './calculator';

/*eslint-disable no-undef*/

describe('Loan Calculator - ', () => {
  describe('getMonthlyPayment - ', () => {
    it('should return 0 if salary below threshold', () => {
      const payment = getMonthlyPayment(1000, 1200);

      expect(payment).to.equal(0);
    });

    it('should return 0 if salary equal to threshold', () => {
      const payment = getMonthlyPayment(1000, 1000);

      expect(payment).to.equal(0);
    });

    it('should return 9 for 100 over threshold (9% over threshold)', () => {
      const payment = getMonthlyPayment(1100, 1000);

      expect(payment).to.equal(9);
    });
  });
});
