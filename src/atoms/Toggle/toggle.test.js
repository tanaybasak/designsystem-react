import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Toggle from './Toggle';

describe('<Toggle> component', () => {
  it('snapshots/renders Toggle correctly', () => {
    const tree = renderer.create(<Toggle id="hellotoggle" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulate default change event in toggle', () => {
    const wrapper = shallow(<Toggle id="hellotoggle" />);
    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeFalsy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: {} });
    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeTruthy();
  });
});
