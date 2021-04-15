import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Heading = ({ type, className, children, ...restProps }) => {
  const Element = type;

  return (
    <Element className={`${prefix}-${type} ${className}`} {...restProps}>
      {children}
    </Element>
  );
};

Heading.propTypes = {
  /** Custom class on the Checkbox wrapper. */
  className: PropTypes.string,
  /** Type of html elements : eg: h1, h2, h3, h4, h5, h6 */
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  className: '',
  type: 'h2'
};

export default Heading;
