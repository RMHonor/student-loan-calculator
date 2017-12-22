module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: `${__dirname}/reports/coverage`,
  coverageReporters: ['html'],
};
