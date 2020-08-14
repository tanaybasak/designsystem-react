/* eslint-disable jsx-quotes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Overlay from '../../atoms/Overlay';
import MenuItem from './MenuItem';

const Overflowmenu = ({
  className,
  direction,
  children,
  ellipsisType,
  onClick,
  customTemplate,
  listItems,
  attachElementToBody,
  customIcon,
  scrollListner,
  ...restProps
}) => {
  const [display, changeDisplay] = useState(false);
  const overflowMenuRef = useRef(null);
  const targetElementRef = useRef(null);

  const clickHandler = () => {
    //setTargetElement(e.currentTarget);
    changeDisplay(!display);
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

  const classnames = [`${prefix}-overlay-wrapper`];
  if (className) {
    classnames.push(className);
  }
  if (display) {
    classnames.push(`${prefix}-overlay-wrapper-active`);
  }

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
          link={item.link}
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
      if (
        overflowMenuRef.current.querySelector(
          `li .${prefix}-overflow-option-item:not(.${prefix}-overflow-option-disabled)`
        )
      ) {
        overflowMenuRef.current
          .querySelector(
            `li .${prefix}-overflow-option-item:not(.${prefix}-overflow-option-disabled)`
          )
          .focus();
      }
    } else {
      if (type !== 'outside' && targetElementRef && targetElementRef.current) {
        targetElementRef.current.focus();
      }
    }
  };

  return (
    <div className={classnames.join(' ')} {...restProps}>
      {customTemplate ? (
        React.cloneElement(customTemplate, {
          onClick: clickHandler,
          ref: targetElementRef
        })
      ) : (
        <button
          className={`
            ${prefix}-overflow-btn 
            ${
              customIcon
                ? ''
                : `
            
            ${prefix}-ellipsis ${
                    ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
                  }
            
            `
            }`}
          ref={targetElementRef}
          aria-label="Overflow Menu"
          role="Overflow Menu"
          onClick={clickHandler}
        >
          {customIcon ? customIcon : null}
        </button>
      )}

      <Overlay
        attachElementToBody={attachElementToBody}
        scrollListner={scrollListner}
        showOverlay={display}
        targetElement={targetElementRef.current}
        onToggle={onToggle}
        direction={direction}
        closeOnEscape
      >
        <ul
          aria-labelledby="Right Overflow Menu"
          className={`${prefix}-overflow-menu`}
          onKeyDown={keyDownOnOverflow}
          ref={overflowMenuRef}
        >
          {listItems && listItems.length > 0
            ? getListItems(listItems)
            : children
            ? getListItemsFromElement(children)
            : null}
        </ul>
      </Overlay>
    </div>
  );
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
  scrollListner: false,
  customIcon: null
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

  customIcon: PropTypes.element,
  scrollListner: PropTypes.bool
};

export default Overflowmenu;
