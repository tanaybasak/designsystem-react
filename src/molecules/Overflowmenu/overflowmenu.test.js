import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Overflowmenu from './Overflowmenu';

describe('<Overflowmenu> component', () => {
  it('snapshots/renders Overflowmenu correctly', () => {
    const tree = renderer
      .create(<Overflowmenu listItems={overflowlist} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('triggers click event in Overflowmenu', () => {
    const mockonclick = jest.fn();
    const overflowmenu = mount(
      <Overflowmenu listItems={overflowlist} onClick={mockonclick} />
    );
    overflowmenu.find(`.${prefix}-ellipsis`).simulate('click');
    expect(overflowmenu.find(`.${prefix}-overflow-menu`).exists()).toBeTruthy();
  });

  it('select option on click', () => {
    const mockonclick = jest.fn();
    const overflowmenu = mount(
      <Overflowmenu listItems={overflowlist} onClick={mockonclick} />
    );
    overflowmenu.find(`.${prefix}-ellipsis`).simulate('click');
    expect(overflowmenu.find(`.${prefix}-overflow-menu`).exists()).toBeTruthy();
    overflowmenu.find('button').at(0).simulate('click');
    expect(overflowmenu.find(`.${prefix}-overflow-menu`).exists()).toBeFalsy();
  });

  it('Navigate Item using Arrow Down', () => {
    const mockonclick = jest.fn();
    const overflowmenu = mount(
      <Overflowmenu listItems={overflowlist} onClick={mockonclick} />
    );
    overflowmenu.find(`.${prefix}-ellipsis`).simulate('click');
    expect(overflowmenu.find(`.${prefix}-overflow-menu`).exists()).toBeTruthy();

    let button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(0);
    expect(button.is(':focus')).toBe(true);

    button.simulate('keydown', { keyCode: 40 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(1);
    expect(button.is(':focus')).toBe(true);
    expect(button.hasClass(`${prefix}-overflow-option-danger`)).toBeTruthy();

    button.simulate('keydown', { keyCode: 40 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(2);
    expect(button.is(':focus')).toBe(true);
    expect(button.hasClass(`${prefix}-overflow-option-separator`)).toBeTruthy();

    button.simulate('keydown', { keyCode: 40 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(3);
    expect(button.is(':focus')).toBe(false);
    expect(button.hasClass(`${prefix}-overflow-option-disabled`)).toBeTruthy();

    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(4);

    expect(button.is(':focus')).toBe(true);
    expect(overflowmenu.find('a')).toBeTruthy();
  });

  it('Navigate Item using Arrow Up', () => {
    const mockonclick = jest.fn();
    const overflowmenu = mount(
      <Overflowmenu listItems={overflowlist} onClick={mockonclick} />
    );
    overflowmenu.find(`.${prefix}-ellipsis`).simulate('click');
    expect(overflowmenu.find(`.${prefix}-overflow-menu`).exists()).toBeTruthy();

    let button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(0);
    expect(button.is(':focus')).toBe(true);

    button.simulate('focus');
    button.simulate('keydown', { keyCode: 38 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(4);

    expect(button.is(':focus')).toBe(true);
    expect(overflowmenu.find('a')).toBeTruthy();

    button.simulate('focus');
    button.simulate('keydown', { keyCode: 38 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(3);

    expect(button.is(':focus')).toBe(false);
    expect(button.hasClass(`${prefix}-overflow-option-disabled`)).toBeTruthy();

    button.simulate('focus');
    button.simulate('keydown', { keyCode: 38 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(2);

    expect(button.is(':focus')).toBe(true);
    expect(button.hasClass(`${prefix}-overflow-option-separator`)).toBeTruthy();

    button.simulate('focus');
    button.simulate('keydown', { keyCode: 38 });
    button = overflowmenu.find(`.${prefix}-overflow-option-item`).at(1);

    expect(button.is(':focus')).toBe(true);
    expect(button.hasClass(`${prefix}-overflow-option-danger`)).toBeTruthy();
  });
});
