import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const focusNode = (currentItem, direction = 'next') => {
  const nextElem = currentItem.nextElementSibling;
  const prevElem = currentItem.previousElementSibling;
  if (direction === 'next') {
    if (!nextElem) {
      if (
        currentItem.parentElement.firstElementChild.hasAttribute('disabled')
      ) {
        focusNode(currentItem.parentElement.firstElementChild);
      } else {
        currentItem.parentElement.firstElementChild.focus();
      }
    } else if (nextElem && nextElem.hasAttribute('disabled')) {
      focusNode(nextElem);
    } else {
      if (nextElem) {
        nextElem.focus();
        return false;
      }
    }
  } else if (direction === 'previous') {
    if (!prevElem) {
      if (currentItem.parentElement.lastElementChild.hasAttribute('disabled')) {
        focusNode(currentItem.parentElement.lastElementChild, 'previous');
      } else {
        currentItem.parentElement.lastElementChild.focus();
      }
    } else if (prevElem && prevElem.hasAttribute('disabled')) {
      focusNode(prevElem, 'previous');
    } else {
      if (prevElem) {
        prevElem.focus();
        return false;
      }
    }
  }
};

const keyDownOnContextSwitch = e => {
  const key = e.which || e.keyCode;
  const currentElem = e.currentTarget;

  switch (key) {
    case 39: {
      focusNode(currentElem, 'next');
      e.preventDefault();
      break;
    }
    case 37: {
      focusNode(currentElem, 'previous');
      e.preventDefault();
      break;
    }
    default:
      break;
  }
};
function ContentSwitcher({ activeIndex, onChange, children }) {
  const [activeSwitch, changeSwitch] = useState(activeIndex);

  const modifiedChildren = React.Children.map(children, (child, index) => {
    const { label } = child.props;
    return cloneElement(child, {
      onClick: e => {
        changeSwitch(index);
        onChange(Object.assign({}, e, { label, switchIndex: index }));
      },
      active: activeSwitch === index,
      onKeyDown: keyDownOnContextSwitch
    });
  });

  return (
    <div className={`${prefix}-content-switcher`} role="tablist">
      {modifiedChildren}
    </div>
  );
}

ContentSwitcher.propTypes = {
  /** Index of the tab to be selected. */
  activeIndex: PropTypes.number,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func,
  /** self Children i.e Switch Component. */
  children: PropTypes.node.isRequired
};

ContentSwitcher.defaultProps = {
  activeIndex: 0,
  onChange: () => {}
};

export default ContentSwitcher;
