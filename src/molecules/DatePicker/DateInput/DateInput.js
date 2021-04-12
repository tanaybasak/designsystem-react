import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';

const DateInput = ({
  dateSelected,
  toggleDateContainer,
  onChangeInputDate,
  isDateSelectedValid,
  isValidYear,
  onEnterPressInputDate,
  format,
  datepickerInput,
  defaultDate,
  // eslint-disable-next-line no-unused-vars
  currDateObj,
  ...restProps
}) => {
  return (
    <>
      <input
        type="text"
        className={`${prefix}-datePicker-input ${
          !(isDateSelectedValid && isValidYear)
            ? `${prefix}-datePicker-container-error`
            : ''
        }`}
        placeholder={format}
        autoComplete="off"
        value={dateSelected ? dateSelected : ''}
        onClick={event => {
          event.stopPropagation();
          toggleDateContainer(datepickerInput);
        }}
        defaultdate={defaultDate}
        onChange={onChangeInputDate}
        onKeyDown={onEnterPressInputDate}
        ref={datepickerInput}
        {...restProps}
      />
      <svg
        className={`${prefix}-datePicker-container-svg`}
        width="14"
        height="16"
        viewBox="0 0 14 16"
        onClick={event => {
          event.stopPropagation();
          toggleDateContainer(datepickerInput);
        }}
      >
        <path
          d=" M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14
                          2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0
                          .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
          fillRule="nonzero"
        />
      </svg>
    </>
  );
};

DateInput.propTypes = {
  dateSelected: PropTypes.string.isRequired,
  toggleDateContainer: PropTypes.func.isRequired,
  onChangeInputDate: PropTypes.func.isRequired,
  isDateSelectedValid: PropTypes.bool.isRequired,
  isValidYear: PropTypes.bool.isRequired,
  format: PropTypes.string.isRequired,
  onEnterPressInputDate: PropTypes.func.isRequired,
  datepickerInput: PropTypes.object.isRequired,
  currDateObj: PropTypes.object,
  defaultDate: PropTypes.string
};
export default DateInput;
