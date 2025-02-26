// jest.config.mjs
export default {
  preset: 'node',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Transform .js, .jsx, .ts, .tsx files
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|@react-native|react-navigation)",  // Don't ignore React Native modules
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
};

