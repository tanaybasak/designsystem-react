import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import prefix from '../../settings';
import Slider from './Slider';

describe('<Slider> component', () => {
    it('snapshots/renders Slider correctly', () => {
        const tree = renderer.create(<Slider />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('simulate change event in Slider and is called Twice', () => {
        const mockCallBack = jest.fn().mockReturnValue(55);
        const wrapper = mount(<Slider onChange={mockCallBack} withInputBox={false} />);
        wrapper.find(`.${prefix}-slider-input`).simulate('change', { currentTarget: { value: 55 } });
        expect(mockCallBack()).toBe(55);
        expect(mockCallBack.mock.calls.length).toBe(2);
        expect(mockCallBack).toHaveBeenCalledTimes(2);
        expect(wrapper.find(`.${prefix}-slider-text-input`).exists()).toBeFalsy();
    });

    it('set props in Slider and renders the same', () => {
        const wrapper = mount(<Slider withInputBox={false} />);
        wrapper.setProps({ value: 34 });
        expect(wrapper.find(`.${prefix}-slider-text-input`).exists()).toBeFalsy();
        expect(wrapper.props().value).toBe(34);
    });

    it('render Slider with inputBox by default', () => {
        const wrapper = mount(<Slider />);
        expect(wrapper.find(`.${prefix}-slider-text-input`).exists()).toBeTruthy();
    });

    it('simulate blur, onchange event in inputbox of Slider', () => {
        const wrapper = shallow(<Slider />);
        wrapper.setProps({value: 56});
        const inputBox = wrapper.find(`.${prefix}-slider-text-input`);
        inputBox.simulate('change', {currentTarget: {value: 5}});
        inputBox.simulate('blur', {currentTarget: {value: 56}});
        expect(wrapper.find(`.${prefix}-slider-text-input`).props().value).toEqual(56);
    });

    it('aceept only Number in inputbox of Slider', () => {
        const wrapper = shallow(<Slider />);
        const inputbox = wrapper.find(`.${prefix}-slider-text-input`);
        inputbox.simulate('change', {
            which:75,
            key: 'k',
            currentTarget: {
                value: 'k'
            }
        });
        expect(wrapper.find(`.${prefix}-slider-text-input`).props().value).not.toBeNaN();
    });
});