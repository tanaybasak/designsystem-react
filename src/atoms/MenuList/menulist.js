/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = React.forwardRef((props, ref) => {
  const classnames = [`${prefix}-dropdown-menu`];
  if (props.className) {
    classnames.push(props.className);
  }

  return (
    <ul
      ref={ref}
      {...props}
      aria-labelledby="menulist"
      className={classnames.join(' ')}
    >
      {props.children}
    </ul>
  );
});

MenuList.displayName = 'MenuList';

MenuList.defaultProps = {
  className: ''
};

MenuList.propTypes = {
  /** Class/clasess will be applied on the parent div of MenuList */
  className: PropTypes.string
};

export default MenuList;
