import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from '../../../atoms/Calendar/PanelHeader';
import PanelBottom from '../../../atoms/Calendar/PanelBottom';

const SelectPanel = ({
  currDateObj,
  setCurrDateObj,
  format,
  onDateSelection,
  dateSelected,
  months,
  startDateSelected,
  endDateSelected,
  className,
  weekDays,
  minDate,
  maxDate,
  eventsCategory,
  eventStyle,
  events
}) => {
  const [view, setView] = useState('date');

  return (
    <div className={`hcl-dateSelector-panel ${className}`}>
      <PanelHeader
        view={view}
        setView={setView}
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
        months={months}
        weekDays={weekDays}
        minDate={minDate}
        maxDate={maxDate}
      />
      <PanelBottom
        view={view}
        setView={setView}
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
        onDateSelection={onDateSelection}
        dateSelected={dateSelected}
        format={format}
        startDateSelected={startDateSelected}
        endDateSelected={endDateSelected}
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

SelectPanel.propTypes = {
  currDateObj: PropTypes.object.isRequired,
  setCurrDateObj: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  onDateSelection: PropTypes.func.isRequired,
  dateSelected: PropTypes.string,
  months: PropTypes.array.isRequired,
  startDateSelected: PropTypes.string,
  endDateSelected: PropTypes.string,
  className: PropTypes.string,
  weekDays: PropTypes.any,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  eventsCategory: PropTypes.any,
  eventStyle: PropTypes.string,
  events: PropTypes.array
};

SelectPanel.defaultProps = {
  eventsCategory: null,
  eventStyle: 'dot',
  events: []
};

export default SelectPanel;
