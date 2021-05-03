/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';
import prefix from '../../settings';
import { isValidDate } from '../../util/utility';
import Overlay from '../../atoms/Overlay';
import Label from '../../atoms/Label';
import FormHelperText from '../../atoms/FormHelperText';
import ComponentDeprecated from '../../util/ComponentDeprecated';

const DatePicker = ({
  weekDays,
  months,
  format,
  onDateSelect,
  defaultDate,
  className,
  direction,
  scrollListner,
  attachElementToBody,
  label,
  helperText,
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
  const [showDateContainer, setShowDateContainer] = useState(false);
  const [yearSelected, setYearSelected] = useState(String(date.getFullYear()));
  const [dateSelected, setDateSelected] = useState('');
  const [isDateSelectedValid, setIsDateSelectedValid] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const datepickerInput = useRef(null);

  const [targetEl, setTargetEl] = useState(null);

  useEffect(() => {
    if (defaultDate && defaultDate !== '') {
      const defaultDateArray = datepickerInput.current
        .getAttribute('defaultdate')
        .split('/');

      switch (format) {
        case 'mm/dd/yyyy':
          updateFormattedDate(
            defaultDateArray[0],
            defaultDateArray[1],
            defaultDateArray[2]
          );
          break;
        case 'dd/mm/yyyy':
          updateFormattedDate(
            defaultDateArray[1],
            defaultDateArray[0],
            defaultDateArray[2]
          );
          break;
      }
    }
  }, [defaultDate]);

  const onEnterPressInputDate = event => {
    if (event.key === 'Enter' || event.key === 'Tab') {
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
      if (event.key === 'Tab') {
        setShowDateContainer(false);
      }
    }
  };

  const onEnterPressYear = event => {
    if (event.key === 'Enter') {
      if (isValidYearFunc(event.target.value)) {
        const tempDate = new Date(
          Number(event.target.value),
          currDateObj.month,
          15
        );
        setCurrDateObj({
          day: tempDate.getDay(),
          month: tempDate.getMonth(),
          date: tempDate.getDate(),
          year: tempDate.getFullYear()
        });
        setYearSelected(event.target.value);
      } else {
        setYearSelected(event.target.value);
      }
    }
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

  const toggleDateContainer = target => {
    setIsValidYear(true);
    setYearSelected(String(currDateObj.year));
    setShowDateContainer(!showDateContainer);
    setTargetEl(target.current);
  };

  const monthChangeHandler = event => {
    event.stopPropagation();
    event.preventDefault();
    let tempDate;
    if (
      event.currentTarget.classList.contains(`${prefix}-datePicker-month-next`)
    ) {
      tempDate = new Date(
        currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year,
        currDateObj.month === 11 ? 0 : currDateObj.month + 1,
        15
      );
    } else if (
      event.currentTarget.classList.contains(`${prefix}-datePicker-month-prev`)
    ) {
      tempDate = new Date(
        currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year,
        currDateObj.month === 0 ? 11 : currDateObj.month - 1,
        15
      );
    }
    setCurrDateObj({
      day: tempDate.getDay(),
      month: tempDate.getMonth(),
      date: tempDate.getDate(),
      year: tempDate.getFullYear()
    });
    setYearSelected(String(tempDate.getFullYear()));
  };

  const yearChangeHandler = event => {
    event.stopPropagation();
    event.preventDefault();
    let tempDate;
    if (event.target.classList.contains(`${prefix}-datePicker-up`)) {
      tempDate = new Date(currDateObj.year + 1, currDateObj.month, 15);
    } else {
      tempDate = new Date(currDateObj.year - 1, currDateObj.month, 15);
    }
    setCurrDateObj({
      day: tempDate.getDay(),
      month: tempDate.getMonth(),
      date: tempDate.getDate(),
      year: tempDate.getFullYear()
    });
    setIsValidYear(true);
    setYearSelected(String(tempDate.getFullYear()));
  };

  const selectDate = event => {
    setDateSelected(event.target.getAttribute('date'));
    setIsDateSelectedValid(true);
    setIsValidYear(true);
    setShowDateContainer(false);
    onDateSelect(event.target.getAttribute('date'));
  };

  const isValidYearFunc = str => {
    const regex = /^[1-9]{1}[0-9]{3}$/g;
    setIsValidYear(regex.test(str));
    return regex.test(str);
  };

  const classnames = [`${prefix}-datePicker`];
  if (className) {
    classnames.push(className);
  }
  if (showDateContainer) {
    classnames.push(`${prefix}-overlay-wrapper-active`);
  }

  const onToggle = status => {
    setShowDateContainer(status);
  };

  return (
    <div className={classnames.join(' ')}>
      {label ? <Label htmlFor={id ? id : null}>{label}</Label> : null}
      {helperText ? (
        <FormHelperText className="helper-text">{helperText}</FormHelperText>
      ) : null}
      <div className="hcl-overlay-wrapper hcl-datePicker-container">
        <DateInput
          dateSelected={dateSelected}
          defaultDate={defaultDate}
          toggleDateContainer={toggleDateContainer}
          onChangeInputDate={event => {
            setDateSelected(event.target.value);
          }}
          currDateObj={currDateObj}
          isDateSelectedValid={isDateSelectedValid}
          isValidYear={isValidYear}
          format={format}
          onEnterPressInputDate={onEnterPressInputDate}
          datepickerInput={datepickerInput}
          {...restProps}
        />
        <Overlay
          attachElementToBody={attachElementToBody}
          scrollListner={scrollListner}
          direction={direction}
          showOverlay={showDateContainer}
          targetElement={targetEl}
          onToggle={onToggle}
          preventCloseElements={targetEl ? [targetEl.nextElementSibling] : []}
        >
          <div className={`${prefix}-datePicker-panel`}>
            <YearMonthPanel
              months={months}
              currDateObj={currDateObj}
              monthChangeHandler={monthChangeHandler}
              yearChangeHandler={yearChangeHandler}
              onChangeYear={event => {
                setYearSelected(event.target.value);
              }}
              onEnterPressYear={onEnterPressYear}
              yearSelected={yearSelected}
            />
            <WeekPanel weekDays={weekDays} />
            <DatePanel
              currDateObj={currDateObj}
              dateSelected={dateSelected}
              selectDate={selectDate}
              format={format}
            />
          </div>
        </Overlay>
      </div>
      {!isDateSelectedValid ? (
        <FormHelperText className="error-msg">
          Invalid date format.
        </FormHelperText>
      ) : null}
    </div>
  );
};

DatePicker.propTypes = {
  /** Days in week.  Array input can be on the basis of language selected.  */
  weekDays: PropTypes.array,

  /** Months in a year.  Array input can be on the basis of language selected.  */
  months: PropTypes.array,

  /**
   *
   * * ```mm/dd/yyyy``` :  One of the format available.
   * * ```dd/mm/yyyy``` : One of the format available. */
  format: PropTypes.string,

  /** Callback function which will be executed on date selection
   *
   * @signature
   * ```date``` : date
   */
  onDateSelect: PropTypes.func,

  /** Class/clasess will be applied on the parent div of DatePicker */
  className: PropTypes.string,

  /** Used for defining the position of datepicker */
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),

  /** Used to attach the datepicker container to body */
  attachElementToBody: PropTypes.bool,

  /** Date picker Container position will changed on scroll. This is applicable when datepicker container is attached to body */
  scrollListner: PropTypes.bool,
  /** Label for time picker, if not provided no label will be added.   */
  label: PropTypes.string,
  /** Specifies helper text */
  helperText: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** This props allows user to pass default date */
  defaultDate: PropTypes.string
};

DatePicker.defaultProps = {
  weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  direction: 'bottom-left',
  attachElementToBody: false,
  scrollListner: false,
  format: 'MM/DD/YYYY',
  onDateSelect: () => {},
  className: '',
  label: null,
  helperText: null,
  id: null,
  defaultDate: ''
};

DatePicker.displayName = 'DatePicker';
export default ComponentDeprecated(DatePicker, 'Please use Date Selector');
