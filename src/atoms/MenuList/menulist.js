/* eslint-disable jsx-quotes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';




const MenuList = React.forwardRef((props, ref) => {
  const classnames = [`${prefix}-menulist`];
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
  })






// const MenuList = ({ className, children, id, ...restProps }) => {
//   const menuRef = useRef(null);
//   const classnames = [`${prefix}-menulist`];
//   if (className) {
//     classnames.push(className);
//   }




//   const keyDownOnOverflow = e => {
    
//     const key = e.which || e.keyCode;
//     console.log(key);
//     const listItem = e.target.parentElement;
//     console.log(listItem);

//     // switch (key) {
//     //   case 40: {
//     //    console.log(listItem)
//     //     e.preventDefault();
//     //     break;
//     //   }
//     //   case 38: {
//     //     focusNode(listItem, 'previous');
//     //     e.preventDefault();
//     //     break;
//     //   }
//     //   default:
//     //     break;
//     // }
//   };



//   return (
//     <ul
//       aria-labelledby="menulist"
//       className={classnames.join(' ')}
//       ref={menuRef}
//       onKeyDown={keyDownOnOverflow}

//     >
//       {children}
//     </ul>
//   );
// };

MenuList.defaultProps = {
  className: ''
};

MenuList.propTypes = {
  /** Class/clasess will be applied on the parent div of MenuList */
  className: PropTypes.string
};

export default MenuList;
