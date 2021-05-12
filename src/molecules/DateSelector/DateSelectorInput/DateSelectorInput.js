import React from 'react';
import PropTypes from 'prop-types';
// import prefix from '../../../../settings';
import { isValidDate, createDateObj } from '../../../util/utility';

const DateSelectorInput = ({
  format,
  dateSelected,
  toggleDateContainer,
  datepickerInput,
  defaultDate,
  setDateSelected,
  updateFormattedDate,
  setShowDateContainer,
  setIsDateSelectedValid,
  className,
  onDateSelect,
  disabled,
  ...restProps
}) => {
  const onEnterPressInputDate = event => {
    setShowDateContainer(false);
    if (event.key === 'Enter' || event.key === 'Tab') {
      const isdateValid = isValidDate(event.target.value, format);
      setIsDateSelectedValid(isdateValid);
      if (isdateValid && event.target.value !== '') {
        const dateArray = event.target.value.split('/');
        switch (format) {
          case 'mm/dd/yyyy':
            updateFormattedDate(dateArray[0], dateArray[1], dateArray[2]);
            onDateSelect(
              createDateObj(
                Number(dateArray[1]),
                Number(dateArray[0]),
                dateArray[2]
              )
            );
            break;
          case 'dd/mm/yyyy':
            updateFormattedDate(dateArray[1], dateArray[0], dateArray[2]);
            onDateSelect(
              createDateObj(
                Number(dateArray[0]),
                Number(dateArray[1]),
                dateArray[2]
              )
            );
            break;
        }
      } else {
        setDateSelected(event.target.value);
      }
    }
  };
  return (
    <div className="hcl-form-group">
      <input
        disabled={disabled}
        type="text"
        className={`hcl-dateSelector-input ${className}`}
        placeholder={format}
        autoComplete="off"
        aria-label="Date Selector label"
        value={dateSelected ? dateSelected : ''}
        onClick={event => {
          event.stopPropagation();
          toggleDateContainer(datepickerInput);
        }}
        defaultdate={defaultDate}
        onChange={event => {
          setDateSelected(event.target.value);
        }}
        onKeyDown={onEnterPressInputDate}
        ref={datepickerInput}
        {...restProps}
      />
      <svg
        className="hcl-dateSelector-container-svg hcl-dateSelector-date-icon"
        data-name="Refresh-line-icon"
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="13.83"
        height="13.96"
        onClick={event => {
          event.stopPropagation();
          toggleDateContainer(datepickerInput);
        }}
      >
        <rect
          id="f26ee432-18e2-4e60-b70a-247a0b605d39"
          data-name="&lt;Transparent Rectangleh&gt;"
          width="16"
          height="16"
          fill="none"
        />
        <path d="M11.5,2H11V1H10V2H6V1H5V2H4.5A2.5,2.5,0,0,0,2,4.5v7A2.5,2.5,0,0,0,4.5,14h7A2.5,2.5,0,0,0,14,11.5v-7A2.5,2.5,0,0,0,11.5,2Zm-7,1H5V4H6V3h4V4h1V3h.5A1.5,1.5,0,0,1,13,4.5V5H3V4.5A1.5,1.5,0,0,1,4.5,3Zm7,10h-7A1.5,1.5,0,0,1,3,11.5V6H13v5.5A1.5,1.5,0,0,1,11.5,13Z" />
      </svg>
    </div>
  );
};

DateSelectorInput.propTypes = {
  format: PropTypes.string.isRequired,
  dateSelected: PropTypes.string.isRequired,
  toggleDateContainer: PropTypes.func.isRequired,
  datepickerInput: PropTypes.object.isRequired,
  defaultDate: PropTypes.string.isRequired,
  setDateSelected: PropTypes.func.isRequired,
  updateFormattedDate: PropTypes.func.isRequired,
  setShowDateContainer: PropTypes.func.isRequired,
  setIsDateSelectedValid: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onDateSelect: PropTypes.func
};

export default DateSelectorInput;
