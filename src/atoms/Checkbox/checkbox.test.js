import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Checkbox from './Checkbox';

describe('<Checkbox> component', () => {
    it('snapshots/renders Checkbox correctly', () => {
        const tree = renderer.create(<Checkbox />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders checkobx with label', () => {
        const checkbox = mount((<Checkbox labelText='defaultcheckbox' />));
        expect(checkbox.text()).toBe('defaultcheckbox');
    });

    it('renders checkobx with default classname', () => {
        const checkbox = mount((<Checkbox />));
        expect(checkbox.find(`.${prefix}-checkbox`).hasClass('hcl-checkbox')).toBe(true);
    });

    it('renders checkbox with default unchecked', () => {
        const checkbox = mount((<Checkbox />));
        expect(checkbox.props().checked).toBeFalsy();
    });

    it('default onChange event is called in checkbox', () => {
        const mockCallBackchange = jest.fn().mockReturnValue(undefined);
        const wrapper = mount((<Checkbox />));
        wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
        expect(mockCallBackchange()).toEqual(undefined);
    });

    it('renders checkbox with default checked', () => {
        const checkbox = mount((<Checkbox checked />));
        expect(checkbox.props().checked).toBeTruthy();
    });

    it('on state change, trigger onChange event ', () => {
        const mockcallback = jest.fn();
        const checkbox = mount((<Checkbox onChange={mockcallback} />));
        expect(checkbox.find('input[type="checkbox"]').props().checked).toEqual(false);
        checkbox.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
        expect(mockcallback.mock.calls.length).toEqual(1);
    });
});