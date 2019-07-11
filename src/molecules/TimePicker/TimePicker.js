import React from "react";
import PropTypes from "prop-types";
import prefix from "../../settings";
import period from "./content";

const TimePicker = ({ timeZones, label, onChange }) => {
  let timeObj = {
    time: "00:00",
    period: period.am,
    timezone: timeZones[0]
  };

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
    <div className={`${prefix}-timepicker`}>
      <div className={`${prefix}-timepicker-input`}>
        {label ? <label htmlFor="hcl-timepicker-1">{label}</label> : null}
        <input
          id="hcl-timepicker-1"
          type="text"
          className={`${prefix}-timepicker-input-field`}
          placeholder="hh:mm"
          maxLength="5"
          onChange={onChangeTime}
        />
      </div>
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
  );
};

TimePicker.propTypes = {
  timeZones: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func
};

TimePicker.defaultProps = {
  label: null,
  onChange: () => {}
};

export default TimePicker;
