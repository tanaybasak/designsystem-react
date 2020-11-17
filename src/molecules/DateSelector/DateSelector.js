import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { isValidDate } from '../../util/utility';
import Overlay from '../../atoms/Overlay';
import Label from '../../atoms/Label';
import FormHelperText from '../../atoms/FormHelperText';
// import DateInput from '../DateSelector/DateInput';
import SelectPanel from './SelectPanel';

const DateSelector = ({
  type,
  weekDays,
  months,
  format,
  onDateSelect,
  defaultDate,
  className,
  direction,
  scrollListner,
  attachElementToBody,
  sidePanel,
  // label,
  // helperText,
  id,
  ...restProps
}) => {
  const date = new Date();
  const [currDateObj, setCurrDateObj] = useState({
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear()
  });

  const [yearSelected, setYearSelected] = useState(String(date.getFullYear()));
  const [showDateContainer, setShowDateContainer] = useState(false);

  const [dateSelected, setDateSelected] = useState('');

  const [isDateSelectedValid, setIsDateSelectedValid] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const datepickerInput = useRef(null);

  const [targetEl, setTargetEl] = useState(null);

  const onToggle = status => {
    setShowDateContainer(status);
  };

  const toggleDateContainer = target => {
    setIsValidYear(true);
    setYearSelected(String(currDateObj.year));
    setShowDateContainer(!showDateContainer);
    setTargetEl(target.current);
  };

  const updateFormattedDate = (mm, dd, yyyy) => {
    const tempDate = new Date(yyyy, mm - 1, dd);
    const day = tempDate.getDay();
    const month = tempDate.getMonth();
    let monthStr = String(month + 1);
    const year = tempDate.getFullYear();
    const date = tempDate.getDate();
    let dateStr = String(date);
    monthStr.length === 1 ? (monthStr = monthStr.padStart(2, '0')) : null;
    dateStr.length === 1 ? (dateStr = dateStr.padStart(2, '0')) : null;
    setCurrDateObj({
      day: day,
      month: month,
      date: date,
      year: year
    });
    setYearSelected(yyyy);
    switch (format) {
      case 'mm/dd/yyyy':
        setDateSelected(`${monthStr}/${dateStr}/${year}`);
        dateSelected === ''
          ? null
          : onDateSelect(`${monthStr}/${dateStr}/${year}`);
        break;
      case 'dd/mm/yyyy':
        setDateSelected(`${dateStr}/${monthStr}/${year}`);
        dateSelected === ''
          ? null
          : onDateSelect(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  };

  const onEnterPressInputDate = event => {
    setShowDateContainer(false);
    if (event.key === 'Enter') {
      const isdateValid = isValidDate(event.target.value, format);
      setIsDateSelectedValid(isdateValid);
      if (isdateValid && event.target.value !== '') {
        const dateArray = event.target.value.split('/');
        switch (format) {
          case 'mm/dd/yyyy':
            updateFormattedDate(dateArray[0], dateArray[1], dateArray[2]);
            break;
          case 'dd/mm/yyyy':
            updateFormattedDate(dateArray[1], dateArray[0], dateArray[2]);
            break;
        }
      } else {
        setDateSelected(event.target.value);
      }
    }
  };

  const onDateSelection = event => {
    setDateSelected(event.target.getAttribute('date'));
    setIsDateSelectedValid(true);
    setIsValidYear(true);
    setShowDateContainer(false);
    onDateSelect(event.target.getAttribute('date'));
  };

  // console.log('isDateSelectedValid',isDateSelectedValid)

  return (
    <>
      <div className="hcl-dateSelector" data-component="date-picker" id={id}>
        <div className="hcl-overlay-wrapper hcl-dateSelector-container">
          <input
            type="text"
            className="hcl-dateSelector-input"
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
            onKeyPress={onEnterPressInputDate}
            ref={datepickerInput}
            {...restProps}
          />
          <svg
            className="hcl-dateSelector-container-svg hcl-dateSelector-date-icon"
            data-name="Refresh-line-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="13.83"
            height="13.96"
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

          <Overlay
            attachElementToBody={attachElementToBody}
            scrollListner={scrollListner}
            direction={direction}
            showOverlay={showDateContainer}
            targetElement={targetEl}
            onToggle={onToggle}
            preventCloseElements={targetEl ? [targetEl.nextElementSibling] : []}
          >
            <div className="hcl-dateSelector-panel-wrapper">
              {sidePanel}
              <SelectPanel
                currDateObj={currDateObj}
                setCurrDateObj={setCurrDateObj}
                setYearSelected={setYearSelected}
                format={format}
                onDateSelection={onDateSelection}
                dateSelected={dateSelected}
                months={months}
                className="hcl-border-left"
              />
            </div>
          </Overlay>
          {!isDateSelectedValid ? (
            <FormHelperText className="error-msg">
              Invalid date format.
            </FormHelperText>
          ) : null}
        </div>
      </div>
    </>
  );
};

DateSelector.propTypes = {
  /** Days in week.  Array input can be on the basis of language selected.  */
  weekDays: PropTypes.array,

  /** Months in a year.  Array input can be on the basis of language selected.  */
  months: PropTypes.array,

  /**
   MM/DD/YYYY:  One of the format available.
   DD/MM/YYYY: One of the format available. */
  format: PropTypes.string,

  /** Callback function which will be executed on date selection  */
  onDateSelect: PropTypes.func,

  /** className/clasess will be applied on the parent div of DateSelector */
  className: PropTypes.string,

  /** Used for defining the position of DateSelector */
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),

  /** Used to attach the DateSelector container to body */
  attachElementToBody: PropTypes.bool,

  /** Date picker Container position will changed on scroll. This is applicable when DateSelector container is attached to body */
  scrollListner: PropTypes.bool,
  /** Label for time picker, if not provided no label will be added.   */
  label: PropTypes.string,
  /** Specifies helper text */
  // helperText: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** This props allows user to pass default date */
  defaultDate: PropTypes.string
};

DateSelector.defaultProps = {
  weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  months: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ],
  direction: 'bottom-left',
  attachElementToBody: false,
  scrollListner: false,
  format: 'MM/DD/YYYY',
  onDateSelect: () => {},
  className: '',
  label: null,
  // helperText: null,
  id: null,
  defaultDate: ''
};
export default DateSelector;
