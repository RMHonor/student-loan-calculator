/*eslint-disable*/

import calculator, {
  getMonthPayment,
} from './calculator';

describe('Loan Calculator - ', () => {
  describe('getMonthPayment - ', () => {

    it('should return 0 if salary below threshold', () => {
      const payment = getMonthPayment(1000, 1200);

      expect(payment).to.equal(0);
    });

    it('should return 0 if salary equal to threshold', () => {
      const payment = getMonthPayment(1000, 1000);

      expect(payment).to.equal(0);
    });

    it('should return 9 for 1200 over threshold (9% / 12)', () => {
      const payment = getMonthPayment(2200, 1000);

      expect(payment).to.equal(9);
    });
  });
});
