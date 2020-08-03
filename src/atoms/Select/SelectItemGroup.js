import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const SelectItemGroup = ({ disabled, label, ...restProps }) => {
  return (
    <optgroup
      className={`${prefix}-select-optgroup`}
      label={label}
      disabled={disabled}
      {...restProps}
    />
  );
};

SelectItemGroup.propTypes = {
  /** Provide the contents of <SelectItemGroup>  */
  children: PropTypes.node,

  /** Label for select, if this props is not passed no label will appear. */
  label: PropTypes.string,

  /** Specify whether the <SelectItemGroup> should be disabled */
  disabled: PropTypes.bool
};

SelectItemGroup.defaultProps = {
  disabled: false,
  label: ''
};

export default SelectItemGroup;
