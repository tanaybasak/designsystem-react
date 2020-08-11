/* eslint-disable jsx-quotes */
import React, { useState, useEffect, useRef, cloneElement } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../../atoms/Menu';
import { addListener, removeListeners } from '../../util/eventManager';
import prefix from '../../settings';
import Overlay from '../../atoms/Overlay';
import MenuItem from './MenuItem';

let overflowIdRef = 0;
const Overflowmenu = ({
  className,
  direction,
  children,
  ellipsisType,
  onClick,
  customTemplate,
  listItems,
  attachElementToBody,
  //targetElement,
  showOverlay,
  scrollListner,
  common,
  ...restProps
}) => {
  const [display, changeDisplay] = useState(false);
  const overflowMenu = useRef(null);
  const targetElementRef = useRef(null);
  const [overflowId] = useState(overflowIdRef++);
  const [targetEl, setTargetElement] = useState(null);

//   useEffect(() => {
//     setTargetElement(targetElement);
//   }, [targetElement]);
  //   useEffect(() => {
  //     const overflowMenu = overflow.current.children[1];
  //     if (overflowMenu) {
  //       const icon = overflow.current.children[0];
  //       const caret = overflowMenu.children[1];
  //       let outOfBound = false;
  //       const parentHeight = (
  //         overflowMenu.parentElement.offsetHeight +
  //         8 -
  //         parseInt(getComputedStyle(icon).marginBottom)
  //       ).toString();

  //       overflowMenu.style.display = 'block';
  //       updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
  //       if (!isInViewport(overflowMenu)) {
  //         outOfBound = true;
  //         updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
  //       }
  //       overflowMenu.querySelector('ul li button:not(:disabled)').focus();
  //       overflowMenu.style.top = parentHeight.concat('px');
  //     }
  //   });

  //   useEffect(() => {
  //     if (!display) {
  //       removeListeners('overflow-' + overflowId, 'click');
  //     } else {
  //       addListener(
  //         'overflow-' + overflowId,
  //         'click',
  //         e => {
  //           handleClick(e);
  //         },
  //         true
  //       );
  //     }
  //   }, [display]);

  const handleClick = e => {
    if (overflow.current) {
      if (e && overflow.current.contains(e.target)) {
        return;
      }
      changeDisplay(false);
    }
  };

  const clickHandler = e => {
    //setTargetElement(e.currentTarget);
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

  const focusNode = (listItem, direction = 'next') => {
    const nextElem = listItem.nextElementSibling;
    const prevElem = listItem.previousElementSibling;
    if (direction === 'next') {
      if (!nextElem) {
        if (
          listItem.parentElement.firstElementChild.children[0].hasAttribute(
            'disabled'
          )
        ) {
          focusNode(listItem.parentElement.firstElementChild);
        } else {
          listItem.parentElement.firstElementChild.children[0].focus();
        }
      } else if (nextElem && nextElem.children[0].hasAttribute('disabled')) {
        focusNode(nextElem);
      } else {
        if (nextElem) {
          nextElem.children[0].focus();
        }
      }
    } else if (direction === 'previous') {
      if (!prevElem) {
        if (
          listItem.parentElement.lastElementChild.children[0].hasAttribute(
            'disabled'
          )
        ) {
          focusNode(listItem.parentElement.lastElementChild, 'previous');
        } else {
          listItem.parentElement.lastElementChild.children[0].focus();
        }
      } else if (prevElem && prevElem.children[0].hasAttribute('disabled')) {
        focusNode(prevElem, 'previous');
      } else {
        if (prevElem) {
          prevElem.children[0].focus();
        }
      }
    }
  };

  const keyDownOnOverflow = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target.parentElement;
    switch (key) {
      case 40: {
        focusNode(listItem, 'next');
        e.preventDefault();
        break;
      }
      case 38: {
        focusNode(listItem, 'previous');
        e.preventDefault();
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

  const classnames = `${prefix}-overflow-container${className}${
    display ? ` ${prefix}-overflow-active` : ''
  }`.trim();

  const getListItems = items => {
    return items.map((item, index) => {
      return (
        <MenuItem
          key={`list-index${index}`}
          item={item}
          onClick={(item, event) => {
            changeDisplay(false);
            if (onClick) {
              onClick(item, event);
            }
            targetElementRef.current.focus();
          }}
          danger={item.danger}
          separator={item.separator}
          disabled={item.disabled}
        >
          {item.name}
        </MenuItem>
      );
    });
  };

  const getListItemsFromElement = children => {
    return children.map((item, index) => {
      return React.cloneElement(item, {
        key: `list-index${index}`,
        onClick: (item, event) => {
          changeDisplay(false);
          if (onClick) {
            onClick(item, event);
          }
          if (targetElementRef && targetElementRef.current) {
            targetElementRef.current.focus();
          }
        }
      });
    });
  };

  const onToggle = (status, type) => {
    changeDisplay(status);
    if (status) {
      if (overflowMenu.current.querySelector('li button:not(:disabled)')) {
        overflowMenu.current.querySelector('li button:not(:disabled)').focus();
      }
    } else {
      console.log('type ==>', type);
      if (type !== 'outside' && targetElementRef && targetElementRef.current) {
        targetElementRef.current.focus();
      }
    }
    console.log('onToggle', status, type);
  };

  const loadOverlayContainer = (attachElementToBody, showOverlay, targetEl) => {
    return (
      <Overlay
        attachElementToBody={attachElementToBody}
        showOverlay={showOverlay}
        targetElement={targetEl}
        onToggle={onToggle}
        direction={direction}
      >
        <ul
          aria-labelledby='Right Overflow Menu'
          className='hcl-overflow-menu'
          onKeyDown={keyDownOnOverflow}
          ref={overflowMenu}
        >
          {listItems && listItems.length > 0
            ? getListItems(listItems)
            : getListItemsFromElement(children)}
        </ul>
      </Overlay>
    );
  };
  return (
    <div className='hcl-overlay-wrapper'>
      {customTemplate ? (
        React.cloneElement(customTemplate, {
          onClick: clickHandler,
          ref: targetElementRef
        })
      ) : (
        <button
          className={`${prefix}-ellipsis${
            ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
          }`}
          ref={targetElementRef}
          aria-label='Left Overflow Menu'
          role='Overflow Menu'
          onClick={clickHandler}
        />
      )}

      {/* {loadOverlayContainer(
        attachElementToBody,
        display,
        targetElementRef.current
      )} */}

      <Overlay
        attachElementToBody={attachElementToBody}
        scrollListner={scrollListner}
        showOverlay={display}
        targetElement={targetElementRef.current}
        onToggle={onToggle}
        direction={direction}
      >
        <ul
          aria-labelledby='Right Overflow Menu'
          className='hcl-overflow-menu'
          onKeyDown={keyDownOnOverflow}
          ref={overflowMenu}
        >
          {listItems && listItems.length > 0
            ? getListItems(listItems)
            : children ? getListItemsFromElement(children) : null}
        </ul>
      </Overlay>
    </div>
  );

  // <section className={classnames} {...restProps} ref={overflow}>
  //   {typeof children === 'string' ? (
  //     <span tabIndex='0' onKeyPress={toggleOverflow} onClick={clickHandler}>
  //       {children}
  //     </span>
  //   ) : children === null ? (
  //     <span
  //       tabIndex='0'
  //       onKeyPress={toggleOverflow}
  //       className={`${prefix}-ellipsis${
  //         ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
  //       }`}
  //       onClick={clickHandler}
  //     >
  //       {children}
  //     </span>
  //   ) : (
  //     element
  //   )}

  //   {display && Array.isArray(listItems) && listItems.length > 0 && (
  //     <div
  //       onKeyDown={keyDownOnOverflow}
  //       style={{ display: 'none' }}
  //       className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
  //     >
  //       <MenuList
  //         items={listItems}
  //         onSelect={(item, index, event) => {
  //           changeDisplay(false);
  //           overflow.current.children[0].focus();
  //           onClick(item, index, event);
  //         }}
  //       />
  //       <div
  //         className={`${prefix}-overflow-caret${
  //           direction === 'left' ? '' : '-right'
  //         }`}
  //       />
  //     </div>
  //   )}
  // </section>
};

Overflowmenu.defaultProps = {
  direction: 'bottom-left',
  listItems: null,
  children: null,
  ellipsisType: 'vertical',
  onClick: () => {},
  className: '',
  customTemplate: null,
  attachElementToBody: false,
  common: false
};

Overflowmenu.propTypes = {
  /** Left: To open overflow menu in left direction. 
  Right: To open overflow menu in right direction  */
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),

  /** overflow content */
  children: PropTypes.any,

  /** List of the item and associated actions, which should be part of menu. */
  listItems: PropTypes.array,

  /** Horizontal: To make ellipsis horizontal. 
  Vertical: To make ellipsis vertical.  */
  ellipsisType: PropTypes.oneOf(['vertical', 'horizontal']),

  /** Callback function on selecting item*/
  onClick: PropTypes.func.isRequired,

  attachElementToBody: PropTypes.bool,

  /** Class/clasess will be applied on the parent div of OverflowMenu */
  className: PropTypes.string,

  customTemplate: PropTypes.element,

  common: PropTypes.bool
};

export default Overflowmenu;
