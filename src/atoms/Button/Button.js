import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Button = ({ type, small, className, children, onClick, ...restProps }) => {
  const classNameOptions = {
    'Primary' : 'hcl-primary',
    'Primary Danger' : 'hcl-primary hcl-danger',
    'Secondary' : 'hcl-secondary',
    'Secondary Danger' : 'hcl-secondary hcl-danger',
    'Ghost' : 'hcl-ghost'
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
  /** type of button eg : hcl-primary , hcl-danger , hcl-sm , hcl-secondary, hcl-ghost  */
  type: PropTypes.string,
  /** type of button eg : hcl-primary , hcl-danger , hcl-sm , hcl-secondary, hcl-ghost  */
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
