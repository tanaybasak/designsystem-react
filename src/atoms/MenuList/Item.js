import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Item = ({
  item,
  onClick,
  disabled,
  danger,
  separator,
  children,
  className,
  link,
  ...rest
}) => {
  const classNames = [`${prefix}-menu-option-item`];
  if (danger) {
    classNames.push(`${prefix}-menu-option-danger`);
  }
  if (disabled) {
    classNames.push(`${prefix}-menu-option-disabled`);
  }
  if (separator) {
    classNames.push(`${prefix}-menu-option-separator`);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <li className={`${prefix}-menuItem`}> {children} </li>
  );
};

Item.propTypes = {
  /** Item will return on click of the Menu Item */
  item: PropTypes.any,
  /** @ignore */
  onClick: PropTypes.func,
  /** Used to disable the menu item */
  disabled: PropTypes.bool,
  /** Used to apply danger style to menu item */
  danger: PropTypes.bool,
  /** Used to add a separator in menu item */
  separator: PropTypes.bool,
  /** Used to pass children */
  children: PropTypes.any,
  /** Used to pass custom classname */
  className: PropTypes.string,
  /** Used to pass the link. It will redirect to the link on click */
  link: PropTypes.string
};

Item.defaultProps = {
  item: {},
  onClick: () => {},
  disabled: false,
  danger: false,
  separator: false,
  children: null,
  className: '',
  link: null
};

export default Item;
