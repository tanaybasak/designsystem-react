import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Select = ({ label, onChange, id, className, disabled, ...restProps }) => {
  const onSelect = event => {
    const itemSelected = {
      value:
        event.currentTarget.options[event.currentTarget.selectedIndex].value,
      text:
        event.currentTarget.options[event.currentTarget.selectedIndex].innerText
    };
    onChange(itemSelected);
  };

  const classnames = `${prefix}-select ${className}`.trim();

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select
        id={id}
        disabled={disabled}
        className={classnames}
        onChange={onSelect}
        {...restProps}
      />
    </>
  );
};

Select.propTypes = {
  /** Label for select, if this props is not passed no label will appear. */
  label: PropTypes.string,

  /** Call back which will be invoked when selection is made.
   *
   * @signature
   * ```item``` : Object returns value and text.
   */
  onChange: PropTypes.func,

  /** Unique identifier for select component.  */
  id: PropTypes.string,

  /** Class/clasess will be applied on the parent div of Select */
  className: PropTypes.string,

  /** Disable select, if this props is not passed the select won't disable. */
  disabled: PropTypes.bool
};

Select.defaultProps = {
  label: null,
  onChange: () => {},
  className: '',
  id: null,
  disabled: false
};

export default Select;
