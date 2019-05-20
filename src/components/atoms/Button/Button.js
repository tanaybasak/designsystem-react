import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';

const Button = ({ className, children, onClick, ...restProps }) => {
  const classnames = `${prefix}-btn ${className}`.trim();

  return (
    <button
      type='button'
      className={classnames}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: 'Click Me',
  className: '',
  disabled: false,
  onClick: () => {}
};

export default Button;
