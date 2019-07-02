import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';
import prefix from '../../settings';
import { positionComponent, isValidDate } from '../../util/utility'

const DatePicker = ({ weekDays, months, open, format, onDateSelect }) => {
  const date = new Date();
  const [currDateObj, setCurrDateObj] = useState({
    'day': date.getDay(),
    'month': date.getMonth(),
    'date': date.getDate(),
    'year': date.getFullYear(),
  });
  const [showDateContainer, setShowDateContainer] = useState(false);
  const [yearSelected, setYearSelected] = useState(String(date.getFullYear()));
  const [dateSelected, setDateSelected] = useState('');
  const [isDateSelectedValid, setIsDateSelectedValid] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const [direction, setDirection] = useState(open);
  const datePickerContainer = useRef(null);

  useEffect(() => {
    positionComponent(() => { setDirection('top') }, () => { setDirection('bottom') }, open, datePickerContainer.current);
  });

  const onEnterPressInputDate = (event) => {
    if (event.key === "Enter") {
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

  const onEnterPressYear = (event) => {
    if (event.key === "Enter") {
      if (isValidYearFunc(event.target.value)) {
        const tempDate = new Date(Number(event.target.value), currDateObj.month, 15);
        setCurrDateObj({
          'day': tempDate.getDay(),
          'month': tempDate.getMonth(),
          'date': tempDate.getDate(),
          'year': tempDate.getFullYear(),
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
    monthStr.length === 1 ? monthStr = monthStr.padStart(2, '0') : null;
    dateStr.length === 1 ? dateStr = dateStr.padStart(2, '0') : null;
    setCurrDateObj({
      'day': day,
      'month': month,
      'date': date,
      'year': year,
    });
    setYearSelected(yyyy);
    switch (format) {
      case 'mm/dd/yyyy':
        setDateSelected(`${monthStr}/${dateStr}/${year}`);
        onDateSelect(`${monthStr}/${dateStr}/${year}`)
        break;
      case 'dd/mm/yyyy':
        setDateSelected(`${dateStr}/${monthStr}/${year}`);
        onDateSelect(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  };

  const toggleDateContainer = () => {
    setIsValidYear(true)
    setYearSelected(String(currDateObj.year));
    setShowDateContainer(!showDateContainer)
  };

  const monthChangeHandler = (event) => {
    let tempDate;
    if (event.target.parentElement.classList.contains(`${prefix}-datePicker-month-next`)) {
      tempDate = new Date(currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year, currDateObj.month === 11 ? 0 : currDateObj.month + 1, 15);
    } else {
      tempDate = new Date(currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year, currDateObj.month === 0 ? 11 : currDateObj.month - 1, 15);
    }
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
  };

  const yearChangeHandler = (event) => {
    let tempDate;
    if (event.target.classList.contains(`${prefix}-datePicker-up`)) {
      tempDate = new Date(currDateObj.year + 1, currDateObj.month, 15);
    } else {
      tempDate = new Date(currDateObj.year - 1, currDateObj.month, 15);
    }
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
    setIsValidYear(true);
    setYearSelected(String(tempDate.getFullYear()));
  };

  const selectDate = (event) => {
    setDateSelected(event.target.getAttribute('date'));
    setIsDateSelectedValid(true);
    setIsValidYear(true)
    toggleDateContainer();
    onDateSelect(event.target.getAttribute('date'))
  };

  const isValidYearFunc = (str) => {
    const regex = /^[1-9]{1}[0-9]{3}$/g;
    setIsValidYear(regex.test(str))
    return regex.test(str);
  };

  return (
    <section className={`${prefix}-datePicker`} data-component="datepicker">
      <div className={`${prefix}-datePicker-container`}>
        <DateInput
          dateSelected={dateSelected}
          toggleDateContainer={toggleDateContainer}
          onChangeInputDate={(event) => { setDateSelected(event.target.value) }}
          currDateObj={currDateObj}
          isDateSelectedValid={isDateSelectedValid}
          isValidYear={isValidYear}
          format={format}
          onEnterPressInputDate={onEnterPressInputDate}
        />
        {showDateContainer
          ?
          <div className={`${prefix}-datePicker-panel ${prefix}-datePicker-panel-show ${direction === 'top' ? `${prefix}-datePicker-panel-above` : `${prefix}-datePicker-panel-below`}`} ref={datePickerContainer}>
            <YearMonthPanel
              months={months}
              currDateObj={currDateObj}
              monthChangeHandler={monthChangeHandler}
              yearChangeHandler={yearChangeHandler}
              onChangeYear={(event) => { setYearSelected(event.target.value) }}
              onEnterPressYear={onEnterPressYear}
              yearSelected={yearSelected}
            />
            <WeekPanel weekDays={weekDays} />
            <DatePanel currDateObj={currDateObj} dateSelected={dateSelected} selectDate={selectDate} format={format} />
          </div>
          : null}
      </div>
      {
        !isDateSelectedValid
          ?
          <div className={`${prefix}-datePicker-error ${prefix}-datePicker-error-show`}>
            Invalid date format.
            </div>
          : null
      }
    </section>);
}

DatePicker.propTypes = {
  weekDays: PropTypes.array,
  months: PropTypes.array,
  open: PropTypes.string,
  format: PropTypes.string,
  onDateSelect: PropTypes.func
};

DatePicker.defaultProps = {
  weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  open: 'down',
  format: 'MM/DD/YYYY',
  onDateSelect: () => { },
};
export default DatePicker;