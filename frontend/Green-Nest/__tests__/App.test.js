import 'react-native';
import React from 'react';
import App from '../App';  // Path to your main App component
import renderer from 'react-test-renderer';  // For snapshot testing

it('should match snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();  // Snapshot testing
});
