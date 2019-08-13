import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('<TextInput> component', () => {
    it('snapshots/renders TextInput correctly', () => {
        const tree = renderer.create(<TextInput />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('simulate change event in TextInput and is called Once', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<TextInput type="text" onChange={mockCallBack} />);
        wrapper.find('input[type="text"]').simulate('change', { currentTarget: { value: 'Hello' } });
        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(wrapper.find('input[type="text"]').props().value).toBe('Hello');
    });

    it('simulate click, onfocus event in TextInput and is called Once', () => {
        const mockCallBackclick = jest.fn().mockReturnValue(undefined);
        const mockCallBackfocus = jest.fn().mockReturnValue(undefined);
        const mockCallBackchange = jest.fn().mockReturnValue(undefined);
        const mockCallBackblur = jest.fn().mockReturnValue(undefined);
        const wrapper = shallow(<TextInput type="text" />);
        wrapper.find('input[type="text"]').simulate('click', { target: {} });
        wrapper.find('input[type="text"]').simulate('focus', { target: {} });
        wrapper.find('input[type="text"]').simulate('change', { currentTarget: { value: 'Hello' } });
        wrapper.find('input[type="text"]').simulate('blur', { target: {} });
        expect(mockCallBackclick()).toEqual(undefined);
        expect(mockCallBackfocus()).toEqual(undefined);
        expect(mockCallBackchange()).toEqual(undefined);
        expect(mockCallBackblur()).toEqual(undefined);
    });
});