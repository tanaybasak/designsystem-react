import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import NumberInput from './NumberInput';

const numberInputComponent = (
    <NumberInput
        defaultValue={10}
        step={1}
        onChange={() => { }}
        id="numberInput2"
        label="Number Input validation"
        helperText="Optional Helper text goes here (max 100 and min 10)"
    />
)

it('Number Input renders correctly', () => {
    const tree = renderer.create(numberInputComponent).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Increment Number', () => {
    const wrapper = mount(numberInputComponent);
    expect(wrapper.find('input').props().value).toEqual(10);
    wrapper.find('.increment-btn').simulate('mouseDown');
    expect(wrapper.find('input').props().value).toEqual(11);
});

it('Decrement Number', () => {
    const wrapper = mount(numberInputComponent);
    expect(wrapper.find('input').props().value).toEqual(10);
    wrapper.find('.decrement-btn').simulate('mouseDown');
    expect(wrapper.find('input').props().value).toEqual(9);
});
