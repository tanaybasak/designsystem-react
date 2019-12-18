import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Spinner = ({ small, title, className, ...restProps }) => {
  const classnames = `${prefix}-spinner${
    small ? '-inline' : ''
  } ${className}`.trim();

  return (
    <div className={classnames} title={title} {...restProps}>
      <svg viewBox="-75 -75 150 150">
        <circle cx="0" cy="0" r="67" />
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  /** True: Inline loader will be created. 
  False: Large loader will be created.  */
  small: PropTypes.bool,

  /** This is for title of spinner  */
  title: PropTypes.string,

  /** Class/clasess will be applied on the parent div of TimePicker */
  className: PropTypes.string
};

Spinner.defaultProps = {
  small: false,
  title: '',
  className: ''
};

export default Spinner;
