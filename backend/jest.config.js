module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'mjs'],
  transformIgnorePatterns: [
     "/node_modules/(?!nodemailer).+\\.js$"
  ],
};

