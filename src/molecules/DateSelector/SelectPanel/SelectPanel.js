import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import PanelHeader from './PanelHeader';
import PanelBottom from './PanelBottom';

const SelectPanel = ({
  currDateObj,
  setCurrDateObj,
  setYearSelected,
  format,
  onDateSelection,
  dateSelected,
  months,
  panelType,
  startDateSelected,
  endDateSelected,
  className,
  ...restProps
}) => {
  // console.log('dateSelected',dateSelected)
  const [view, setView] = useState('date');
  return (
    <div className={`hcl-dateSelector-panel ${className}`}>
      <PanelHeader
        view={view}
        setView={setView}
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
        setYearSelected={setYearSelected}
        months={months}
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
      />
    </div>
  );
};

SelectPanel.propTypes = {
  // dateSelected: PropTypes.string.isRequired,
  // format: PropTypes.string.isRequired,
  // currDateObj: PropTypes.object,
};
export default SelectPanel;
