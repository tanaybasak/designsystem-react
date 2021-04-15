import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from './PanelHeader';
import PanelBottom from './PanelBottom';

const Calendar = ({
  currDateObj,
  format,
  onDateSelection,
  dateSelected,
  months,
  startDateSelected,
  endDateSelected,
  className,
  range,
  weekDays,
  minDate,
  maxDate,
  eventsCategory,
  eventStyle,
  events
}) => {
  const [view, setView] = useState('date');
  // const date = new Date();

  const [calendarDateObj, setCalendarDateObj] = useState({
    day: currDateObj.getDay(),
    month: currDateObj.getMonth(),
    date: currDateObj.getDate(),
    year: currDateObj.getFullYear()
  });

  return (
    <div className={`hcl-dateSelector-panel hcl-calendar ${className}`}>
      <PanelHeader
        view={view}
        setView={setView}
        currDateObj={calendarDateObj}
        setCurrDateObj={setCalendarDateObj}
        months={months}
        range={range}
        weekDays={weekDays}
        minDate={minDate}
        maxDate={maxDate}
      />
      <PanelBottom
        view={view}
        setView={setView}
        currDateObj={calendarDateObj}
        setCurrDateObj={setCalendarDateObj}
        onDateSelection={onDateSelection}
        dateSelected={dateSelected}
        format={format}
        startDateSelected={startDateSelected}
        endDateSelected={endDateSelected}
        range={range}
        months={months}
        minDate={minDate}
        maxDate={maxDate}
        eventsCategory={eventsCategory}
        eventStyle={eventStyle}
        events={events}
      />
    </div>
  );
};

Calendar.propTypes = {
  currDateObj: PropTypes.object.isRequired,
  setCurrDateObj: PropTypes.func,
  format: PropTypes.string,
  onDateSelection: PropTypes.func.isRequired,
  dateSelected: PropTypes.string,
  months: PropTypes.array,
  startDateSelected: PropTypes.string,
  endDateSelected: PropTypes.string,
  className: PropTypes.string,
  range: PropTypes.any,
  weekDays: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  eventsCategory: PropTypes.any,
  eventStyle: PropTypes.string,
  events: PropTypes.array
};

Calendar.defaultProps = {
  eventsCategory: null,
  eventStyle: 'dot',
  events: [],
  onDateSelection: null,
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
  format: 'mm/dd/yyyy',
  setCurrDateObj: null
};

export default Calendar;
