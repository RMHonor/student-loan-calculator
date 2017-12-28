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

describe('Loan Calculator', () => {
  describe('getMonthlyPayment', () => {
    test('should return 0 if salary below threshold', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(10, 1200);

      expect(payment).toEqual(0);
    });

    test('should return 0 if salary equal to threshold', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(1200, 1200);

      expect(Math.round(payment)).toEqual(0);
    });

    test('should return 0.9 for 120 over threshold (9% of 10 over for each month)', () => {
      //monthly salary vs. anual threshold
      const payment = getMonthlyPayment(1320, 1200);

      //closeTo to handle floating point error
      expect(payment).toBeCloseTo(0.9, 0.001);
    });
  });

  describe('getInterestRate', () => {
    test('should return 0 if all values are 0', () => {
      const interest = getInterestRate(0, 0, 0, 0);

      expect(interest).toEqual(0);
    });

    test('should return 3 if salary below lower threshold and inflation is 3', () => {
      const interest = getInterestRate(0, 1, 2, 3);

      expect(interest).toEqual(3);
    });

    test('should return 3 if salary equal to lower threshold and inflation is 3', () => {
      const interest = getInterestRate(1, 1, 2, 3);

      expect(interest).toEqual(3);
    });

    test('should return 1.5 if salary exactly in between thresholds and inflation is 0', () => {
      const interest = getInterestRate(5, 0, 10, 0);

      expect(interest).toEqual(1.5);
    });

    test('should return 3 if salary above upper threshold and inflation is 0', () => {
      const interest = getInterestRate(10, 0, 5, 0);

      expect(interest).toEqual(3);
    });

    test('should return 3 if salary equal to upper threshold and inflation is 0', () => {
      const interest = getInterestRate(5, 0, 5, 0);

      expect(interest).toEqual(3);
    });
  });

  describe('getMonthInterestPayment', () => {
    test('should return 0 if balance is negative', () => {
      const payment = getMonthInterestPayment(-1, 0);

      expect(payment).toEqual(0);
    });

    test('should return 0 if interest is 0', () => {
      const payment = getMonthInterestPayment(100, 0);

      expect(payment).toEqual(0);
    });

    test('should return a payment of 1 on balance of 100 with 12% interest', () => {
      const payment = getMonthInterestPayment(100, 12);

      expect(payment).toEqual(1);
    });
  });

  describe('calculateMonthBalanceChange', () => {
    test('should return the same balance if payment and interest are 0', () => {
      const balance = calculateMonthBalanceChange(1000, 0, 0);

      expect(balance).toEqual(1000);
    });

    test('should return higher balance if no payment and interest applied', () => {
      const balance = calculateMonthBalanceChange(1000, 0, 12);

      expect(balance).toEqual(1010);
    });

    test('should return a 100 reduction is payment is 100 and interest is 0', () => {
      const balance = calculateMonthBalanceChange(1000, 100, 0);

      expect(balance).toEqual(900);
    });

    test('should apply payment before interest', () => {
      const balance = calculateMonthBalanceChange(1100, 100, 12);

      expect(balance).toEqual(1010);
    });

    test('should return negative value if payment higher than balance', () => {
      const balance = calculateMonthBalanceChange(100, 200, 0);

      expect(balance).toEqual(-100);
    });
  });

  describe('getSalaryIncrease', () => {
    test('should return the same if salary increase is 0', () => {
      const salary = getSalaryIncrease(100, 0);

      expect(salary).toEqual(100);
    });

    test('should return a 10 extra if 1% increase on 1000 salary', () => {
      const salary = getSalaryIncrease(1000, 1);

      expect(salary).toEqual(1010);
    });
  });

  describe('getMonthData', () => {
    test('should return the correct object when there is no salary or interest', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 1000,
        paid: 0,
        interestEarned: 0,
        interestRate: 0,
        totalPaid: 0,
        thresholds: {
          lower: 0,
          upper: 0,
        },
        totalInterest: 0,
        salary: 0,
      };

      const data = getMonthData(new Date(2017, 8), 1000, 0, 0, 0, 0, 0, 0);

      expect(data).toEqual(expected);
    });

    test('should return the correct object with salary below threshold and no interest', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 1000,
        paid: 0,
        interestEarned: 0,
        interestRate: 0,
        salary: 500,
        thresholds: {
          lower: 1000,
          upper: 2000,
        },
        totalInterest: 0,
        totalPaid: 0,
      };

      const data = getMonthData(new Date(2017, 8), 1000, 500, 1000, 2000, 0, 0, 0);

      expect(data).toEqual(expected);
    });

    test('should return the correct object with salary below threshold and interest at 12%', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 1010,
        paid: 0,
        interestEarned: 10,
        interestRate: 12,
        totalPaid: 0,
        thresholds: {
          lower: 1000,
          upper: 2000,
        },
        totalInterest: 10,
        salary: 500,
      };

      const data = getMonthData(new Date(2017, 8), 1000, 500, 1000, 2000, 12, 0, 0);

      expect(data).toEqual(expected);
    });

    test('should return the correct object with salary in between thresholds and interest at 10.5%', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 101,
        paid: 9,
        interestEarned: 1,
        interestRate: 12,
        totalPaid: 9,
        thresholds: {
          lower: 0,
          upper: 2400,
        },
        totalInterest: 1,
        salary: 1200,
      };

      const data = getMonthData(new Date(2017, 8), 109, 1200, 0, 2400, 10.5, 0, 0);

      expect(data).toEqual(expected);
    });

    test('should return the correct object with salary above upper threshold and interest at 9%', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 101,
        paid: 9,
        interestEarned: 1,
        interestRate: 12,
        totalPaid: 9,
        thresholds: {
          lower: 0,
          upper: 1000,
        },
        totalInterest: 1,
        salary: 1200,
      };

      const data = getMonthData(new Date(2017, 8), 109, 1200, 0, 1000, 9, 0, 0);

      expect(data).toEqual(expected);
    });

    test('should return the correct object if salary means clearing balance', () => {
      const expected = {
        date: new Date(2017, 8),
        balance: 0,
        paid: 1,
        interestEarned: 0,
        interestRate: 12,
        thresholds: {
          lower: 0,
          upper: 1000,
        },
        totalInterest: 0,
        totalPaid: 1,
        salary: 1200,
      };

      const data = getMonthData(new Date(2017, 8), 1, 1200, 0, 1000, 9, 0, 0);

      expect(data).toEqual(expected);
    });
  });

  describe('getLoanData', () => {
    test('should generate 30 years of data', () => {
      const data = getLoanData(40000, 4000, 3, new Date().getFullYear(), loanTerms(2016, 2047));

      //at least 360 months of data
      expect(data.months.length).toBeGreaterThan(359);
    });
  });
});
