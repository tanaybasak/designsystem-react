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
  ...restProps
}) => {
  let dateNodeList = [];
  let DOMstrings = {
    datePicked: `${prefix}-dateSelector-date-picked`,
    todayHighlight: `${prefix}-dateSelector-dates-today`,
    // dateUnSelected: `${prefix}-dateSelector-date`,
    fade: `${prefix}-dateSelector-date-fade`
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
    // console.log('dateNodeList',dateNodeList)
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
    const formattedDate = getFormattedDate(month, day, year);
    // console.log(
    //   'Check',
    //   panelType === 'startpanel' &&
    //     convertToDateObj(format, dateSelected) <
    //       convertToDateObj(format, endDateSelected)
    // );

    // console.log(
    //   'Check',
    //   panelType === 'startpanel' &&
    //     convertToDateObj(format, formattedDate) <
    //       convertToDateObj(format, endDateSelected)
    // );

    let classDetails = [];
    if (type !== 'current') {
      classDetails.push(DOMstrings.fade);
    }

    if (
      year === todayDate.getFullYear() &&
      Number(month) === todayDate.getMonth() + 1 &&
      Number(day) === todayDate.getDate()
    ) {
      classDetails.push(DOMstrings.todayHighlight);
    }
    if (date === dateSelected) {
      classDetails.push(DOMstrings.datePicked);
    }
    if (
      startDateSelected &&
      endDateSelected &&
      convertToDateObj(format, startDateSelected) <=
        convertToDateObj(format, formattedDate) &&
      convertToDateObj(format, formattedDate) <=
        convertToDateObj(format, endDateSelected)
    ) {
      classDetails.push(DOMstrings.datePicked);
    }

    return (
      <span
        className={classDetails.join(' ')}
        date={formattedDate}
        key={formattedDate}
        paneltype={panelType}
        onClick={onDateSelection}
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

  const createMonthNodeList = () => {
    const months = [
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
    ];
    const nodeList = months.map((month, index) => {
      return (
        <span
          key={`month-${index}`}
          month={index}
          onClick={() => {
            setCurrDateObj({
              day: currDateObj.day,
              month: index,
              date: currDateObj.date,
              year: currDateObj.year
            });
            setView('date');
          }}
        >
          {month}
        </span>
      );
    });

    return nodeList;
  };

  const createYearNodeList = () => {
    let nodeList = [];
    for (let i = 0; i < 20; i++) {
      nodeList.push(
        <span
          key={`month-${i}`}
          year={currDateObj.year + i}
          onClick={() => {
            setCurrDateObj({
              day: currDateObj.day,
              month: currDateObj.month,
              date: currDateObj.date,
              year: currDateObj.year + i
            });
            setView('date');
          }}
        >
          {currDateObj.year + i}
        </span>
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
  // dateSelected: PropTypes.string.isRequired,
  // format: PropTypes.string.isRequired
  // currDateObj: PropTypes.object,
};

export default PanelBottom;
