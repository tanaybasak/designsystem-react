import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Dropdown from './Dropdown';

const items = [
  {
    id: 'option-1',
    text: 'Option 1'
  },
  {
    id: 'option-2',
    text: 'Option 2'
  },
  {
    id: 'option-3',
    text: 'Option 3'
  },
  {
    id: 'option-4',
    text: 'Option 4'
  }
];

describe('<Dropdown> component', () => {
  it('snapshots/renders Dropdown correctly', () => {
    const tree = renderer.create(<Dropdown items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('triggers click event in Dropdown', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(<Dropdown items={items} onClick={mockonclick} />);
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();
  });

  it('Arrow Up event on Dropdown button', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(<Dropdown items={items} onClick={mockonclick} />);
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);
    button.simulate('keydown', { keyCode: 38 });

    expect(dropdown.find('li').at(3).is(':focus')).toBe(true);
    dropdown.find('li').at(3).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeFalsy();
    expect(button.text()).toEqual('Option 4');
  });

  it('Arrow Down event on Dropdown button', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(<Dropdown items={items} onClick={mockonclick} />);
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);
    button.simulate('keydown', { keyCode: 40 });

    expect(dropdown.find('li').at(0).is(':focus')).toBe(true);
    dropdown.find('li').at(0).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeFalsy();
    expect(button.text()).toEqual('Option 1');
  });

  it('Navigate Item using Arrow Down', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(<Dropdown items={items} onClick={mockonclick} />);
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);

    button.simulate('keydown', { keyCode: 40 });

    let anchor = dropdown.find('li').at(0);
    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 40 });
    anchor = dropdown.find('li').at(1);

    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 40 });
    anchor = dropdown.find('li').at(2);

    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 40 });
    anchor = dropdown.find('li').at(3);

    expect(anchor.is(':focus')).toBe(true);
  });

  it('Navigate Item using Arrow Up', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(<Dropdown items={items} onClick={mockonclick} />);
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);

    button.simulate('keydown', { keyCode: 38 });

    let anchor = dropdown.find('li').at(3);
    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 38 });
    anchor = dropdown.find('li').at(2);

    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 38 });
    anchor = dropdown.find('li').at(1);

    expect(anchor.is(':focus')).toBe(true);

    anchor.simulate('keydown', { keyCode: 38 });
    anchor = dropdown.find('li').at(0);

    expect(anchor.is(':focus')).toBe(true);
  });

  it('Navigate Item using Arrow Up multiSelectDropdown', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(
      <Dropdown items={items} dropdownType="multi" onClick={mockonclick} />
    );
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);

    button.simulate('keydown', { keyCode: 38 });

    let item = dropdown.find('li').at(3);
    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 38 });
    item = dropdown.find('li').at(2);

    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 38 });
    item = dropdown.find('li').at(1);

    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 38 });
    item = dropdown.find('li').at(0);

    expect(item.is(':focus')).toBe(true);
  });

  it('Navigate Item using Arrow Down multiSelectDropdown', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(
      <Dropdown items={items} dropdownType="multi" onClick={mockonclick} />
    );
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);

    button.simulate('keydown', { keyCode: 40 });

    let item = dropdown.find('li').at(0);
    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 40 });
    item = dropdown.find('li').at(1);

    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 40 });
    item = dropdown.find('li').at(2);

    expect(item.is(':focus')).toBe(true);

    item.simulate('keydown', { keyCode: 40 });
    item = dropdown.find('li').at(3);

    expect(item.is(':focus')).toBe(true);
  });

  it('select MultiSelect Dropdown item', () => {
    const mockonclick = jest.fn();
    const dropdown = mount(
      <Dropdown items={items} dropdownType="multi" onClick={mockonclick} />
    );
    dropdown.find(`.${prefix}-dropdown-toggle`).simulate('click');
    expect(dropdown.find(`.${prefix}-dropdown-menu`).exists()).toBeTruthy();

    let button = dropdown.find(`.${prefix}-dropdown-toggle`);
    button.simulate('keydown', { keyCode: 40 });

    expect(dropdown.find('li').at(0).is(':focus')).toBe(true);
    dropdown.find('li').at(0).simulate('click');
    const input = dropdown.find('input').at(0);
    expect(input.props().checked).toBe(true);
  });
});
