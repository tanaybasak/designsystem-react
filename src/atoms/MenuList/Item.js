/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Item = ({
  item,
  onClick,
  onKeyDown,
  disabled,
  danger,
  separator,
  children,
  className
}) => {
  const classNames = [];
  if (danger) {
    classNames.push(`${prefix}-overflow-option-danger`);
  }
  if (disabled) {
    classNames.push(`${prefix}-overflow-option-disabled`);
  }
  if (separator) {
    classNames.push(`${prefix}-overflow-option-separator`);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <li
      className={classNames.join(' ')}
      tabIndex="0"
      onClick={e => {
        if (onClick) {
          onClick(item, e);
        }
      }}
      onKeyDown={e => {
        if (onKeyDown) {
          onKeyDown(item, e);
        }
      }}
    >
      {children}
    </li>
  );
};

Item.propTypes = {
  /** Item will return on click of the Menu Item */
  item: PropTypes.any,
  /** @ignore */
  onClick: PropTypes.func,
  /** @ignore */
  onKeyDown: PropTypes.func,
  /** Used to disable the menu item */
  disabled: PropTypes.bool,
  /** Used to apply danger style to menu item */
  danger: PropTypes.bool,
  /** Used to add a separator in menu item */
  separator: PropTypes.bool,
  /** Used to pass children */
  children: PropTypes.any,
  /** Used to pass custom classname */
  className: PropTypes.string
};

Item.defaultProps = {
  item: {},
  onClick: () => {},
  onKeyDown: () => {},
  disabled: false,
  danger: false,
  separator: false,
  children: null,
  className: ''
};

export default Item;
