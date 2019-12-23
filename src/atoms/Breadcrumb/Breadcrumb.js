import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Breadcrumb({ activeIndex, onSelection, id, className, children }) {
  const [isActive, setActive] = useState(activeIndex);

  const modifiedChildren = React.Children.map(children, (child, index) => {
    return cloneElement(child, {
      onClick: e => {
        setActive(index);
        onSelection(Object.assign({}, e, { tabIndex: index }));
      },
      key: index,
      children: child.props.children,
      href: child.props.href,
      itemClass: child.props.className,
      active: isActive === index
    });
  });

  return (
    <ul
      className={`${prefix}-breadcrumb ${className ? className : ''}`}
      aria-label="breadcrumb"
      id={id}
    >
      {modifiedChildren}
    </ul>
  );
}

Breadcrumb.propTypes = {
  /** Unique Id */
  id: PropTypes.string,
  /** dafault active breadcrumb item */
  activeIndex: PropTypes.number,
  /** Class/clasess will be applied on the parent div of Breadcrumb  */
  className: PropTypes.string,
  /** Callback function on selecting item*/
  onSelection: PropTypes.func
};
Breadcrumb.defaultProps = {
  id: '',
  activeIndex: 0,
  className: '',
  onSelection: () => {}
};

export default Breadcrumb;
