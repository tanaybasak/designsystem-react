import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';

const Heading = props => {
  const Element = props.type;

  return (
    <Element className={`${prefix}-${props.type} ${props.className}`}>
      {props.children}
    </Element>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  className: '',
  type: 'h2'
};


export default Heading;