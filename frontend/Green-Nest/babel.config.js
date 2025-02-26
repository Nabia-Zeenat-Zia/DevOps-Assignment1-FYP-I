export default {
  presets: [
    ['@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@@babel/plugin-transform-runtime', { loose: true }],
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};


