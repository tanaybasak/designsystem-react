import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { period, msg_invalid_time } from '../../content';
import Label from '../../atoms/Label';
import FormHelperText from '../../atoms/FormHelperText';
const TimePicker = ({
  className,
  timeZones,
  label,
  helperText,
  id,
  onChange,
  ...restProps
}) => {
  const classnames = `${prefix}-timepicker ${className}`.trim();
  const [validationMessage, setErrorMessage] = useState('');
  const [time, setTime] = useState('');

  const [timeObj, setTimeObject] = useState({
    time: '',
    period: period.am,
    timezone: timeZones[0]
  });

  const onSelectPeriod = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.period =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;

    setTimeObject(tempTimeObject);
    onChange(tempTimeObject);
  };

  const onSelectTimezone = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.timezone =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;
    setTimeObject(tempTimeObject);
    onChange(tempTimeObject);
  };

  const updateTime = time => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.time = time;
    setTimeObject(tempTimeObject);
    setErrorMessage('');
    onChange(tempTimeObject);
  };

  const onSelectingTime = () => {
    if (timeObj.time !== time) {
      if (time) {
        if (time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g)) {
          updateTime(time);
        } else if (time.match(/^([01]?[0-9]|2[0-3])$/g)) {
          const newTime = time + ':00';
          setTime(newTime);
          updateTime(newTime);
        } else if (time.match(/^([01]?[0-9]|2[0-3]):$/g)) {
          const newTime = time + '00';
          setTime(newTime);
          updateTime(newTime);
        } else {
          setErrorMessage(msg_invalid_time);
        }
      } else {
        updateTime(time);
      }
    }
  };
  const onChangeTime = evt => {
    const newTime = evt.target.validity.valid ? evt.target.value : time;
    setTime(newTime);
    if (newTime) {
      if (
        newTime.match(/^([01]?[0-9]|2[0-3])$/g) ||
        newTime.match(/^([01]?[0-9]|2[0-3]):$/g) ||
        newTime.match(/^([01]?[0-9]|2[0-3]):[0-5]$/g) ||
        newTime.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g)
      ) {
        setErrorMessage('');
      } else {
        setErrorMessage(msg_invalid_time);
      }
    }
  };

  return (
    <div className={classnames} {...restProps}>
      {label ? <Label htmlFor={id ? id : null}>{label}</Label> : null}
      {helperText ? (
        <FormHelperText className="helper-text">{helperText}</FormHelperText>
      ) : null}
      <div className={`${prefix}-timepicker-input`}>
        <input
          id={id ? id : null}
          type="text"
          className={`${prefix}-form-control`}
          placeholder="hh:mm"
          maxLength="5"
          data-invalid={validationMessage ? true : false}
          pattern="[0-9:]*"
          value={time}
          onBlur={onSelectingTime}
          onKeyDown={e => {
              if(e.keyCode === 13) {
                onSelectingTime(e)
              }
          }}
          onChange={onChangeTime}
        />
        <select className={`${prefix}-select`} aria-label="choose option" onChange={onSelectPeriod}>
          <option className={`${prefix}-select-option`} value={period.am}>
            {period.am}
          </option>
          <option className={`${prefix}-select-option`} value={period.pm}>
            {period.pm}
          </option>
        </select>
        <select className={`${prefix}-select`} aria-label="choose option" onChange={onSelectTimezone}>
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
      {validationMessage ? (
        <FormHelperText className="error-msg">
          {validationMessage}
        </FormHelperText>
      ) : null}
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
  className: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** Specifies helper text */
  helperText: PropTypes.string
};

TimePicker.defaultProps = {
  label: null,
  helperText: null,
  onChange: () => {},
  id: null,
  className: ''
};

export default TimePicker;
