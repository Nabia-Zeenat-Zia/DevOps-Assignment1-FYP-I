// jest.config.mjs
export default {
  preset: 'react-native',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.flow$': 'babel-jest', // Add this line to handle Flow files
    '^.+\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub', //
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|react-navigation)',
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
};

