import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Label = ({ className, children, ...restProps }) => {
  const classnames = `${prefix}-label ${className}`.trim();

  return (
    <label className={classnames} {...restProps}>
      {children}
    </label>
  );
};

Label.propTypes = {
  /** Content for label */
  children: PropTypes.node,

  /** Class/clasess will be applied on the parent div of Label */
  className: PropTypes.string,

  /** Unique identifier for Label component.  */
  htmlFor: PropTypes.string
};

Label.defaultProps = {
  children: null,
  className: '',
  htmlFor: ''
};

export default Label;
