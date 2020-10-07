import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Radio = ({ className, labelText, onChange, ...restProps }) => {
  const classnames = `${prefix}-radio-item ${className}`.trim();
  const handleChange = evt => {
    onChange(evt.target.value, evt);
  };
  return (
    <div className={classnames}>
      <input
        className={`${prefix}-radio`}
        type="radio"
        {...restProps}
        onChange={handleChange}
      />
      {labelText ? (
        <label className={`${prefix}-radio-label`} htmlFor={restProps.id}>
          {labelText}
        </label>
      ) : null}
    </div>
  );
};

Radio.propTypes = {
  /** Custom class on the Radio wrapper. */
  className: PropTypes.string,
  /** Disable Radio */
  disabled: PropTypes.bool,
  /** Text for Radio Label. */
  labelText: PropTypes.string,
  /** Unique identifier of the element. */
  id: PropTypes.string,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func,
  /** Control Checked state for Radio */
  checked: PropTypes.bool,
  /** Name of radio element */
  name: PropTypes.string,
  /** Text value to be considered when submitting forms. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Radio.defaultProps = {
  className: '',
  labelText: '',
  disabled: false,
  onChange: () => {}
};

export default Radio;
