import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Button = ({
  type,
  small,
  className,
  children,
  onClick,
  ...restProps
}) => {
  const classNameOptions = {
    primary: 'hcl-primary',
    'primary-danger': 'hcl-primary hcl-danger',
    secondary: 'hcl-secondary',
    'secondary-danger': 'hcl-secondary hcl-danger',
    ghost: 'hcl-ghost'
  };

  const classNameType = classNameOptions[type] ? classNameOptions[type] : '';
  const smallBtn = small ? 'hcl-sm' : '';
  const classnames = `${prefix}-btn ${className} ${classNameType} ${smallBtn}`.trim();

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
  /** type of button eg : primary , primary-danger , secondary-danger , secondary, ghost  */
  type: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,
  /** small button  */
  small: PropTypes.bool,
  /** call back function on click  */
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: 'Click Me',
  className: '',
  type: '',
  small: false,
  disabled: false,
  onClick: () => {}
};

export default Button;
