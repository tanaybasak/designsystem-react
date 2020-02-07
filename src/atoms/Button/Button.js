import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Button = ({ className, children, onClick, ...restProps }) => {
  const classnames = `${prefix}-btn ${className}`.trim();

  return (
    <button
      type="button"
      className={classnames}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /** button content */
  children: PropTypes.any,
  /** type of button eg : hcl-primary , hcl-danger , hcl-sm , hcl-secondary, hcl-ghost  */
  className: PropTypes.string,
  /** Disable button  */
  disabled: PropTypes.bool,
  /** call back function on click  */
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: 'Click Me',
  className: '',
  disabled: false,
  onClick: () => {}
};

export default Button;
