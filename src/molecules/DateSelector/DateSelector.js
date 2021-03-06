/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { convertToDateObj, convertToDateString } from '../../util/utility';
import Overlay from '../../atoms/Overlay';
import FormHelperText from '../../atoms/FormHelperText';
import SelectPanel from './SelectPanel';
import DateSelectorInput from './DateSelectorInput';

const DateSelector = ({
  id,
  weekDays,
  months,
  format,
  defaultDate,
  className,
  direction,
  scrollListner,
  attachElementToBody,
  sidePanel,
  onDateSelect,
  minDate,
  maxDate,
  onVisibleChange,
  eventsCategory,
  eventStyle,
  events,
  disabled,
  ...restProps
}) => {
  const date = new Date();
  const [currDateObj, setCurrDateObj] = useState({
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear()
  });
  const [showDateContainer, setShowDateContainer] = useState(false);
  const [dateSelected, setDateSelected] = useState('');
  const [isDateSelectedValid, setIsDateSelectedValid] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isValidYear, setIsValidYear] = useState(true);
  const datepickerInput = useRef(null);
  const [targetEl, setTargetEl] = useState(null);

  useEffect(() => {
    if (defaultDate && defaultDate !== '') {
      const defaultDateArray = datepickerInput.current
        .getAttribute('defaultdate')
        .split('/');

      switch (format) {
        case 'mm/dd/yyyy':
          updateFormattedDate(
            defaultDateArray[0],
            defaultDateArray[1],
            defaultDateArray[2]
          );
          break;
        case 'dd/mm/yyyy':
          updateFormattedDate(
            defaultDateArray[1],
            defaultDateArray[0],
            defaultDateArray[2]
          );
          break;
      }
    }
  }, [defaultDate]);

  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(showDateContainer);
    }
  }, [showDateContainer]);

  const onToggle = status => {
    setShowDateContainer(status);
  };

  const toggleDateContainer = target => {
    setIsValidYear(true);
    setShowDateContainer(!showDateContainer);
    setTargetEl(target.current);
  };

  const updateFormattedDate = (mm, dd, yyyy) => {
    const tempDate = new Date(yyyy, mm - 1, dd);
    const day = tempDate.getDay();
    const month = tempDate.getMonth();
    let monthStr = String(month + 1);
    const year = tempDate.getFullYear();
    const date = tempDate.getDate();
    let dateStr = String(date);
    monthStr.length === 1 ? (monthStr = monthStr.padStart(2, '0')) : null;
    dateStr.length === 1 ? (dateStr = dateStr.padStart(2, '0')) : null;
    setCurrDateObj({
      day: day,
      month: month,
      date: date,
      year: year
    });
    switch (format) {
      case 'mm/dd/yyyy':
        setDateSelected(`${monthStr}/${dateStr}/${year}`);
        break;
      case 'dd/mm/yyyy':
        setDateSelected(`${dateStr}/${monthStr}/${year}`);
        break;
    }
  };

  const onDateSelection = (dateObj, event) => {
    setDateSelected(event.currentTarget.getAttribute('date'));
    setIsDateSelectedValid(true);
    setIsValidYear(true);
    setShowDateContainer(false);
    onDateSelect(
      convertToDateObj(format, event.currentTarget.getAttribute('date'))
    );
  };

  return (
    <>
      <div className="hcl-dateSelector" data-component="date-picker" id={id}>
        <div
          className={`hcl-overlay-wrapper hcl-dateSelector-container${
            showDateContainer ? ' hcl-overlay-wrapper-active' : ''
          }`}
        >
          <DateSelectorInput
            format={format}
            dateSelected={dateSelected}
            toggleDateContainer={toggleDateContainer}
            datepickerInput={datepickerInput}
            defaultDate={convertToDateString(defaultDate, format)}
            setDateSelected={setDateSelected}
            updateFormattedDate={updateFormattedDate}
            setShowDateContainer={setShowDateContainer}
            setIsDateSelectedValid={setIsDateSelectedValid}
            className={className}
            onDateSelect={onDateSelect}
            disabled={disabled}
            {...restProps}
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
              <div className="hcl-dateSelector-panel-right">
                <SelectPanel
                  currDateObj={currDateObj}
                  setCurrDateObj={setCurrDateObj}
                  format={format}
                  onDateSelection={onDateSelection}
                  dateSelected={dateSelected}
                  months={months}
                  weekDays={weekDays}
                  minDate={minDate}
                  maxDate={maxDate}
                  eventsCategory={eventsCategory}
                  eventStyle={eventStyle}
                  events={events}
                />
              </div>
            </div>
          </Overlay>
          {!isDateSelectedValid ? (
            <FormHelperText className="error-msg">
              Invalid date format.
            </FormHelperText>
          ) : null}
        </div>
      </div>
    </>
  );
};

DateSelector.propTypes = {
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

  /** This props allows user to pass default date */
  defaultDate: PropTypes.instanceOf(Date),

  /** className/clasess will be applied on the parent div of DateSelector */
  className: PropTypes.string,

  /** Used for defining the position of DateSelector */
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),

  /** Date picker Container position will changed on scroll. This is applicable when DateSelector container is attached to body */
  scrollListner: PropTypes.bool,

  /** Used to attach the DateSelector container to body */
  attachElementToBody: PropTypes.bool,

  /** To pass sidepanel node */
  sidePanel: PropTypes.node,

  /** Callback function which will be executed on date selection
   *
   *
   * @signature
   * ```date``` : selected date
   */
  onDateSelect: PropTypes.func,
  /** This props restrict user from date selection lower than minDate */
  minDate: PropTypes.instanceOf(Date),
  /** This props restrict user from date selection higher than maxDate */
  maxDate: PropTypes.instanceOf(Date),
  /** Callback on SelectPanel toggle
   *
   * @signature
   * ```isOpen``` : boolean flag
   */
  onVisibleChange: PropTypes.func,

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

DateSelector.defaultProps = {
  id: null,
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
  defaultDate: null,
  className: null,
  direction: 'bottom-left',
  scrollListner: false,
  attachElementToBody: false,
  sidePanel: null,
  onDateSelect: () => {},
  minDate: new Date(1000, 0, 1),
  maxDate: new Date(9999, 12, 31),
  onVisibleChange: null,
  eventsCategory: null,
  eventStyle: 'dot',
  events: [],
  disabled: false
};

DateSelector.displayName = 'DateSelector';

export default DateSelector;
