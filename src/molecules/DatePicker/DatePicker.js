import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';

const DatePicker = ({ weekDays, months, open, format }) => {
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

  const onChangeInputDate = (event) => {
    const isdateValid = isValidDate(event.target.value);
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
        break;
      case 'dd/mm/yyyy':
        setDateSelected(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  }

  const onChangeYear = (event) => {
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

  const toggleDateContainer = () => {
    setIsValidYear(true)
    setYearSelected(String(currDateObj.year));
    setShowDateContainer(!showDateContainer)
  }

  const prevMonth = () => {
    const tempDate = new Date(currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year, currDateObj.month === 0 ? 11 : currDateObj.month - 1, 15);
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
  }

  const nextMonth = () => {
    const tempDate = new Date(currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year, currDateObj.month === 11 ? 0 : currDateObj.month + 1, 15);
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
  }

  const yearIncrease = () => {
    const tempDate = new Date(currDateObj.year + 1, currDateObj.month, 15);
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
    setIsValidYear(true);
    setYearSelected(String(tempDate.getFullYear()));
  }

  const yearDecrease = () => {
    const tempDate = new Date(currDateObj.year - 1, currDateObj.month, 15);
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
    setIsValidYear(true);
    setYearSelected(String(tempDate.getFullYear()));
  }

  const selectDate = (event) => {
    setDateSelected(event.target.getAttribute('date'));
    setIsDateSelectedValid(true);
    setIsValidYear(true)
    toggleDateContainer();
  };

  const isValidYearFunc = (s) => {
    const regex = /^[1-9]{1}[0-9]{3}$/g;
    setIsValidYear(regex.test(s))
    return regex.test(s);
  }

  const isValidDate = (str) => {
    if (str) {
      let tempDate, month, year;
      const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
      str = str.split('/');
      if (str.length === 3 && (str[0].length === 1 || str[1].length === 1)) {
        str[0].length === 1 ? str[0] = str[0].padStart(2, '0') : null;
        str[1].length === 1 ? str[1] = str[1].padStart(2, '0') : null;
      }
      switch (format) {
        case 'mm/dd/yyyy':
          tempDate = new Date(str[2], str[0] - 1, str[1]);
          year = str[2];
          month = str[0];
          break
        case 'dd/mm/yyyy':
          tempDate = new Date(str[2], str[1] - 1, str[0]);
          year = str[2];
          month = str[1];
          break;
      }
      if (tempDate && (tempDate.getMonth() + 1 === Number(month)) && regex.test(str.join('/')) && Number(year) > 999) {
        return true;
      }
      return false;
    }
    if (str === '') {
      return true;
    }
    return false;
  }

  return (
    <section className="hcl-datePicker" data-component="datepicker">
      <div className="hcl-datePicker-container">
        <DateInput
          dateSelected={dateSelected}
          toggleDateContainer={toggleDateContainer}
          onChangeInputDate={onChangeInputDate}
          currDateObj={currDateObj}
          isDateSelectedValid={isDateSelectedValid}
          isValidYear={isValidYear}
          format={format}
        />
        {showDateContainer
          ?
          <div className={`hcl-datePicker-panel hcl-datePicker-panel-show ${open === 'up' ? 'hcl-datePicker-panel-above' : 'hcl-datePicker-panel-below'}`}>
            <YearMonthPanel
              months={months}
              currDateObj={currDateObj}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              yearIncrease={yearIncrease}
              yearDecrease={yearDecrease}
              onChangeYear={onChangeYear}
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
          <div className="hcl-datePicker-error hcl-datePicker-error-show">
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
};

DatePicker.defaultProps = {
  weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  open: 'down',
  format: 'MM/DD/YYYY'
};
export default DatePicker;