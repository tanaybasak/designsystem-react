/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const keyListener = e => {
  const keycode = e.keycode || e.which;

  if (keycode === 37) {
    e.preventDefault();
    focusNode(e.target, 'previous');
  } else if (e.keyCode === 39) {
    e.preventDefault();
    focusNode(e.target, 'next');
  }
  if (e.keyCode === 13 || e.keyCode === 32) {
    e.preventDefault();
    e.target.click();
  }
};

const focusNode = (node, direction = 'next') => {
  if (direction === 'next') {
    if (!node.nextElementSibling) {
      if (
        node.parentElement.firstElementChild.classList.contains(
          `${prefix}-tabs-disabled`
        )
      ) {
        focusNode(node.parentElement.firstElementChild);
      } else {
        node.parentElement.firstElementChild.focus();
      }
    } else if (
      node.nextElementSibling &&
      node.nextElementSibling.classList.contains(`${prefix}-tabs-disabled`)
    ) {
      focusNode(node.nextElementSibling);
    } else {
      if (node.nextElementSibling) {
        node.nextElementSibling.focus();
      }
    }
  } else if (direction === 'previous') {
    if (!node.previousElementSibling) {
      if (
        node.parentElement.lastElementChild.classList.contains(
          `${prefix}-tabs-disabled`
        )
      ) {
        focusNode(
          node.parentElement.lastElementChild.firstElementChild,
          'previous'
        );
      } else {
        node.parentElement.lastElementChild.focus();
      }
    } else if (
      node.previousElementSibling &&
      node.previousElementSibling.classList.contains(`${prefix}-tabs-disabled`)
    ) {
      focusNode(node.previousElementSibling, 'previous');
    } else {
      if (node.previousElementSibling) {
        node.previousElementSibling.focus();
      }
    }
  }
};
function Tab({ label, active, isDisabled, className, ...restProps }) {
  return (
    <li
      role="tab"
      className={`${prefix}-tabs-nav-item${active ? ' active' : ''}${
        isDisabled ? ` ${prefix}-tabs-disabled` : ''
      } ${className}`.trim()}
      tabIndex={0}
      onKeyDown={keyListener}
      {...restProps}
    >
      <a className={`${prefix}-tabs-nav-link`}>{label}</a>
    </li>
  );
}

Tab.propTypes = {
  /** Text used to Differentiate Each Tab. */
  label: PropTypes.string,
  /** custom className for the Tab */
  className: PropTypes.string,
  /** Disables Tab if 'true'*/
  isDisabled: PropTypes.bool,
  /**
   * * ```true``` : ‘active’ class is added to the current element
   * * ```false``` : ‘active’ is removed from the current element.
   * */
  active: PropTypes.bool
};
Tab.defaultProps = {
  label: '',
  className: '',
  isDisabled: false,
  active: true
};

export default Tab;
