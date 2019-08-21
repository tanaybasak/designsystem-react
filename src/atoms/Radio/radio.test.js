import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Radio from './Radio';

describe('<Radio> component', () => {
    it('snapshots/renders Radio correctly', () => {
        const tree = renderer.create(<Radio />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders radio with label', () => {
        const radio = mount((<Radio labelText="defaultradio" />));
        expect(radio.text()).toBe('defaultradio');
    });

    it('renders radio with default classname', () => {
        const radio = mount((<Radio />));
        expect(radio.find(`.${prefix}-radio`).hasClass('hcl-radio')).toBe(true);
    });

    it('renders radio with default unchecked', () => {
        const radio = mount((<Radio />));
        expect(radio.props().checked).toBeFalsy();
    });

    it('renders radio with default checked', () => {
        const radio = mount((<Radio checked />));
        expect(radio.props().checked).toBeTruthy();
    });

    it('on state change, trigger onChange event ', () => {
        const mockcallback = jest.fn();
        const radio = mount((<Radio onChange={mockcallback} />));
        expect(radio.find('input[type="radio"]').props().checked).toEqual(false);
        radio.find('input[type="radio"]').simulate('change', { target: { checked: true } });
        expect(mockcallback.mock.calls.length).toEqual(1);
    });
});