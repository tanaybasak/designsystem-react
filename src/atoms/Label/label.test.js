import React from 'react';
import renderer from 'react-test-renderer';

import Label from './Label';

it('Label renders correctly', () => {
  const tree = renderer.create(<Label />).toJSON();
  expect(tree).toMatchSnapshot();
});
