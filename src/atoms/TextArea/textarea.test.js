import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextArea from './TextArea';

describe('<TextArea> component', () => {
  it('snapshots/renders TextArea correctly', () => {
    const tree = renderer.create(<TextArea />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulate change event in TextArea and is called Once', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<TextArea type="text" onChange={mockCallBack} />);
    wrapper
      .find('textarea')
      .simulate('change', { currentTarget: { value: 'Hello' } });
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(wrapper.find('textarea').props().value).toBe('Hello');
  });

  it('simulate click, onfocus event in TextArea and is called Once', () => {
    const mockCallBackclick = jest.fn().mockReturnValue(undefined);
    const mockCallBackfocus = jest.fn().mockReturnValue(undefined);
    const mockCallBackchange = jest.fn().mockReturnValue(undefined);
    const mockCallBackblur = jest.fn().mockReturnValue(undefined);
    const wrapper = shallow(<TextArea type="text" />);
    wrapper.find('textarea').simulate('click', { target: {} });
    wrapper.find('textarea').simulate('focus', { target: {} });
    wrapper
      .find('textarea')
      .simulate('change', { currentTarget: { value: 'Hello' } });
    wrapper.find('textarea').simulate('blur', { target: {} });
    expect(mockCallBackclick()).toEqual(undefined);
    expect(mockCallBackfocus()).toEqual(undefined);
    expect(mockCallBackchange()).toEqual(undefined);
    expect(mockCallBackblur()).toEqual(undefined);
  });
});
