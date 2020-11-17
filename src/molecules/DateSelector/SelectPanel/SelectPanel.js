import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import PanelHeader from './PanelHeader';
import PanelBottom from './PanelBottom';
import { monthDiff, createDateObj } from '../../../util/utility';

const SelectPanel = ({
  currDateObj,
  setCurrDateObj,
  // setYearSelected,
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
  ...restProps
}) => {
  const [view, setView] = useState('date');

  let monthDifference;

  if (type === 'rangepicker') {
    const endDate = createDateObj(
      endDateObj.date,
      endDateObj.month,
      endDateObj.year
    );
    const startDate = createDateObj(
      startDateObj.date,
      startDateObj.month,
      startDateObj.year
    );
    monthDifference = monthDiff(startDate, endDate);
  }

  // console.log('startDateObj', startDateObj);
  // console.log('endDateObj', endDateObj);
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);

  // if (monthDifference === 0 && view === 'date') {
  //   switch (panelType) {
  //     case 'startpanel':
  //       const endDate = new Date(
  //         currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year,
  //         currDateObj.month === 11 ? 0 : currDateObj.month + 1,
  //         currDateObj.date
  //       );
  //       setEndDateObj({
  //         day: endDate.getDay(),
  //         month: endDate.getMonth(),
  //         date: endDate.getDate(),
  //         year: endDate.getFullYear()
  //       });
  //       break;
  //     case 'endpanel':
  //       const startDate = new Date(
  //         currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year,
  //         currDateObj.month === 0 ? 11 : currDateObj.month - 1,
  //         currDateObj.date
  //       );
  //       setStartDateObj({
  //         day: startDate.getDay(),
  //         month: startDate.getMonth(),
  //         date: startDate.getDate(),
  //         year: startDate.getFullYear()
  //       });
  //       break;
  //   }
  // }
  console.log('monthDifference', monthDifference);
  return (
    <div className={`hcl-dateSelector-panel ${className}`}>
      <PanelHeader
        view={view}
        setView={setView}
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
        // setYearSelected={setYearSelected}
        months={months}
        monthDifference={monthDifference}
        panelType={panelType}
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
  currDateObj: PropTypes.object.isRequired,
  setCurrDateObj: PropTypes.func.isRequired,
  // setYearSelected: PropTypes.func.isRequired,
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
