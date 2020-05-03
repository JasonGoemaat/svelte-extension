module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['spec'],
  "setupFiles": [
    "./spec/__setups__/localStorage.ts"
  ]
};