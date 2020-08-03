import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Password from './Password';

describe('<Password> component', () => {
  it('snapshots/renders Password correctly', () => {
    const tree = renderer.create(<Password />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulate change event in Password and is called Once', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<Password onChange={mockCallBack} />);
    wrapper
      .find('input[type="password"]')
      .simulate('change', { currentTarget: { value: 'Hello' } });
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(wrapper.find('input[type="password"]').props().value).toBe('Hello');
  });

  it('simulate click, onfocus event in Password and is called Once', () => {
    const mockCallBackclick = jest.fn().mockReturnValue(undefined);
    const mockCallBackfocus = jest.fn().mockReturnValue(undefined);
    const mockCallBackchange = jest.fn().mockReturnValue(undefined);
    const mockCallBackblur = jest.fn().mockReturnValue(undefined);
    const wrapper = shallow(<Password />);
    wrapper.find('input[type="password"]').simulate('click', { target: {} });
    wrapper.find('input[type="password"]').simulate('focus', { target: {} });
    wrapper
      .find('input[type="password"]')
      .simulate('change', { currentTarget: { value: 'Hello' } });
    wrapper.find('input[type="password"]').simulate('blur', { target: {} });
    expect(mockCallBackclick()).toEqual(undefined);
    expect(mockCallBackfocus()).toEqual(undefined);
    expect(mockCallBackchange()).toEqual(undefined);
    expect(mockCallBackblur()).toEqual(undefined);
  });
});
