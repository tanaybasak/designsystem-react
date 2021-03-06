import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const SelectItem = ({ value, disabled, hidden, text, ...restProps }) => {
  return (
    <option
      {...restProps}
      className={`${prefix}-select-option`}
      value={value}
      disabled={disabled}
      hidden={hidden}
    >
      {text}
    </option>
  );
};

SelectItem.propTypes = {
  /** Specify the value of the <SelectItem> */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /** Specify whether the <SelectItem> should be disabled */
  disabled: PropTypes.bool,

  /** Specify whether the <SelectItem> is hidden */
  hidden: PropTypes.bool,

  /** Provide the contents of <SelectItem>  */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

SelectItem.defaultProps = {
  disabled: false,
  hidden: false,
  value: '',
  text: ''
};

export default SelectItem;
