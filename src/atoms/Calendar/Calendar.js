import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from './PanelHeader';
import PanelBottom from './PanelBottom';

const Calendar = ({
  currDateObj,
  format,
  onDateSelection,
  months,
  className,
  weekDays,
  minDate,
  maxDate,
  eventsCategory,
  eventStyle,
  events,
  ...restProps
}) => {
  const [view, setView] = useState('date');
  const [calendarDateObj, setCalendarDateObj] = useState({
    day: currDateObj.getDay(),
    month: currDateObj.getMonth(),
    date: currDateObj.getDate(),
    year: currDateObj.getFullYear()
  });

  return (
    <div
      className={`hcl-dateSelector-panel hcl-calendar ${className}`}
      {...restProps}
    >
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
  /** Date object which is used to initilize calendar  */
  currDateObj: PropTypes.object.isRequired,

  /**
   *
   * * ```mm/dd/yyyy``` :  One of the format available.
   * * ```dd/mm/yyyy``` : One of the format available.
   * */
  format: PropTypes.string,

  /** Callback function which will be executed on date selection
   *
   *
   * @signature
   * * ```dateObj``` : selected date
   * * ```event``` : event triggered
   */

  onDateSelection: PropTypes.func.isRequired,

  /** Months in a year.  Array input can be on the basis of language selected.  */
  months: PropTypes.array,

  /** className/clasess will be applied on the parent div of Calendar */
  className: PropTypes.string,

  /** Days in week.  Array input can be on the basis of language selected.  */
  weekDays: PropTypes.array,

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
  )
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
  format: 'mm/dd/yyyy'
};

export default Calendar;
