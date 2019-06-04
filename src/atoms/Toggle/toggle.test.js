import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Toggle from './Toggle';

describe('<Toggle> component', () => {
    it('snapshots/renders Toggle correctly', () => {
        const tree = renderer.create(<Toggle id="hellotoggle"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('renders checkobx with label', () => {
    //     const checkbox = mount((<Toggle labelText='defaultcheckbox' />));
    //     expect(checkbox.text()).toBe('defaultcheckbox');
    // });

    // it('renders checkobx with default classname', () => {
    //     const checkbox = mount((<Toggle />));
    //     expect(checkbox.find(`.${prefix}-checkbox`).hasClass('hcl-checkbox')).toBe(true);
    // });
});