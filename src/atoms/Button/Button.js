import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Button = ({ type, small, kind, className, children, ...restProps }) => {
  const classNameOptions = {
    primary: 'hcl-primary',
    'primary-danger': 'hcl-primary hcl-danger',
    secondary: 'hcl-secondary',
    'secondary-danger': 'hcl-secondary hcl-danger',
    ghost: 'hcl-ghost',
    warning: 'hcl-warning',
    neutral: 'hcl-neutral'
  };

  const classNameType = classNameOptions[type] ? classNameOptions[type] : '';
  const smallBtn = small ? 'hcl-sm' : '';
  const classnames = `${prefix}-btn ${className} ${classNameType} ${smallBtn}`.trim();

  return (
    <button type={kind} className={classnames} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /** button content */
  children: PropTypes.any,
  /** type of button */
  type: PropTypes.oneOf([
    'primary',
    'primary-danger',
    'secondary',
    'secondary-danger',
    'ghost',
    'neutral',
    'warning'
  ]),
  /** kind of button  eg : button, submit, reset */
  kind: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Style class of the component */
  className: PropTypes.string,
  /** small button  */
  small: PropTypes.bool,
  /** Disable Button  */
  disabled: PropTypes.bool
};

Button.defaultProps = {
  children: 'Click Me',
  className: '',
  type: 'primary',
  small: false,
  disabled: false,
  kind: 'button'
};

export default Button;
