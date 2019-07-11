import React, { useRef } from "react";
import PropTypes from "prop-types";
import prefix from "../../settings";

const Select = ({ items, label, onChange, id }) => {
  const select = useRef(null);
  const onSelect = event => {
    const itemSelected = {
      id: event.currentTarget.options[event.currentTarget.selectedIndex].id,
      text:
        event.currentTarget.options[event.currentTarget.selectedIndex].innerText
    };
    onChange(itemSelected);
  };

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select id={id} className={`${prefix}-select`} onChange={onSelect}>
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
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired
};

Select.defaultProps = {
  label: null,
  onChange: () => {}
};

export default Select;
