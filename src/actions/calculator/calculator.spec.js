import getLoanData, {
  getMonthData,
  getSalaryIncrease,
  getInterestRate,
  getMonthInterestPayment,
  getMonthlyPayment,
  calculateMonthBalanceChange,
  getYearData,
} from './calculator';
import loanTerms from './loan-terms';

/*eslint-disable no-undef*/

describe('Loan Calculator', () => {
  describe('getMonthlyPayment', () => {
    it('should return 0 if salary below threshold', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(10, 1200);

      expect(payment).to.equal(0);
    });

    it('should return 0 if salary equal to threshold', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(100, 1200);

      expect(Math.round(payment)).to.equal(0);
    });

    it('should return 9 for 100 over threshold (9% over threshold)', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(110, 1200);

      //closeTo to handle floating point error
      expect(payment).to.be.closeTo(0.9, 0.001);
    });
  });

  describe('getInterestRate', () => {
    it('should return 0 if all values are 0', () => {
      const interest = getInterestRate(0, 0, 0, 0);

      expect(interest).to.equal(0);
    });

    it('should return 3 if salary below lower threshold and inflation is 3', () => {
      const interest = getInterestRate(0, 1, 2, 3);

      expect(interest).to.equal(3);
    });

    it('should return 3 if salary equal to lower threshold and inflation is 3', () => {
      const interest = getInterestRate(1, 1, 2, 3);

      expect(interest).to.equal(3);
    });

    it('should return 1.5 if salary exactly in between thresholds and inflation is 0', () => {
      const interest = getInterestRate(5, 0, 10, 0);

      expect(interest).to.equal(1.5);
    });

    it('should return 3 if salary above upper threshold and inflation is 0', () => {
      const interest = getInterestRate(10, 0, 5, 0);

      expect(interest).to.equal(3);
    });

    it('should return 3 if salary equal to upper threshold and inflation is 0', () => {
      const interest = getInterestRate(5, 0, 5, 0);

      expect(interest).to.equal(3);
    });
  });

  describe('getMonthInterestPayment', () => {
    it('should return 0 if balance is negative', () => {
      const payment = getMonthInterestPayment(-1, 0);

      expect(payment).to.equal(0);
    });

    it('should return 0 if interest is 0', () => {
      const payment = getMonthInterestPayment(100, 0);

      expect(payment).to.equal(0);
    });

    it('should return a payment of 1 on balance of 100 with 12% interest', () => {
      const payment = getMonthInterestPayment(100, 12);

      expect(payment).to.equal(1);
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

  describe('getMonthData', () => {
    it('should return the correct object when there is no salary or interest', () => {
      const expected = {
        month: 'Sept',
        balance: 1000,
        paid: 0,
        interestEarned: 0,
        interestRate: 0,
      };

      const data = getMonthData('Sept', 1000, 0, 0, 0, 0);

      expect(data).to.deep.equal(expected);
    });

    it('should return the correct object with salary below threshold and no interest', () => {
      const expected = {
        month: 'Sept',
        balance: 1000,
        paid: 0,
        interestEarned: 0,
        interestRate: 0,
      };

      const data = getMonthData('Sept', 1000, 500, 1000, 2000, 0);

      expect(data).to.deep.equal(expected);
    });

    it('should return the correct object with salary below threshold and interest at 12%', () => {
      const expected = {
        month: 'Sept',
        balance: 1010,
        paid: 0,
        interestEarned: 10,
        interestRate: 12,
      };

      const data = getMonthData('Sept', 1000, 500, 1000, 2000, 12);

      expect(data).to.deep.equal(expected);
    });

    it('should return the correct object with salary inbetween thresholds and interest at 10.5%', () => {
      const expected = {
        month: 'Sept',
        balance: 101,
        paid: 9,
        interestEarned: 1,
        interestRate: 12,
      };

      const data = getMonthData('Sept', 109, 1200, 0, 2400, 10.5);

      expect(data).to.deep.equal(expected);
    });

    it('should return the correct object with salary above upper threshold and interest at 9%', () => {
      const expected = {
        month: 'Sept',
        balance: 101,
        paid: 9,
        interestEarned: 1,
        interestRate: 12,
      };

      const data = getMonthData('Sept', 109, 1200, 0, 1000, 9);

      expect(data).to.deep.equal(expected);
    });

    it('should return the correct object if salary means clearing balance', () => {
      const expected = {
        month: 'Sept',
        balance: 0,
        paid: 1,
        interestEarned: 0,
        interestRate: 12,
      };

      const data = getMonthData('Sept', 1, 1200, 0, 1000, 9);

      expect(data).to.deep.equal(expected);
    });
  });

  describe('getYearData', () => {
    it('should contain a full year of months', () => {
      const data = getYearData(0, 40000, 30000, 21000, 41000, 1.6, 3.1);

      expect(data.months.length).to.equal(12);
    });
  });

  describe('getLoanData', () => {
    it('should generate up to 30 years of data', () => {
      const data = getLoanData(40000, 40000, 3, 2016, loanTerms(2016, 2047));

      console.log(data['2030']);
    });
  })
});
