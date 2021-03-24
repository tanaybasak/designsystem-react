import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Tooltip from '../Tooltip';

const Radio = ({
  className,
  labelText,
  onChange,
  tooltipTitle,
  tooltipDirection,
  ...restProps
}) => {
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
        tooltipTitle ? (
          <Tooltip content={tooltipTitle} direction={tooltipDirection}>
            <label className={`${prefix}-radio-label`} htmlFor={restProps.id}>
              {labelText}
            </label>
          </Tooltip>
        ) : (
          <label className={`${prefix}-radio-label`} htmlFor={restProps.id}>
            {labelText}
          </label>
        )
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
  /** Tooltip Text for Checkbox Label. */
  tooltipTitle: PropTypes.string,
  /** Tooltip Direction eg: top, bottom, left, right */
  tooltipDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Event to subscribe when the Input field is clicked.
   *
   *
   * @value : radio value
   * @event : on change event
   */
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
  tooltipTitle: null,
  tooltipDirection: 'bottom',
  onChange: () => {}
};

export default Radio;
