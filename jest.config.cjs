module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@commonTypes/(.*)$': '<rootDir>/src/commonTypes/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}; 