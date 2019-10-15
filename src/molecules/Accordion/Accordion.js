import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

export default function Accordion({
  uncontrolled,
  className,
  children,
  ...restProps
}) {
  const [expanded, setExpanded] = useState(
    children
      ? Children.toArray(children).map(child => child.props.expanded || false)
      : []
  );
  const classnames = `${prefix}-accordion ${className}`.trim();

  function toggleContent(event) {
    const comp = event.currentTarget;
    const index = parseInt(comp.dataset.index);
    setExpanded(
      expanded.map((child, i) =>
        i === index ? !child : uncontrolled ? child : false
      )
    );
  }

  return (
    <ul className={classnames} {...restProps}>
      {children
        ? Children.toArray(children).map((child, index) =>
            cloneElement(child, {
              onExpand: event => {
                toggleContent(event);
              },
              expanded: expanded[index],
              dataIndex: index
            })
          )
        : null}
    </ul>
  );
}

Accordion.propTypes = {
  uncontrolled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
};

Accordion.defaultProps = {
  uncontrolled: false,
  className: '',
  children: ''
};
