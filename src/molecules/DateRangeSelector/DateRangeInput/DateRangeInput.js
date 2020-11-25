import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import { isValidDate, convertToDateObj } from '../../../util/utility';

const DateRangeInput = ({
  startDateSelected,
  endDateSelected,
  toggleDateContainer,
  defaultStartDate,
  defaultEndDate,
  setShowDateContainer,
  setIsStartDateSelectedValid,
  setIsEndDateSelectedValid,
  format,
  setStartDateSelected,
  setEndDateSelected,
  updateFormattedDate,
  datepickerStartInput,
  datepickerEndInput,
  onDateRangeSelect,
  isStartDateSelectedValid,
  isEndDateSelectedValid
}) => {
  const onEnterPressInputDate = event => {
    setShowDateContainer(false);

    if (event.key === 'Enter') {
      const isdateValid = isValidDate(event.target.value, format);
      const type = event.currentTarget.getAttribute('data-type');
      if (type === 'start') {
        setIsStartDateSelectedValid(isdateValid);
      } else {
        setIsEndDateSelectedValid(isdateValid);
      }
      if (isdateValid && event.target.value !== '') {
        const dateArray = event.target.value.split('/');
        switch (format) {
          case 'mm/dd/yyyy':
            updateFormattedDate(dateArray[0], dateArray[1], dateArray[2], type);
            break;
          case 'dd/mm/yyyy':
            updateFormattedDate(dateArray[1], dateArray[0], dateArray[2], type);
            break;
        }
        if (
          startDateSelected &&
          endDateSelected &&
          isStartDateSelectedValid &&
          isEndDateSelectedValid
        )
          onDateRangeSelect({
            start: convertToDateObj(format, startDateSelected),
            end: convertToDateObj(format, endDateSelected)
          });
      } else {
        if (type === 'start') {
          setStartDateSelected(event.target.value);
        } else {
          setEndDateSelected(event.target.value);
        }
      }
    }
  };

  return (
    <>
      <div className="hcl-flex-row">
        <div className="hcl-flex-col hcl-form-group">
          <label className="mb-3 hcl-dateSelector-label">Start</label>
          <input
            type="text"
            data-type="start"
            className=" hcl-dateSelector-range-input hcl-dateSelector-input  mr-1"
            placeholder={format}
            autoComplete="off"
            value={startDateSelected ? startDateSelected : ''}
            aria-label="Date Selector label"
            onClick={event => {
              event.stopPropagation();
              toggleDateContainer(datepickerStartInput);
            }}
            defaultdate={defaultStartDate}
            onChange={event => {
              setStartDateSelected(event.target.value);
            }}
            onKeyPress={onEnterPressInputDate}
            ref={datepickerStartInput}
          />
        </div>

        <div className="hcl-flex-col hcl-form-group">
          <label className="mb-3 hcl-dateSelector-label">End</label>
          <input
            type="text"
            data-invalid={!isEndDateSelectedValid}
            data-type="end"
            className="hcl-dateSelector-input hcl-dateSelector-range-input"
            placeholder={format}
            autoComplete="off"
            value={endDateSelected ? endDateSelected : ''}
            aria-label="Date Selector label"
            onClick={event => {
              event.stopPropagation();
              toggleDateContainer(datepickerEndInput);
            }}
            defaultdate={defaultEndDate}
            onChange={event => {
              setEndDateSelected(event.target.value);
            }}
            onKeyPress={onEnterPressInputDate}
            ref={datepickerEndInput}
          />
        </div>
      </div>

      <svg
        className="hcl-dateSelector-container-svg hcl-dateSelector-range-icon"
        data-name="Refresh-line-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="13.83"
        height="13.96"
        onClick={event => {
          event.stopPropagation();
          toggleDateContainer(datepickerEndInput);
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
    </>
  );
};

DateRangeInput.propTypes = {
  startDateSelected: PropTypes.string,
  endDateSelected: PropTypes.string,
  toggleDateContainer: PropTypes.func.isRequired,
  defaultStartDate: PropTypes.string,
  defaultEndDate: PropTypes.string,
  setShowDateContainer: PropTypes.func,
  setIsStartDateSelectedValid: PropTypes.func.isRequired,
  setIsEndDateSelectedValid: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  setStartDateSelected: PropTypes.func.isRequired,
  setEndDateSelected: PropTypes.func.isRequired,
  updateFormattedDate: PropTypes.func.isRequired,
  datepickerStartInput: PropTypes.object.isRequired,
  datepickerEndInput: PropTypes.object.isRequired
};

export default DateRangeInput;
