// jest.config.mjs
export default {
  testEnvironment: 'node',  // Correct way to set up Jest for a Node.js backend
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',  // Correct regex for transforming files
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|@react-native|react-navigation)",  // Keep if using React Native (Remove if unnecessary)
  ],
  globals: {
    __DEV__: true,
  },
};

