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
  className,
  weekDays,
  minDate,
  maxDate,
  eventsCategory,
  eventStyle,
  events
}) => {
  const [view, setView] = useState('date');
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
  className: PropTypes.string,
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
