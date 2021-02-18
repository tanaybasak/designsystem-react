import React, { useState, useEffect } from 'react';
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
  defaultTime,
  type,
  labelHH,
  disabled,
  ...restProps
}) => {
  const classnames = `${prefix}-timepicker ${className}`.trim();
  const [validationMessage, setErrorMessage] = useState('');
  const [time, setTime] = useState(defaultTime);

  useEffect(() => {
    setTime(defaultTime);
    const valid = isValidTime(time, timeObj.period);
    if (valid) {
      setErrorMessage('');
    } else {
      setErrorMessage(msg_invalid_time);
    }
  }, [defaultTime]);

  const [timeObj, setTimeObject] = useState({
    time: '',
    period: type === 'HH' ? type : period.am,
    timezone: timeZones && timeZones.length > 0 ? timeZones[0] : null
  });

  const onSelectPeriod = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.period =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;

    setTimeObject(tempTimeObject);
    if (validationMessage === '') {
      onChange(tempTimeObject);
    }
  };

  const onSelectTimezone = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.timezone =
      event.currentTarget.options[event.currentTarget.selectedIndex].innerText;
    setTimeObject(tempTimeObject);
    if (validationMessage === '') {
      onChange(tempTimeObject);
    }
  };

  const updateTime = time => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.time = time;
    setTimeObject(tempTimeObject);
    setErrorMessage('');
    onChange(tempTimeObject);
  };

  const isValidTime = (time, format) => {
    if (format === 'HH') {
      if (
        time.match(/^([01]?[0-9]|2?[0-3])$/g) ||
        time.match(/^([01]?[0-9]|2?[0-3]):$/g) ||
        time.match(/^([01]?[0-9]|2?[0-3]):[0-5]$/g) ||
        time.match(/^([01]?[0-9]|2?[0-3]):[0-5][0-9]$/g)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (time.startsWith('00')) {
        return false;
      } else if (
        time.match(/^(0?[1-9]|1?[0-2])$/g) ||
        time.match(/^(0?[1-9]|1?[0-2]):$/g) ||
        time.match(/^(0?[1-9]|1?[0-2]):[0-5]$/g) ||
        time.match(/^(0?[1-9]|1?[0-2]):[0-5][0-9]$/g)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const isTimeValidIn12hFormat = newTime => {
    if (newTime.startsWith('00')) {
      setErrorMessage(msg_invalid_time);
    } else {
      setTime(newTime);
      updateTime(newTime);
    }
  };

  const onSelectingTime = () => {
    if (timeObj.time !== time) {
      if (timeObj.period === type) {
        if (time) {
          if (time.match(/^([01]?[0-9]|2?[0-3]):[0-5][0-9]$/g)) {
            let timeArray = time.split(':');
            let newTime = ('0' + timeArray[0]).slice(-2) + ':' + timeArray[1];
            setTime(newTime);
            updateTime(newTime);
          } else if (time.match(/^([01]?[0-9]|2?[0-3])$/g)) {
            const newTime = ('0' + time).slice(-2) + ':00';
            setTime(newTime);
            updateTime(newTime);
          } else if (time.match(/^([01]?[0-9]|2?[0-3]):$/g)) {
            const newTime = ('0' + time).slice(-3) + '00';
            setTime(newTime);
            updateTime(newTime);
          } else {
            setErrorMessage(msg_invalid_time);
          }
        } else {
          updateTime(time);
        }
      } else {
        if (time) {
          if (time.match(/^(0?[1-9]|1?[0-2]):[0-5][0-9]$/g)) {
            let timeArray = time.split(':');
            let newTime = ('0' + timeArray[0]).slice(-2) + ':' + timeArray[1];
            isTimeValidIn12hFormat(newTime);
          } else if (time.match(/^(0?[1-9]|1?[0-2])$/g)) {
            const newTime = ('0' + time).slice(-2) + ':00';
            isTimeValidIn12hFormat(newTime);
          } else if (time.match(/^(0?[1-9]|1?[0-2]):$/g)) {
            const newTime = ('0' + time).slice(-3) + '00';
            isTimeValidIn12hFormat(newTime);
          } else {
            setErrorMessage(msg_invalid_time);
          }
        } else {
          updateTime(time);
        }
      }
    }
  };
  const onChangeTime = evt => {
    const newTime = evt.target.validity.valid ? evt.target.value : time;
    setTime(newTime);
    const valid = isValidTime(newTime, timeObj.period);
    if (valid) {
      setErrorMessage('');
    } else {
      setErrorMessage(msg_invalid_time);
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
          placeholder={`${type}:mm`}
          maxLength="5"
          data-invalid={validationMessage ? true : false}
          pattern="[0-9:]*"
          value={time}
          onBlur={onSelectingTime}
          disabled={disabled}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              onSelectingTime(e);
            }
          }}
          onChange={onChangeTime}
        />
        {type === 'HH' && labelHH !== '' ? (
          <span className={`${prefix}-timepicker-hour-label`}>{labelHH}</span>
        ) : null}
        {type !== 'HH' ? (
          <select
            className={`${prefix}-select`}
            aria-label="choose option"
            onChange={onSelectPeriod}
            disabled={disabled}
          >
            <option className={`${prefix}-select-option`} value={period.am}>
              {period.am}
            </option>
            <option className={`${prefix}-select-option`} value={period.pm}>
              {period.pm}
            </option>
          </select>
        ) : null}

        {timeZones && timeZones.length > 0 ? (
          <select
            className={`${prefix}-select`}
            aria-label="choose option"
            onChange={onSelectTimezone}
            disabled={disabled}
          >
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
        ) : null}
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
  timeZones: PropTypes.array,
  /** Label for time picker, if not provided no label will be added.   */
  label: PropTypes.string,
  /** Callback function which is executed when any change is made in time input.  */
  onChange: PropTypes.func,
  /** Class/clasess will be applied on the parent div of TimePicker */
  className: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** Specifies helper text */
  helperText: PropTypes.string,
  /** This prop allows user to pass default time */
  defaultTime: PropTypes.string,
  /**
   * Used to specify the type of time picker
   * hh : 12hours clock
   * HH : 24hours clock
   */
  type: PropTypes.oneOf(['hh', 'HH']),
  /** Label used for 24hours clock */
  labelHH: PropTypes.string,
  /** Disables the  Time Picker  */
  disabled: PropTypes.bool
};

TimePicker.defaultProps = {
  label: null,
  helperText: null,
  onChange: () => {},
  id: null,
  className: '',
  type: 'hh',
  labelHH: '',
  defaultTime: '',
  disabled: false
};

export default TimePicker;
