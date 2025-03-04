// jest.setup.js (ESM syntax)
//globalThis.importMetaUrl = import.meta.url || 'file://';
export default {
  preset: 'react', // This preset works with React projects
  testEnvironment: 'jsdom', // Set the right environment for frontend testing
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Use Babel to transpile JS/TS files
  },
};

