/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

const DatePanel = ({ currDateObj, dateSelected, selectDate, format }) => {
  let dateNodeList = [];
  let DOMstrings = {
    datePicked: `${prefix}-datePicker-date-picked`,
    todayHighlight: `${prefix}-datePicker-dates-today`,
    dateUnSelected: `${prefix}-datePicker-date`,
    fade: `${prefix}-datePicker-date-fade`
  };

  const createDateNodelist = () => {
    const numOfDaysInMonth = getDaysInMonth(
      currDateObj.month + 1,
      currDateObj.year
    );
    let numOfDaysFromPrevMonth = currDateObj.day - (currDateObj.date % 7);
    numOfDaysFromPrevMonth =
      numOfDaysFromPrevMonth < 0
        ? 7 + numOfDaysFromPrevMonth
        : numOfDaysFromPrevMonth;
    const numOfDaysInPrevMonth = getDaysInMonth(
      currDateObj.month === 0 ? 12 : currDateObj.month,
      currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year
    );
    // days from previous month
    for (
      let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth;
      i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6;
      i++
    ) {
      dateNodeList.push(createDayHTML('previous', i));
    }
    // days from current month
    for (let i = 1; i <= numOfDaysInMonth; i++) {
      dateNodeList.push(createDayHTML('current', i));
    }
    // days from next month
    const numOfDaysFromNextMonth =
      numOfDaysFromPrevMonth === 6
        ? 42 - numOfDaysInMonth + 1
        : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
    for (let i = 1; i < numOfDaysFromNextMonth; i++) {
      dateNodeList.push(createDayHTML('next', i));
    }
    return dateNodeList;
  };

  const createDayHTML = (type, i) => {
    let month;
    let year;
    const day = `0${String(i)}`.slice(-2);
    const todayDate = new Date();
    switch (type) {
      case 'previous':
        month = `0${currDateObj.month === 0 ? 12 : currDateObj.month}`.slice(
          -2
        );
        year =
          currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year;
        break;
      case 'current':
        month = `0${Number(currDateObj.month) + 1}`.slice(-2);
        year = currDateObj.year;
        break;
      case 'next':
        month = `0${
          Number(currDateObj.month === 11 ? -1 : currDateObj.month) + 2
        }`.slice(-2);
        year =
          currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year;
    }
    const date = `${month}/${day}/${year}`;
    return (
      <span
        className={`${DOMstrings.dateUnSelected}${
          type !== 'current' ? ' ' + DOMstrings.fade : ''
        }${
          year === todayDate.getFullYear() &&
          Number(month) === todayDate.getMonth() + 1 &&
          Number(day) === todayDate.getDate()
            ? ' ' + DOMstrings.todayHighlight
            : ''
        }${date === dateSelected ? ' ' + DOMstrings.datePicked : ''}`}
        date={getFormattedDate(month, day, year)}
        key={getFormattedDate(month, day, year)}
        onClick={selectDate}
      >
        {day}
      </span>
    );
  };

  const getFormattedDate = (month, day, year) => {
    switch (format) {
      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <div className={`${prefix}-datePicker-dates`}>{createDateNodelist()}</div>
  );
};

DatePanel.propTypes = {
  currDateObj: PropTypes.object.isRequired,
  dateSelected: PropTypes.string,
  selectDate: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired
};

DatePanel.defaultProps = {
  dateSelected: ''
};
export default DatePanel;
