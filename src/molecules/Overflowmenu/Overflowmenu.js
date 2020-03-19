import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../../atoms/MenuList';
import { addListener, removeListeners } from '../../util/eventManager';
import prefix from '../../settings';

let overflowIdRef = 0;
const Overflowmenu = ({
  className,
  direction,
  children,
  ellipsisType,
  onClick,
  listItems,
  ...restProps
}) => {
  const [display, changeDisplay] = useState(false);
  const overflow = useRef(null);
  const [overflowId] = useState(overflowIdRef++);

  useEffect(() => {
    const overflowMenu = overflow.current.children[1];
    if (overflowMenu) {
      const icon = overflow.current.children[0];
      const caret = overflowMenu.children[1];
      let outOfBound = false;
      const parentHeight = (
        overflowMenu.parentElement.offsetHeight +
        8 -
        parseInt(getComputedStyle(icon).marginBottom)
      ).toString();

      overflowMenu.style.display = 'block';
      updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      if (!isInViewport(overflowMenu)) {
        outOfBound = true;
        updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      }
      focusNode(overflowMenu.children[0].children[0]);
      overflowMenu.style.top = parentHeight.concat('px');
    }
  });

  useEffect(() => {
    if (!display) {
      removeListeners('overflow-' + overflowId, 'click');
    } else {
      addListener(
        'overflow-' + overflowId,
        'click',
        e => {
          handleClick(e);
        },
        true
      );
    }
  }, [display]);

  const handleClick = e => {
    if (overflow.current) {
      if (e && overflow.current.contains(e.target)) {
        return;
      }
      changeDisplay(false);
    }
  };

  const clickHandler = () => {
    changeDisplay(!display);
  };

  const isInViewport = elem => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
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
        onKeyPress: toggleOverflow
      });
    });
  }

  const classnames = `${prefix}-overflow-container ${className}`.trim();

  return (
    <section className={classnames} {...restProps} ref={overflow}>
      {typeof children === 'string' ? (
        <span tabIndex="0" onKeyPress={toggleOverflow} onClick={clickHandler}>
          {children}
        </span>
      ) : children === null ? (
        <span
          tabIndex="0"
          onKeyPress={toggleOverflow}
          className={`${prefix}-ellipsis${
            ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
          }`}
          onClick={clickHandler}
        >
          {children}
        </span>
      ) : (
        element
      )}

      {display && Array.isArray(listItems) && listItems.length > 0 && (
        <div
          onKeyDown={keyDownOnOverflow}
          style={{ display: 'none' }}
          className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
        >
          <MenuList
            items={listItems}
            onSelect={event => {
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
