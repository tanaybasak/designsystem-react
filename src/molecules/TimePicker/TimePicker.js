/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { period, msg_invalid_time } from '../../content';
import Label from '../../atoms/Label';
import FormHelperText from '../../atoms/FormHelperText';
import { Select, SelectItem } from '../../atoms/Select';
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
  errorMessage,
  ...restProps
}) => {
  const classnames = `${prefix}-timepicker ${className}`.trim();
  const [validationMessage, setErrorMessage] = useState('');
  const [time, setTime] = useState(defaultTime.time);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (defaultTime) {
      setTime(defaultTime.time);
      defaultTime.period =
        type === 'HH'
          ? type
          : defaultTime.period
          ? defaultTime.period
          : period.am;
      const tempTimeObj = { ...defaultTime };
      setTimeObject(tempTimeObj);
      if (defaultTime.time) {
        const valid = isValidTime(defaultTime.time, timeObj.period);
        if (valid) {
          setErrorMessage('');
        } else {
          errorMessage
            ? setErrorMessage(errorMessage)
            : setErrorMessage(msg_invalid_time);
        }
      }
    }
  }, [defaultTime]);

  const [timeObj, setTimeObject] = useState({
    time: defaultTime.time ? defaultTime.time : '',
    period:
      type === 'HH'
        ? type
        : defaultTime.period
        ? defaultTime.period
        : period.am,
    timezone: defaultTime.timezone
      ? defaultTime.timezone
      : timeZones && timeZones.length > 0
      ? timeZones[0]
      : null
  });

  const onSelectPeriod = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.period = event.value;

    setTimeObject(tempTimeObject);
    if (validationMessage === '') {
      onChange(tempTimeObject);
    }
  };

  const onSelectTimezone = event => {
    const tempTimeObject = { ...timeObj };
    tempTimeObject.timezone = event.value;
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
      errorMessage
        ? setErrorMessage(errorMessage)
        : setErrorMessage(msg_invalid_time);
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
            errorMessage
              ? setErrorMessage(errorMessage)
              : setErrorMessage(msg_invalid_time);
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
            errorMessage
              ? setErrorMessage(errorMessage)
              : setErrorMessage(msg_invalid_time);
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
    const tempTimeObject = { ...timeObj };
    const valid = isValidTime(newTime, timeObj.period);
    if (valid) {
      setErrorMessage('');
    } else {
      errorMessage
        ? setErrorMessage(errorMessage)
        : newTime !== ''
        ? setErrorMessage(msg_invalid_time)
        : null;
    }
    tempTimeObject.time = newTime;
    onChange(tempTimeObject);
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
          <Select
            aria-label="choose option"
            className="ml-1"
            onChange={onSelectPeriod}
            value={timeObj.period}
            disabled={disabled}
          >
            <SelectItem value={period.am} text={period.am} />
            <SelectItem value={period.pm} text={period.pm} />
          </Select>
        ) : null}

        {timeZones && timeZones.length > 0 ? (
          <Select
            aria-label="choose option"
            className="ml-1"
            value={timeObj.timezone}
            onChange={onSelectTimezone}
            disabled={disabled}
          >
            {timeZones.map(timezone => {
              return (
                <SelectItem value={timezone} key={timezone} text={timezone} />
              );
            })}
          </Select>
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
  /** Callback function which is executed when any change is made in time input.
   *
   * @signature
   * ```object``` : period, time, timezone value
   */
  onChange: PropTypes.func,
  /** Error message content which has to be displayed. */
  errorMessage: PropTypes.string,
  /** Class/clasess will be applied on the parent div of TimePicker */
  className: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** Specifies helper text */
  helperText: PropTypes.string,
  /** This prop allows user to pass default time
   *
   * * ```time``` : time
   * * ```period``` : AM,PM
   * * ```timezone``` :timezone values
   *
   * eg:
   * ```
   * {
   *    time: '12:00',
   *    period: 'AM',
   *    timezone: 'Timezone 1'
   * }
   * ```
   */
  defaultTime: PropTypes.shape({
    time: PropTypes.string,
    period: PropTypes.any,
    timezone: PropTypes.string
  }),
  /**
   * Used to specify the type of time picker
   *
   * * ```hh``` : 12hours clock
   * * ```HH``` : 24hours clock
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
  defaultTime: {
    time: '',
    period: '',
    timezone: ''
  },
  disabled: false,
  errorMessage: null
};

export default TimePicker;
