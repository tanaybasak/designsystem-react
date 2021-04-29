import React from 'react';
import Link from './Link';
import { mount } from 'enzyme';

test('render Link component', () => {
  const wrapper = mount(<Link> Link </Link>);
  expect(wrapper.find(Link).length).toBe(1);
});
