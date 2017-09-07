// year is from april that year until following march
// e.g. year: 2012 = april 2012 - march 2013
const HISTORIC_RPI = [
  {
    year: 2012,
    rpi: 3.6,
  },
  {
    year: 2013,
    rpi: 3.3,
  },
  {
    year: 2014,
    rpi: 2.5,
  },
  {
    year: 2015,
    rpi: 0.9,
  },
  {
    year: 2016,
    rpi: 1.6,
  },
  {
    year: 2017,
    rpi: 3.1,
  },
];

// assumed future RPI
const FUTURE_RPI = {
  rpi: 2.5,
};

/**
 * Returns the historic and future terms of student loans:
 * RPI - inflation based interest rate
 * Lower threshold - salary at which one has to pay student loan installments
 * Upper threshold - salary at which interest rate stops rising
 */
export default function getLoanTerms(startYear, endYear) {
  const data = [];
  const thresholds = {
    lower: 21000,
    upper: 41000,
  };

  for (let i = startYear; i <= endYear; i += 1) {
    const rpi = (HISTORIC_RPI.find(o => o.year === i) || FUTURE_RPI).rpi;

    data.push({
      year: i,
      rpi,
      lowerThreshold: thresholds.lower,
      upperThreshold: thresholds.upper,
    });

    if (i >= 2021) {
      thresholds.lower *= 1 + (rpi / 100);
      thresholds.upper *= 1 + (rpi / 100);
    }
  }

  return data;
}
