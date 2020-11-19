import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import PanelHeader from './PanelHeader';
import PanelBottom from './PanelBottom';

const SelectPanel = ({
  currDateObj,
  setCurrDateObj,
  format,
  onDateSelection,
  dateSelected,
  months,
  panelType,
  startDateSelected,
  endDateSelected,
  className,
  startDateObj,
  endDateObj,
  setStartDateObj,
  setEndDateObj,
  type,
  range,
  weekDays,
  ...restProps
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
        panelType={panelType}
        range={range}
        weekDays={weekDays}
      />
      <PanelBottom
        view={view}
        setView={setView}
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
        onDateSelection={onDateSelection}
        dateSelected={dateSelected}
        format={format}
        panelType={panelType}
        startDateSelected={startDateSelected}
        endDateSelected={endDateSelected}
        range={range}
        months={months}
       
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
  panelType: PropTypes.string,
  startDateSelected: PropTypes.string,
  endDateSelected: PropTypes.string,
  className: PropTypes.string
};

export default SelectPanel;
