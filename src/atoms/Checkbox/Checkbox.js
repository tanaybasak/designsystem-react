import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import prefix from '../../settings';

export default function Checkbox({
  className,
  checked,
  label,
  indeterminate,
  tooltipTitle,
  tooltipDirection,
  ...restProps
}) {
  const [isChecked, setChecked] = useState(checked || false);
  const classnames = `${prefix}-checkbox-item ${className}`.trim();

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <div className={classnames}>
      <input
        className={`${prefix}-checkbox`}
        type="checkbox"
        checked={isChecked}
        ref={el => el && (el.indeterminate = indeterminate)}
        {...restProps}
        onChange={event => {
          setChecked(!isChecked);
          if (restProps.onChange) {
            restProps.onChange(event);
          }
        }}
      />
      {tooltipTitle ? (
        <Tooltip content={tooltipTitle} direction={tooltipDirection}>
          <label className={`${prefix}-checkbox-label`} htmlFor={restProps.id}>
            {label}
          </label>
        </Tooltip>
      ) : (
        <label className={`${prefix}-checkbox-label`} htmlFor={restProps.id}>
          {label}
        </label>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  /** Custom class on the Checkbox wrapper. */
  className: PropTypes.string,
  /** Disable Checkbox */
  disabled: PropTypes.bool,
  /** Text for Checkbox Label. */
  label: PropTypes.string,
  /** Tooltip Text for Checkbox Label. */
  tooltipTitle: PropTypes.string,
  /** Tooltip Direction eg: top, bottom, left, right */
  tooltipDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Unique string for the Checkbox. */
  id: PropTypes.string.isRequired,
  /** indeterminate state for Checkbox */
  indeterminate: PropTypes.bool,
  /** Accepts event handler as prop/argument.
   *
   * @signature
   * ```event```: sends a callback event
   */
  onChange: PropTypes.func,
  /** Control Checked state for Checkbox */
  checked: PropTypes.bool,
  /** Unique identifier used within forms. */
  name: PropTypes.string,
  /** Text value to be considered when submitting forms. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Checkbox.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  tooltipTitle: null,
  tooltipDirection: 'bottom',
  onChange: () => {},
  checked: false,
  indeterminate: false
};
