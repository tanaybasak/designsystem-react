import React from 'react';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Slideout from './Slideout';

const actions = [
  { label: 'Save' },
  {
    label: 'Close',
    handler: () => {
      this.onModalClose();
    },
    danger: true
  }
];

describe('<Radio> component', () => {
  it('renders slideout with header text', () => {
    const slideout = mount(
      <Slideout isOpen header={`header here`} type={`default`} />
    );
    expect(slideout.find(`.${prefix}-slideout-header`).text()).toBe(
      'header here'
    );
  });

  it('renders slideout with footer actions presence', () => {
    const wrapper = mount(
      <Slideout
        isOpen
        header={`header here`}
        type={`default`}
        actions={actions}
      />
    );
    let r = wrapper.props();
    expect(r.actions).toBe(actions);
  });
});
