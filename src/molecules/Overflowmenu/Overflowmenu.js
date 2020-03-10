import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../../atoms/MenuList';
import prefix from '../../settings';

const Overflowmenu = ({
  className,
  direction,
  children,
  ellipsisType,
  onClick,
  ...restProps
}) => {
  const [display, changeDisplay] = useState(false);
  const overflow = useRef(null);

  useEffect(() => {
    const overflowMenu = overflow.current.children[1];
    if (overflowMenu) {
      focusNode(overflowMenu.children[0].children[0]);
      const icon = overflow.current.children[0];
      const caret = overflowMenu.children[1];
      let outOfBound = false;
      updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      if (!isInViewport(overflowMenu)) {
        outOfBound = true;
        updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      }
    }
  });

  const isInViewport = elem => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const clickHandler = event => {
    changeDisplay(!display);
    if (onClick) {
      onClick(event);
    }
  };

  const updateOverflowMenuPos = (overflowMenu, icon, caret, outOfBound) => {
    let caretPosition;
    if (overflowMenu.classList.contains(`${prefix}-overflow-right`)) {
      if (outOfBound) {
        caretPosition = (icon.offsetWidth / 2 - 18).toString();
        overflowMenu.style.left = null;
        overflowMenu.style.right = caretPosition.concat('px');
        caret.style.left = '10rem';
      } else {
        caretPosition = (icon.offsetWidth / 2 - 22).toString();
        overflowMenu.style.left = caretPosition.concat('px');
        overflowMenu.style.right = null;
        caret.style.left = null;
      }
    } else if (overflowMenu.classList.contains(`${prefix}-overflow-left`)) {
      if (outOfBound) {
        caretPosition = (icon.offsetWidth / 2 - 22).toString();
        overflowMenu.style.right = null;
        overflowMenu.style.left = caretPosition.concat('px');
        caret.style.left = '1rem';
      } else {
        caretPosition = (icon.offsetWidth / 2 - 18).toString();
        overflowMenu.style.right = caretPosition.concat('px');
        overflowMenu.style.left = null;
        caret.style.left = null;
      }
    }
  };

  const focusNode = node => {
    if (node.classList.contains(`${prefix}-overflow-option`)) {
      node.children[0].focus();
    }
  };

  const keyDownOnOverflow = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target.parentElement;
    switch (key) {
      case 40: {
        if (!listItem.nextElementSibling) {
          focusNode(listItem.parentElement.firstElementChild);
        } else if (listItem.nextElementSibling.children[0].disabled === true) {
          focusNode(listItem.nextElementSibling.nextElementSibling);
        } else {
          focusNode(listItem.nextElementSibling);
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (!listItem.previousElementSibling) {
          focusNode(listItem.parentElement.lastElementChild);
        } else if (
          listItem.previousElementSibling.children[0].disabled === true
        ) {
          focusNode(listItem.previousElementSibling.previousElementSibling);
        } else {
          focusNode(listItem.previousElementSibling);
        }
        e.preventDefault();
        break;
      }
      case 13: {
        e.preventDefault();
        e.target.click();
        break;
      }
      default:
        break;
    }
  };

  const toggleOverflow = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      overflow.current.children[0].click();
    }
  };

  let element = null;
  if (typeof children !== 'string') {
    element = React.Children.map(children, child => {
      return React.cloneElement(child, {
        tabIndex: '0',
        onClick: clickHandler,
        onKeyPress: toggleOverflow,
        className: `${prefix}-ellipsis${
          ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
        }`
      });
    });
  }

  const classnames = `${prefix}-overflow-container ${className}`.trim();

  return (
    <section className={classnames} {...restProps} ref={overflow}>
      {typeof children === 'string' ? (
        <button tabIndex="0" onKeyPress={toggleOverflow} onClick={clickHandler}>
          {children}
        </button>
      ) : (
        element
      )}

      {display && (
        <div
          onKeyDown={keyDownOnOverflow}
          className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
        >
          <MenuList
            items={restProps.listItems}
            onClick={event => {
              changeDisplay(false);
              onClick(event);
            }}
          />
          <div
            className={`${prefix}-overflow-caret${
              direction === 'left' ? '' : '-right'
            }`}
          />
        </div>
      )}
    </section>
  );
};

Overflowmenu.defaultProps = {
  direction: 'left',
  listItems: null,
  children: null,
  ellipsisType: 'vertical',
  onClick: () => {},
  className: ''
};

Overflowmenu.propTypes = {
  /** Left: To open overflow menu in left direction. 
  Right: To open overflow menu in right direction  */
  direction: PropTypes.oneOf(['left', 'right']),

  children: PropTypes.node,

  /** List of the item and associated actions, which should be part of menu. */
  listItems: PropTypes.array.isRequired,

  /** Horizontal: To make ellipsis horizontal. 
  Vertical: To make ellipsis vertical.  */
  ellipsisType: PropTypes.oneOf(['vertical', 'horizontal']),

  /** Callback function on selecting item*/
  onClick: PropTypes.func.isRequired,

  /** Class/clasess will be applied on the parent div of OverflowMenu */
  className: PropTypes.string
};

export default Overflowmenu;
