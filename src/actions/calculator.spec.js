import {
  getSalaryIncrease,
  getInterest,
  getMonthlyPayment,
  calculateMonthBalanceChange,
} from './calculator';

/*eslint-disable no-undef*/

describe('Loan Calculator', () => {
  describe('getMonthlyPayment', () => {
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

  describe('getSalaryDependentInterestRate', () => {
    it('should return 3 if salary below lower threshold and inflation is 3', () => {
      const interest = getInterest(0, 1, 2, 3);

      expect(interest).to.equal(3);
    });

    it('should return 3 if salary equal to lower threshold and inflation is 3', () => {
      const interest = getInterest(1, 1, 2, 3);

      expect(interest).to.equal(3);
    });

    it('should return 1.5 if salary exactly in between thresholds and inflation is 0', () => {
      const interest = getInterest(5, 0, 10, 0);

      expect(interest).to.equal(1.5);
    });

    it('should return 3 if salary above upper threshold and inflation is 0', () => {
      const interest = getInterest(10, 0, 5, 0);

      expect(interest).to.equal(3);
    });

    it('should return 3 if salary equal to upper threshold and inflation is 0', () => {
      const interest = getInterest(5, 0, 5, 0);

      expect(interest).to.equal(3);
    });
  });

  describe('calculateMonthBalanceChange', () => {
    it('should return the same balance if payment and interest are 0', () => {
      const balance = calculateMonthBalanceChange(1000, 0, 0);

      expect(balance).to.equal(1000);
    });

    it('should return higher balance if no payment and interest applied', () => {
      const balance = calculateMonthBalanceChange(1000, 0, 12);

      expect(balance).to.equal(1010);
    });

    it('should return a 100 reduction is payment is 100 and interest is 0', () => {
      const balance = calculateMonthBalanceChange(1000, 100, 0);

      expect(balance).to.equal(900);
    });

    it('should apply payment before interest', () => {
      const balance = calculateMonthBalanceChange(1100, 100, 12);

      expect(balance).to.equal(1010);
      expect(balance).to.not.equal(1011);
    });

    it('should return negative value if payment higher than balance', () => {
      const balance = calculateMonthBalanceChange(100, 200, 0);

      expect(balance).to.equal(-100);
    });
  });

  describe('getSalaryIncrease', () => {
    it('should return the same if salary increase is 0', () => {
      const salary = getSalaryIncrease(100, 0);

      expect(salary).to.equal(100);
    });

    it('should return a 10 extra if 1% increase on 1000 salary', () => {
      const salary = getSalaryIncrease(1000, 1);

      expect(salary).to.equal(1010);
    });
  });
});
