/* eslint-disable jsx-quotes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ className, children, id, ...restProps }) => {
  
  const classnames = [`${prefix}-menulist`];
  if (className) {
    classnames.push(className);
  }



  return (
    <ul
      aria-labelledby="menulist"
      className={classnames.join(' ')}
    >
      {children}
    </ul>
  );
};

MenuList.defaultProps = {
  className: ''
};

MenuList.propTypes = {
  /** Class/clasess will be applied on the parent div of MenuList */
  className: PropTypes.string
};

export default MenuList;
