module.exports = () => {
  return {
    verbose: true,
    collectCoverage: true,
    testResultsProcessor: 'jest-sonar-reporter',
  };
};
