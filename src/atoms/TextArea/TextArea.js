import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const TextArea = ({ className, ...restProps }) => {
  const classnames = `${prefix}-textarea ${prefix}-form-control ${className}`.trim();

  return <textarea className={classnames} {...restProps} />;
};

TextArea.propTypes = {
  /** Additional class name to be given to <input> tag. */
  className: PropTypes.string,
  /** The default Value of the field on rendering. */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Specifying the <input> tag is disabled or not. */
  disabled: PropTypes.bool,
  /** Unique Id for the <input> tag. */
  id: PropTypes.string,
  /** Placeholder text for the <input> tag. */
  placeholder: PropTypes.string,
  /** Value of the input field. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextArea.defaultProps = {
  className: '',
  disabled: false
};

export default TextArea;
