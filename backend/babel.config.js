export default {
  presets: [
    "@babel/preset-env", // For general JS transformation
    "@babel/preset-react", // For React support
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs", // For handling ESM
  ],
};

