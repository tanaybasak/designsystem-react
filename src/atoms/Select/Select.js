import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Select = ({ items, label, onChange, id, className, ...restProps }) => {
  const select = useRef(null);
  const onSelect = event => {
    const itemSelected = {
      id: event.currentTarget.options[event.currentTarget.selectedIndex].id,
      text:
        event.currentTarget.options[event.currentTarget.selectedIndex].innerText
    };
    onChange(itemSelected);
  };

  const classnames = `${prefix}-select ${className}`.trim();

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select id={id} className={classnames} onChange={onSelect} {...restProps}>
        {items.map(item => {
          return (
            <option
              className={`${prefix}-select-option`}
              value={item.text}
              key={item.id}
              id={item.id}
            >
              {item.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

Select.propTypes = {
  /** Items which should be available options. */
  items: PropTypes.array.isRequired,

  /** Label for select, if this props is not passed no label will appear. */
  label: PropTypes.string,

  /** Call back which will be invoked when selection is made.  */
  onChange: PropTypes.func,

  /** Unique identifier for select component.  */
  id: PropTypes.string.isRequired,

  /** Class/clasess will be applied on the parent div of Select */
  className: PropTypes.string
};

Select.defaultProps = {
  label: null,
  onChange: () => {},
  className: ''
};

export default Select;
