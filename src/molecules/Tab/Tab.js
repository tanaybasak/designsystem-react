import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const keyListener = (e) => {
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
    if (!node.parentElement.nextElementSibling) {
      if (
        node.parentElement.parentElement.firstElementChild.classList.contains(
          `${prefix}-tabs-disabled`
        )
      ) {
        focusNode(
          node.parentElement.parentElement.firstElementChild.firstElementChild
        );
      } else {
        node.parentElement.parentElement.firstElementChild.firstElementChild.focus();
      }
    } else if (
      node.parentElement.nextElementSibling &&
      node.parentElement.nextElementSibling.classList.contains(
        `${prefix}-tabs-disabled`
      )
    ) {
      focusNode(node.parentElement.nextElementSibling.firstElementChild);
    } else {
      if (node.parentElement.nextElementSibling) {
        node.parentElement.nextElementSibling.firstElementChild.focus();
      }
    }
  } else if (direction === 'previous') {
    if (!node.parentElement.previousElementSibling) {
      if (
        node.parentElement.parentElement.lastElementChild.classList.contains(
          `${prefix}-tabs-disabled`
        )
      ) {
        focusNode(
          node.parentElement.parentElement.lastElementChild.firstElementChild,
          'previous'
        );
      } else {
        node.parentElement.parentElement.lastElementChild.firstElementChild.focus();
      }
    } else if (
      node.parentElement.previousElementSibling &&
      node.parentElement.previousElementSibling.classList.contains(
        `${prefix}-tabs-disabled`
      )
    ) {
      focusNode(
        node.parentElement.previousElementSibling.firstElementChild,
        'previous'
      );
    } else {
      if (node.parentElement.previousElementSibling) {
        node.parentElement.previousElementSibling.firstElementChild.focus();
      }
    }
  }
};
function Tab({ label, onClick, active, isDisabled }) {
  return (
    <li
      role="tab"
      className={`${prefix}-tabs-nav-item ${active ? 'active' : ''} ${
        isDisabled ? `${prefix}-tabs-disabled` : ''
      }`}
      onClick={onClick}
    >
      <a
        className={`${prefix}-tabs-nav-link`}
        onKeyDown={keyListener}
        tabIndex={0}
      >
        {label}
      </a>
    </li>
  );
}

Tab.propTypes = {
  /** Text used to Differentiate Each Tab. */
  label: PropTypes.string,
  /** Disables Tab if 'true'*/
  isDisabled: PropTypes.bool,
  /** true – ‘active’ class is added to the current element 

false – ‘active’ is removed from the current element.  */
  active: PropTypes.bool,
  /** Accepts Click handler as prop/Argument. */
  onClick: PropTypes.func,
};
Tab.defaultProps = {
  label: '',
  isDisabled: false,
  active: true,
  onClick: () => {},
};

export default Tab;
