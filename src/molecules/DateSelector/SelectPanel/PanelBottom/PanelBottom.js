import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../../settings';
import { convertToDateObj } from '../../../../util/utility';

const PanelBottom = ({
  view,
  setView,
  currDateObj,
  setCurrDateObj,
  onDateSelection,
  dateSelected,
  format,
  panelType,
  startDateSelected,
  endDateSelected,
  months,
  minDate,
  maxDate
}) => {
  let dateNodeList = [];
  let DOMstrings = {
    datePicked: `${prefix}-dateSelector-date-picked`,
    todayHighlight: `${prefix}-dateSelector-dates-today`,
    fade: `${prefix}-dateSelector-date-fade`,
    edge: `${prefix}-dateSelector-date-edge`
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
    let date;
    switch (format) {
      case 'mm/dd/yyyy':
        date = `${month}/${day}/${year}`;
        break;

      case 'dd/mm/yyyy':
        date = `${day}/${month}/${year}`;
        break;
    }
    const formattedDate = getFormattedDate(month, day, year);

    let classDetails = ['hcl-dateSelector-date'];
    if (type !== 'current') {
      classDetails.push(DOMstrings.fade);
    }
    const isTodayDate =
      year === todayDate.getFullYear() &&
      Number(month) === todayDate.getMonth() + 1 &&
      Number(day) === todayDate.getDate();
    if (date === dateSelected) {
      classDetails.push(DOMstrings.edge);
    }
    if (
      startDateSelected &&
      endDateSelected &&
      convertToDateObj(format, startDateSelected) <
        convertToDateObj(format, formattedDate) &&
      convertToDateObj(format, formattedDate) <
        convertToDateObj(format, endDateSelected)
    ) {
      classDetails.push(DOMstrings.datePicked);
    }
    if (startDateSelected === date || endDateSelected === date) {
      classDetails.push(DOMstrings.edge);
    }

    return isTodayDate ? (
      <div key={formattedDate} className={classDetails.join(' ')}>
        <button
          className="hcl-dateSelector-date-today hcl-btn hcl-ghost"
          date={formattedDate}
          paneltype={panelType}
          onClick={onDateSelection}
          disabled={
            convertToDateObj(format, formattedDate) >= minDate &&
            maxDate >= convertToDateObj(format, formattedDate)
              ? false
              : true
          }
        >
          {day}
        </button>
      </div>
    ) : (
      <button
        className={`${classDetails.join(' ')} hcl-btn hcl-ghost`}
        date={formattedDate}
        key={formattedDate}
        paneltype={panelType}
        onClick={onDateSelection}
        disabled={
          convertToDateObj(format, formattedDate) >= minDate &&
          maxDate >= convertToDateObj(format, formattedDate)
            ? false
            : true
        }
      >
        {day}
      </button>
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

  const createMonthNodeList = () => {
    const nodeList = months.map((month, index) => {
      let isDisabled = false;

      if (minDate.getFullYear() > currDateObj.year) {
        isDisabled = true;
      } else {
        if (minDate.getFullYear() === currDateObj.year) {
          if (minDate.getMonth() > index) {
            isDisabled = true;
          }
        }
      }

      if (maxDate.getFullYear() < currDateObj.year) {
        isDisabled = true;
      } else {
        if (maxDate.getFullYear() === currDateObj.year) {
          if (maxDate.getMonth() < index) {
            isDisabled = true;
          }
        }
      }

      return (
        <button
          key={`month-${index}`}
          month={index}
          className="hcl-btn hcl-ghost"
          disabled={isDisabled}
          onClick={() => {
            setView('date');
            let tempDate = new Date(currDateObj.year, index, currDateObj.date);
            setCurrDateObj({
              day: tempDate.getDay(),
              month: tempDate.getMonth(),
              date: tempDate.getDate(),
              year: tempDate.getFullYear()
            });
          }}
        >
          {month}
        </button>
      );
    });

    return nodeList;
  };

  const createYearNodeList = () => {
    let nodeList = [];
    for (let i = 0; i < 20; i++) {
      let tempDate = new Date(
        currDateObj.year + i,
        currDateObj.month,
        currDateObj.date
      );
      nodeList.push(
        <button
          key={`month-${i}`}
          className="hcl-btn hcl-ghost"
          year={currDateObj.year + i}
          disabled={
            currDateObj.year + i > maxDate.getFullYear() ||
            currDateObj.year + i < minDate.getFullYear()
              ? true
              : false
          }
          onClick={() => {
            setCurrDateObj({
              day: tempDate.getDay(),
              month: tempDate.getMonth(),
              date: tempDate.getDate(),
              year: tempDate.getFullYear()
            });
            setView('date');
          }}
        >
          {currDateObj.year + i}
        </button>
      );
    }
    return nodeList;
  };

  return (
    <>
      {view === 'date' ? (
        <div className="hcl-dateSelector-dates">{createDateNodelist()}</div>
      ) : view === 'month' ? (
        <>
          <div className="hcl-text-align-center mt-3 mb-3">Select Month</div>
          <div className="hcl-dateSelector-months">{createMonthNodeList()}</div>
        </>
      ) : (
        <>
          <div className="hcl-text-align-center mt-3 mb-3">Select Year</div>
          <div className="hcl-dateSelector-years">{createYearNodeList()}</div>
        </>
      )}
    </>
  );
};

PanelBottom.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  currDateObj: PropTypes.object.isRequired,
  setCurrDateObj: PropTypes.func.isRequired,
  onDateSelection: PropTypes.func,
  dateSelected: PropTypes.string,
  format: PropTypes.string.isRequired,
  panelType: PropTypes.string,
  startDateSelected: PropTypes.string,
  endDateSelected: PropTypes.string,
  months: PropTypes.any,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
};

export default PanelBottom;
