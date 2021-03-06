import React, { useState, cloneElement, useEffect } from 'react';
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
function ContentSwitcher({ className, activeIndex, onChange, children }) {
  const [activeSwitch, changeSwitch] = useState(activeIndex);

  useEffect(() => {
    changeSwitch(activeIndex);
  }, [activeIndex]);

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

  const classNames = [`${prefix}-content-switcher`];

  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} role="tablist">
      {modifiedChildren}
    </div>
  );
}

ContentSwitcher.propTypes = {
  /** Index of the tab to be selected. */
  activeIndex: PropTypes.number,
  /** Accepts event handler as prop/argument.
   * * 'label' and 'switchIndex' keys are provided to get currently selected Switch.
   *
   * @signature
   * ```event```: change event object
   */
  onChange: PropTypes.func,
  /** self Children i.e Switch Component. */
  children: PropTypes.node.isRequired,
  /** Class/clasess will be applied on the parent div of ContentSwitcher  */
  className: PropTypes.string
};

ContentSwitcher.defaultProps = {
  activeIndex: 0,
  className: '',
  onChange: () => {}
};

export default ContentSwitcher;
