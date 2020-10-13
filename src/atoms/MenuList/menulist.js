/* eslint-disable jsx-quotes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ className, children, id, ...restProps }) => {
  const menulistRef = useRef(null);
  const classnames = [`${prefix}-menulist`];
  console.log(className);
  if (className) {
    classnames.push(className);
  }

  const modifiedChildren = React.Children.map(children, (child, index) => {
      console.log(child);
    return React.cloneElement(child, {
        key: `list-index${index}`,
       
      });
  });

  return (
    <ul
      aria-labelledby="menulist"
      className={`${prefix}-menulist`}
      ref={menulistRef}
    >
      {modifiedChildren}
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
