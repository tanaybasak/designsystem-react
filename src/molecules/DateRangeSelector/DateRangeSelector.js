import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Overlay from '../../atoms/Overlay';
import Label from '../../atoms/Label';
import FormHelperText from '../../atoms/FormHelperText';
// import DateInput from '../DateRangeSelector/DateInput';
import SelectPanel from '../DateSelector/SelectPanel';
import DateRangeFooter from './DateRangeFooter';
import DateRangeInput from './DateRangeInput';

const DateRangeSelector = ({
  id,
  weekDays,
  months,
  format,
  onDateRangeSelect,
  className,
  direction,
  scrollListner,
  attachElementToBody,
  sidePanel,
  defaultStartDate,
  defaultEndDate,
  ...restProps
}) => {
  const date = new Date();
  const [startDateObj, setStartDateObj] = useState({
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear()
  });

  const endDate = new Date(
    startDateObj.month === 11 ? startDateObj.year + 1 : startDateObj.year,
    startDateObj.month === 11 ? 0 : startDateObj.month + 1,
    startDateObj.date
  );

  const [endDateObj, setEndDateObj] = useState({
    day: endDate.getDay(),
    month: endDate.getMonth(),
    date: endDate.getDate(),
    year: endDate.getFullYear()
  });

  // const [startYearSelected, setStartYearSelected] = useState(
  //   String(date.getFullYear())
  // );
  // const [endYearSelected, setEndYearSelected] = useState(
  //   String(date.getFullYear())
  // );
  const [showDateContainer, setShowDateContainer] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(null);
  const [endDateSelected, setEndDateSelected] = useState(null);
  const [isStartDateSelectedValid, setIsStartDateSelectedValid] = useState(
    true
  );
  const [isEndDateSelectedValid, setIsEndDateSelectedValid] = useState(true);
  const [isValidStartYear, setIsValidStartYear] = useState(true);
  const [isValidEndYear, setIsValidEndYear] = useState(true);
  const datepickerStartInput = useRef(null);
  const datepickerEndInput = useRef(null);
  const [targetEl, setTargetEl] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (defaultStartDate && defaultStartDate !== '') {
      const defaultDateArray = datepickerStartInput.current
        .getAttribute('defaultdate')
        .split('/');

      switch (format) {
        case 'mm/dd/yyyy':
          updateFormattedDate(
            defaultDateArray[0],
            defaultDateArray[1],
            defaultDateArray[2],
            'start'
          );
          break;
        case 'dd/mm/yyyy':
          updateFormattedDate(
            defaultDateArray[1],
            defaultDateArray[0],
            defaultDateArray[2],
            'start'
          );
          break;
      }
    }
  }, [defaultStartDate]);

  useEffect(() => {
    if (defaultEndDate && defaultEndDate !== '') {
      const defaultDateArray = datepickerEndInput.current
        .getAttribute('defaultdate')
        .split('/');

      switch (format) {
        case 'mm/dd/yyyy':
          updateFormattedDate(
            defaultDateArray[0],
            defaultDateArray[1],
            defaultDateArray[2],
            'end'
          );
          break;
        case 'dd/mm/yyyy':
          updateFormattedDate(
            defaultDateArray[1],
            defaultDateArray[0],
            defaultDateArray[2],
            'end'
          );
          break;
      }
    }
  }, [defaultEndDate]);

  const onToggle = status => {
    setShowDateContainer(status);
  };

  const toggleDateContainer = target => {
    setIsValidStartYear(true);
    setIsValidEndYear(true);
    // setStartYearSelected(String(startDateObj.year));
    // setEndYearSelected(String(endDateObj.year));
    setShowDateContainer(!showDateContainer);
    // console.log('target.current', target.current);
    setTargetEl(target.current);
  };

  const onDateSelection = event => {
    if (event.target.getAttribute('paneltype') === 'startpanel') {
      setStartDateSelected(event.target.getAttribute('date'));
      setIsStartDateSelectedValid(true);
      setIsValidStartYear(true);
    } else if (event.target.getAttribute('paneltype') === 'endpanel') {
      setEndDateSelected(event.target.getAttribute('date'));
      setIsEndDateSelectedValid(true);
      setIsValidEndYear(true);
    }
    setFlag(!flag);
    // setShowDateContainer(false);
    // onDateSelect(event.target.getAttribute('date'));
  };

  // console.log('startDateSelected', startDateSelected);
  // console.log('endDateSelected', endDateSelected);

  const updateFormattedDate = (mm, dd, yyyy, type) => {
    const tempDate = new Date(yyyy, mm - 1, dd);
    const day = tempDate.getDay();
    const month = tempDate.getMonth();
    let monthStr = String(month + 1);
    const year = tempDate.getFullYear();
    const date = tempDate.getDate();
    let dateStr = String(date);
    monthStr.length === 1 ? (monthStr = monthStr.padStart(2, '0')) : null;
    dateStr.length === 1 ? (dateStr = dateStr.padStart(2, '0')) : null;
    // if (type === 'start') {
    // } else if (type === 'end') {
    // }
    type === 'start'
      ? setStartDateObj({
          day: day,
          month: month,
          date: date,
          year: year
        })
      : setEndDateObj({
          day: day,
          month: month,
          date: date,
          year: year
        });
    // type === 'start' ? setStartYearSelected(yyyy) : setEndYearSelected(yyyy);
    // setYearSelected(yyyy);
    switch (format) {
      case 'mm/dd/yyyy':
        type === 'start'
          ? setStartDateSelected(`${monthStr}/${dateStr}/${year}`)
          : setEndDateSelected(`${monthStr}/${dateStr}/${year}`);
        // dateSelected === ''
        //   ? null
        //   : onDateSelect(`${monthStr}/${dateStr}/${year}`);
        break;
      case 'dd/mm/yyyy':
        type === 'start'
          ? setStartDateSelected(`${dateStr}/${monthStr}/${year}`)
          : setEndDateSelected(`${dateStr}/${monthStr}/${year}`);
        // dateSelected === ''
        //   ? null
        //   : onDateSelect(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  };

  return (
    <>
      <div
        className={`hcl-dateSelector ${className}`}
        data-component="date-picker"
        id={id}
      >
        <div className="hcl-overlay-wrapper hcl-dateSelector-container">
          <DateRangeInput
            startDateSelected={startDateSelected}
            endDateSelected={endDateSelected}
            toggleDateContainer={toggleDateContainer}
            // datepickerInput={datepickerInput}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
            setShowDateContaine={setShowDateContainer}
            setIsStartDateSelectedValid={setIsStartDateSelectedValid}
            setIsEndDateSelectedValid={setIsEndDateSelectedValid}
            format={format}
            setStartDateSelected={setStartDateSelected}
            setEndDateSelected={setEndDateSelected}
            // setStartYearSelected={setStartYearSelected}
            // setEndYearSelected={setEndYearSelected}
            updateFormattedDate={updateFormattedDate}
            datepickerEndInput={datepickerEndInput}
            datepickerStartInput={datepickerStartInput}
          />
          <Overlay
            attachElementToBody={attachElementToBody}
            scrollListner={scrollListner}
            direction={direction}
            showOverlay={showDateContainer}
            targetElement={targetEl}
            onToggle={onToggle}
            preventCloseElements={targetEl ? [targetEl.nextElementSibling] : []}
          >
            <div className="hcl-dateSelector-panel-wrapper">
              {sidePanel}
              <div className="hcl-flex-col hcl-dateSelector-panel-right hcl-border-left">
                <div className="hcl-flex-row">
                  <SelectPanel
                    currDateObj={startDateObj}
                    setCurrDateObj={setStartDateObj}
                    // setYearSelected={setStartYearSelected}
                    format={format}
                    onDateSelection={onDateSelection}
                    dateSelected={startDateSelected}
                    months={months}
                    panelType="startpanel"
                    startDateSelected={startDateSelected}
                    endDateSelected={endDateSelected}
                  />
                  <SelectPanel
                    currDateObj={endDateObj}
                    setCurrDateObj={setEndDateObj}
                    // setYearSelected={setEndYearSelected}
                    format={format}
                    onDateSelection={onDateSelection}
                    dateSelected={endDateSelected}
                    months={months}
                    panelType="endpanel"
                    startDateSelected={startDateSelected}
                    endDateSelected={endDateSelected}
                  />
                </div>
                <DateRangeFooter
                  onDone={() => {
                    setShowDateContainer(false);
                    onDateRangeSelect({
                      start: startDateSelected,
                      end: endDateSelected
                    });
                  }}
                  onCancel={() => {
                    setShowDateContainer(false);
                  }}
                ></DateRangeFooter>
              </div>
            </div>
          </Overlay>
          {!isStartDateSelectedValid || !isEndDateSelectedValid ? (
            <FormHelperText className="error-msg">
              Invalid date format.
            </FormHelperText>
          ) : null}
        </div>
      </div>
    </>
  );
};

DateRangeSelector.propTypes = {
  /** To set id on parent div of DateSelector Component  */
  id: PropTypes.string,

  /** Days in week.  Array input can be on the basis of language selected.  */
  weekDays: PropTypes.array,

  /** Months in a year.  Array input can be on the basis of language selected.  */
  months: PropTypes.array,

  /**
   mm/dd/yyyy:  One of the format available.
   dd/mm/yyyy: One of the format available. */
  format: PropTypes.string,

  /** Callback function which will be executed on date range selection  */
  onDateRangeSelect: PropTypes.func,

  /** className/clasess will be applied on the parent div of DateRangeSelector */
  className: PropTypes.string,

  /** Used for defining the position of DateRangeSelector */
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),

  /** Used to attach the DateRangeSelector container to body */
  attachElementToBody: PropTypes.bool,

  /** Date picker Container position will changed on scroll. This is applicable when DateRangeSelector container is attached to body */
  scrollListner: PropTypes.bool,

  /** To pass sidepanel node */
  sidePanel: PropTypes.node,

  /** This props allows user to pass default start date */
  defaultStartDate: PropTypes.any,

  /** This props allows user to pass default start date */
  defaultEndDate: PropTypes.any
};

DateRangeSelector.defaultProps = {
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
  direction: 'bottom-left',
  attachElementToBody: false,
  scrollListner: false,
  format: 'MM/DD/YYYY',
  onDateRangeSelect: () => {},
  className: '',
  id: null,
};
export default DateRangeSelector;
