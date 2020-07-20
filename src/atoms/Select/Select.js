import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Select = ({ label, onChange, id, className, ...restProps }) => {
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

  /** Call back which will be invoked when selection is made.  */
  onChange: PropTypes.func,

  /** Unique identifier for select component.  */
  id: PropTypes.string,

  /** Class/clasess will be applied on the parent div of Select */
  className: PropTypes.string
};

Select.defaultProps = {
  label: null,
  onChange: () => {},
  className: '',
  id: null
};

export default Select;
