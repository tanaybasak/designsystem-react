import React, { cloneElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Overlay from '../Overlay';

const Menu = ({
  items,
  onSelect,
  showOverlay,
  targetElement,
  element,
  direction,
  children,
  ...restProps
}) => {
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

  const [showO, setToggle] = useState(showOverlay);
  const [target, setTarget] = useState(targetElement);

  useEffect(() => {
    setToggle(showOverlay);
  }, [showOverlay]);

  useEffect(() => {
    setTarget(targetElement);
  }, [targetElement]);

  //   const modifiedChildren = React.Children.map(children, (child, index) => {
  //     if (child && child.type.name === "MenuSubItem") {

  //             return cloneElement(child, {

  //                 key: index,
  //                 children: child.props.children,
  //                 href: child.props.href,
  //                 itemClass: child.props.className,
  //                 active: isActive === index
  //             });

  //     }
  // });

  const closeEvent = e => {
    setToggle(false);
    restProps.onClose(e);
  };
  return (
    <>
      <Overlay
        showOverlay={showO}
        targetElement={target}
        onClose={closeEvent}
        direction={direction}
      >
        <ul className={`${prefix}-overflow-list`} onKeyDown={keyDownOnOverflow}>
          {children}
        </ul>
      </Overlay>
    </>
  );
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  showOverlay: PropTypes.bool,
  targetElement: PropTypes.object
};

Menu.defaultProps = {
  items: [],
  onSelect: () => {},
  showOverlay: false,
  targetElement: null
};

export default Menu;
