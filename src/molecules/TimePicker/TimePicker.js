import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { period } from '../../content';

const TimePicker = ({
  className,
  timeZones,
  label,
  onChange,
  ...restProps
}) => {
  let timeObj = {
    time: '00:00',
    period: period.am,
    timezone: timeZones[0]
  };

  const classnames = `${prefix}-timepicker ${className}`.trim();

  const onSelectPeriod = event => {
    timeObj.period =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;
    onChange(timeObj);
  };

  const onSelectTimezone = event => {
    timeObj.timezone =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;
    onChange(timeObj);
  };

  const onChangeTime = event => {
    const regex = /^([0][1-9]|[1][0-2]):([0-5][0-9])$/g;
    if (regex.test(event.target.value)) {
      timeObj.time = event.target.value;
      onChange(timeObj);
    }
  };

  return (
    <div className={classnames} {...restProps}>
      {label ? <label htmlFor="hcl-timepicker-1">{label}</label> : null}
      <div className={`${prefix}-timepicker-input`}>
        <input
          id="hcl-timepicker-1"
          type="text"
          className={`${prefix}-timepicker-input-field`}
          placeholder="hh:mm"
          maxLength="5"
          onChange={onChangeTime}
        />
        <select className={`${prefix}-select`} onChange={onSelectPeriod}>
          <option className={`${prefix}-select-option`} value={period.am}>
            {period.am}
          </option>
          <option className={`${prefix}-select-option`} value={period.pm}>
            {period.pm}
          </option>
        </select>
        <select className={`${prefix}-select`} onChange={onSelectTimezone}>
          {timeZones.map(timezone => {
            return (
              <option
                className={`${prefix}-select-option`}
                value={timezone}
                key={timezone}
              >
                {timezone}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

TimePicker.propTypes = {
  /** Array of possible timezones */
  timeZones: PropTypes.array.isRequired,
  /** Label for time picker, if not provided no label will be added.   */
  label: PropTypes.string,
  /** Callback function which is executed when any change is made in time input.  */
  onChange: PropTypes.func,
  /** Class/clasess will be applied on the parent div of TimePicker */
  className: PropTypes.string
};

TimePicker.defaultProps = {
  label: null,
  onChange: () => {},
  className: ''
};

export default TimePicker;
