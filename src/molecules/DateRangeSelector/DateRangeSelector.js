/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../atoms/Overlay';
import FormHelperText from '../../atoms/FormHelperText';
import SelectPanel from '../DateSelector/SelectPanel';
import DateRangeFooter from './DateRangeFooter';
import DateRangeInput from './DateRangeInput';
import {
  convertToDateObj,
  convertToDateString,
  dayDiff
} from '../../util/utility';

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
  minDate,
  maxDate,
  eventsCategory,
  eventStyle,
  events,
  disabled,
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

  const [showDateContainer, setShowDateContainer] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(null);
  const [prevStartDateSelected, setPrevStartDateSelected] = useState(
    convertToDateString(defaultStartDate, format)
  );
  const [endDateSelected, setEndDateSelected] = useState(null);
  const [prevEndDateSelected, setPrevEndDateSelected] = useState(
    convertToDateString(defaultEndDate, format)
  );
  const [isStartDateSelectedValid, setIsStartDateSelectedValid] = useState(
    true
  );
  const [isEndDateSelectedValid, setIsEndDateSelectedValid] = useState(true);
  const datepickerStartInput = useRef(null);
  const datepickerEndInput = useRef(null);
  const [targetEl, setTargetEl] = useState(null);

  const [numOfSelectedDated, setNumOfSelectedDated] = useState(0);
  useEffect(() => {
    if (defaultStartDate && defaultStartDate !== '') {
      updateFormattedDate(
        defaultStartDate.getMonth() + 1,
        defaultStartDate.getDate(),
        defaultStartDate.getFullYear(),
        'start'
      );
      setStartDateObj({
        day: defaultStartDate.getDay(),
        month: defaultStartDate.getMonth(),
        date: defaultStartDate.getDate(),
        year: defaultStartDate.getFullYear()
      });
    }

    if (defaultEndDate && defaultEndDate !== '') {
      updateFormattedDate(
        defaultEndDate.getMonth() + 1,
        defaultEndDate.getDate(),
        defaultEndDate.getFullYear(),
        'end'
      );

      setEndDateObj({
        day: defaultEndDate.getDay(),
        month:
          defaultStartDate.getMonth() === defaultEndDate.getMonth() &&
          defaultStartDate.getFullYear() === defaultEndDate.getFullYear()
            ? defaultEndDate.getMonth() + 1
            : defaultEndDate.getMonth(),
        date: defaultEndDate.getDate(),
        year: defaultEndDate.getFullYear()
      });
    }
  }, [defaultStartDate, defaultEndDate]);

  let range = 0;

  if (startDateSelected && endDateSelected) {
    const endDateObj = convertToDateObj(format, endDateSelected);
    const startDateObj = convertToDateObj(format, startDateSelected);
    range = dayDiff(startDateObj, endDateObj);
  }

  const onToggle = status => {
    setShowDateContainer(status);
  };

  const getMaxDate = () => {
    let d1;
    if (defaultStartDate) {
      d1 = new Date(
        defaultStartDate.getFullYear(),
        defaultStartDate.getMonth() + 1,
        0
      );
    } else {
      d1 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    return new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  };

  const getMinDate = () => {
    let d1;
    if (defaultEndDate) {
      d1 = new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), 1);
      if (
        defaultEndDate.getFullYear() === defaultStartDate.getFullYear() &&
        defaultEndDate.getMonth() === defaultStartDate.getMonth()
      ) {
        d1 = new Date(
          defaultEndDate.getMonth() === 11
            ? defaultEndDate.getFullYear() + 1
            : defaultEndDate.getFullYear(),
          defaultEndDate.getMonth() === 11 ? 0 : defaultEndDate.getMonth() + 1,
          1
        );
      } else {
        d1 = new Date(
          startDateObj.month === 11 ? startDateObj.year + 1 : startDateObj.year,
          startDateObj.month === 11 ? 0 : startDateObj.month + 1,
          1
        );
      }
    } else {
      d1 = new Date(
        date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(),
        date.getMonth() === 11 ? 0 : date.getMonth() + 1,
        1
      );
    }

    return d1;
  };

  const onCancel = () => {
    setShowDateContainer(false);
    let prevStartDateSelectedObj = convertToDateObj(
      format,
      prevStartDateSelected
    );
    let prevEndDateSelectedObj = convertToDateObj(format, prevEndDateSelected);
    setStartDateObj({
      day: prevStartDateSelectedObj.getDay(),
      month: prevStartDateSelectedObj.getMonth(),
      date: prevStartDateSelectedObj.getDate(),
      year: prevStartDateSelectedObj.getFullYear()
    });
    setEndDateObj({
      day: prevEndDateSelectedObj.getDay(),
      month: prevEndDateSelectedObj.getMonth(),
      date: prevEndDateSelectedObj.getDate(),
      year: prevEndDateSelectedObj.getFullYear()
    });
    setStartDateSelected(prevStartDateSelected);
    setEndDateSelected(prevEndDateSelected);
  };

  const toggleDateContainer = target => {
    setShowDateContainer(!showDateContainer);
    setTargetEl(target.current);
  };

  const onDateSelection = (dateObj, event) => {
    let datePicked;
    switch (numOfSelectedDated) {
      case 0:
        datePicked = event.currentTarget.getAttribute('date');
        setStartDateSelected(datePicked);
        setIsStartDateSelectedValid(true);
        if (startDateSelected !== null) {
          setEndDateSelected(null);
        }
        setNumOfSelectedDated(numOfSelectedDated + 1);
        // numOfSelectedDated++;
        break;

      case 1:
        datePicked = event.currentTarget.getAttribute('date');
        if (
          convertToDateObj(format, datePicked) >=
          convertToDateObj(format, startDateSelected)
        ) {
          setEndDateSelected(datePicked);
          setIsEndDateSelectedValid(true);
        } else {
          setEndDateSelected(startDateSelected);
          setStartDateSelected(datePicked);
          setIsEndDateSelectedValid(true);
        }
        setNumOfSelectedDated(numOfSelectedDated - 1);
        // numOfSelectedDated--;
        break;

      case 2:
        break;
    }
  };

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

    if (type === 'start') {
      setStartDateObj({
        day: day,
        month: month,
        date: date,
        year: year
      });
    }

    switch (format) {
      case 'mm/dd/yyyy':
        type === 'start'
          ? setStartDateSelected(`${monthStr}/${dateStr}/${year}`)
          : setEndDateSelected(`${monthStr}/${dateStr}/${year}`);
        break;
      case 'dd/mm/yyyy':
        type === 'start'
          ? setStartDateSelected(`${dateStr}/${monthStr}/${year}`)
          : setEndDateSelected(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  };

  const getValidCurrDateObj = () => {
    let date;
    if (endDateObj.month === startDateObj.month && endDateObj.month === 11) {
      date = new Date(startDateObj.year + 1, 0, startDateObj.date);
    } else {
      date = new Date(
        startDateObj.year,
        startDateObj.month + 1,
        startDateObj.date
      );
    }

    return {
      day: date.getDay(),
      month: date.getMonth(),
      date: date.getDate(),
      year: date.getFullYear()
    };
  };

  return (
    <>
      <div
        className={`hcl-dateSelector ${className}`}
        data-component="date-picker"
        id={id}
        {...restProps}
      >
        <div className="hcl-overlay-wrapper hcl-dateSelector-container">
          <DateRangeInput
            startDateSelected={startDateSelected}
            endDateSelected={endDateSelected}
            toggleDateContainer={toggleDateContainer}
            defaultStartDate={convertToDateString(defaultStartDate, format)}
            defaultEndDate={convertToDateString(defaultEndDate, format)}
            setShowDateContainer={setShowDateContainer}
            setIsStartDateSelectedValid={setIsStartDateSelectedValid}
            setIsEndDateSelectedValid={setIsEndDateSelectedValid}
            format={format}
            setStartDateSelected={setStartDateSelected}
            setEndDateSelected={setEndDateSelected}
            updateFormattedDate={updateFormattedDate}
            datepickerEndInput={datepickerEndInput}
            datepickerStartInput={datepickerStartInput}
            isStartDateSelectedValid={isStartDateSelectedValid}
            isEndDateSelectedValid={isEndDateSelectedValid}
            onDateRangeSelect={onDateRangeSelect}
            maxDate={maxDate}
            minDate={minDate}
            setStartDateObj={setStartDateObj}
            setEndDateObj={setEndDateObj}
            disabled={disabled}
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
              <div className="hcl-flex-col hcl-dateSelector-panel-right ">
                <div className="hcl-flex-row">
                  <SelectPanel
                    currDateObj={startDateObj}
                    setCurrDateObj={setStartDateObj}
                    format={format}
                    onDateSelection={onDateSelection}
                    dateSelected={startDateSelected}
                    months={months}
                    weekDays={weekDays}
                    startDateSelected={startDateSelected}
                    endDateSelected={endDateSelected}
                    startDateObj={startDateObj}
                    endDateObj={endDateObj}
                    setStartDateObj={setStartDateObj}
                    setEndDateObj={setEndDateObj}
                    type="rangepicker"
                    range={range}
                    maxDate={getMaxDate()}
                    minDate={minDate}
                    eventsCategory={eventsCategory}
                    eventStyle={eventStyle}
                    events={events}
                  />
                  <SelectPanel
                    currDateObj={
                      endDateObj.month === startDateObj.month &&
                      endDateObj.year === startDateObj.year
                        ? getValidCurrDateObj()
                        : endDateObj
                    }
                    setCurrDateObj={setEndDateObj}
                    format={format}
                    onDateSelection={onDateSelection}
                    dateSelected={endDateSelected}
                    months={months}
                    weekDays={weekDays}
                    startDateSelected={startDateSelected}
                    endDateSelected={endDateSelected}
                    startDateObj={startDateObj}
                    endDateObj={endDateObj}
                    setStartDateObj={setStartDateObj}
                    setEndDateObj={setEndDateObj}
                    type="rangepicker"
                    range={range}
                    maxDate={maxDate}
                    minDate={getMinDate()}
                    eventsCategory={eventsCategory}
                    eventStyle={eventStyle}
                    events={events}
                  />
                </div>
                <DateRangeFooter
                  onDone={() => {
                    setPrevStartDateSelected(startDateSelected);
                    setPrevEndDateSelected(endDateSelected);
                    setShowDateContainer(false);
                    onDateRangeSelect({
                      start: convertToDateObj(format, startDateSelected),
                      end: convertToDateObj(format, endDateSelected)
                    });
                  }}
                  onCancel={onCancel}
                  endDateSelected={endDateSelected}
                  startDateSelected={startDateSelected}
                  format={format}
                  range={range}
                />
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
   *
   * * ```mm/dd/yyyy``` :  One of the format available.
   * * ```dd/mm/yyyy``` : One of the format available. */
  format: PropTypes.string,

  /** Callback function which will be executed on date range selection
   *
   * @signature
   * ```date``` : selected date
   */
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
  defaultStartDate: PropTypes.instanceOf(Date),

  /** This props allows user to pass default start date */
  defaultEndDate: PropTypes.instanceOf(Date),

  /** This props restrict user from date selection lower than minDate */
  minDate: PropTypes.instanceOf(Date),

  /** This props restrict user from date selection higher than maxDate */
  maxDate: PropTypes.instanceOf(Date),

  /** This prop enables user to define category.
   *
   * * ```color``` : color of the border/dot
   * * ```numOfDots``` : Number Of Dots
   *
   * eg:
   * ```
   * {
   *       category1: {
   *         color: 'var(--orange-100)',
   *         numOfDots: 1
   *       },
   *       category2: {
   *         color: 'var(--lime-50)',
   *         numOfDots: 2
   *       },
   *       category3: {
   *         color: 'var(--green-100)',
   *         numOfDots: 3
   *       }
   *     }
   * ```
   */
  eventsCategory: PropTypes.any,

  /** This prop enables user to select event style.
   * * ```border``` :  Shows event in form of border.
   * * ```dot``` : Shows event in form of dot.
   * * ```both``` : Shows event in form of dot along with border. */
  eventStyle: PropTypes.oneOf(['border', 'dot', 'both']),

  /** This prop enables user to pass event and respective category.
   *
   * * ```date``` : event date
   * * ```category``` : event category
   *
   * eg :
   * ```
   *  [
   *   { date: new Date('2021', '03', '15'), category: 'category1' },
   *   { date: new Date('2021', '03', '16'), category: 'category2' },
   *   { date: new Date('2021', '03', '24'), category: 'category3' }
   *  ]
   * ```
   */
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      category: PropTypes.string
    })
  ),
  /** This props allows user to disable DateSelector Input */
  disabled: PropTypes.bool
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
  className: null,
  id: null,
  minDate: new Date(1000, 0, 1),
  maxDate: new Date(9999, 11, 31),
  eventsCategory: null,
  eventStyle: 'dot',
  events: [],
  disabled: false
};
export default DateRangeSelector;
