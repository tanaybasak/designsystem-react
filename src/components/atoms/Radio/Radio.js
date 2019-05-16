import React from "react";
import PropTypes from "prop-types";
import prefix from "../../../settings";

export default function Radio({ className, labelText, ...restProps }) {
  const classnames = `${prefix}-radio-item ${className}`.trim();

  return (
    <div className={classnames}>
      <input
        className={`${prefix}-radio`}
        type="radio"
        {...restProps}
        onChange={event => {
          if (restProps.onChange) {
            restProps.onChange(event);
          }
        }}
      />
      {labelText ? (
        <label className={`${prefix}-radio-label`} htmlFor={restProps.id}>
          {labelText}
        </label>
      ) : null}
    </div>
  );
}

Radio.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Radio.defaultProps = {
  className: "",
  labelText: "",
  disabled: false,
  onChange: () => {},
  checked: false
};
