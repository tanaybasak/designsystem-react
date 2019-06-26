import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';

const DatePicker = ({ weekDays, months, open }) => {

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
      const tempDate = new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
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
      setYearSelected(dateArray[2]);
      setDateSelected(`${monthStr}/${dateStr}/${year}`);
    } else {
      setDateSelected(event.target.value);
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
    console
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
    setYearSelected(String(Number(yearSelected) + 1));
  }

  const yearDecrease = () => {
    const tempDate = new Date(currDateObj.year - 1, currDateObj.month, 15);
    setCurrDateObj({
      'day': tempDate.getDay(),
      'month': tempDate.getMonth(),
      'date': tempDate.getDate(),
      'year': tempDate.getFullYear(),
    });
    setYearSelected(String(Number(yearSelected) - 1));
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
    return isValidYear;
  }

  const isValidDate = (s) => {
    if (s) {
      const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
      s = s.split('/');
      if (s.length === 3 && (s[0].length === 1 || s[1].length === 1)) {
        s[0].length === 1 ? s[0] = s[0].padStart(2, '0') : null;
        s[1].length === 1 ? s[1] = s[1].padStart(2, '0') : null;
      }
      const d = new Date(s[2], s[0] - 1, s[1]);
      if (d && (d.getMonth() + 1) === Number(s[0]) && regex.test(s.join('/')) && Number(s[2]) > 999) {
        return true;
      }
      return false;
    }
    if (s === '') {
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
            <DatePanel currDateObj={currDateObj} dateSelected={dateSelected} selectDate={selectDate} />
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
  open: PropTypes.string
};

DatePicker.defaultProps = {
  weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  open: 'down'
};
export default DatePicker;