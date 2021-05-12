import React, { useState } from 'react';
import DateRangeSelector from '../../molecules/DateRangeSelector';

const DateRangeSelectorExample = ({}) => {
  const [startDate, setStartDate] = useState(new Date(2021, 3, 2));
  const [endDate, setEndDate] = useState(new Date(2021, 3, 15));

  const [startDate1, setStartDate1] = useState(new Date(2021, 10, 2));
  const [endDate1, setEndDate1] = useState(new Date(2021, 11, 15));

  const [startDate2, setStartDate2] = useState(new Date(2021, 4, 2));
  const [endDate2, setEndDate2] = useState(new Date(2021, 6, 15));

  const [startDate3, setStartDate3] = useState(new Date(2022, 3, 12));
  const [endDate3, setEndDate3] = useState(new Date(2022, 6, 15));

  return (
    <div className="hcl-row">
      <div className="hcl-col-12 mb-9">
        <div className="mb-5">Without left panel (mm/dd/yyyy)</div>
        <DateRangeSelector
          id="date-selector-id"
          weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
          months={[
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
          ]}
          format="mm/dd/yyyy"
          onDateRangeSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
          disabled ={true}
        ></DateRangeSelector>
      </div>

      <div className="hcl-col-12 mb-9">
        <div className="mb-5">
          Without left panel and with default date (dd/mm/yyyy){' '}
        </div>
        <DateRangeSelector
          id="date-selector-id"
          weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
          months={[
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
          ]}
          format="dd/mm/yyyy"
          onDateRangeSelect={dateObj => {
            setStartDate1(dateObj.start);
            setEndDate1(dateObj.end);
            console.log('dateObj', dateObj);
          }}
          defaultStartDate={startDate1}
          defaultEndDate={endDate1}
        ></DateRangeSelector>
      </div>

      <div className="hcl-col-12 mb-9">
        <div className="mb-5">
          With left panel and with default date (mm/dd/yyyy)
        </div>
        <DateRangeSelector
          id="date-selector-id"
          format="mm/dd/yyyy"
          sidePanel={
            <ul className="hcl-dateSelector-sidebar  hcl-dateSelector-sidebar-range">
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay() - 7; // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Last Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Current Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let now = new Date();
                  let prevMonthLastDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                  );
                  let prevMonthFirstDate = new Date(
                    now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
                    (now.getMonth() - 1 + 12) % 12,
                    1
                  );
                  setEndDate(prevMonthLastDate);
                  setStartDate(prevMonthFirstDate);
                }}
              >
                Last Month
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay() + 7; // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Next Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let date = new Date();
                  let firstDay = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                  );
                  let lastDay = new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  );
                  setEndDate(lastDay);
                  setStartDate(firstDay);
                }}
              >
                Current Month
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let firstDay = new Date();
                  let previousweek = new Date(
                    firstDay.getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                  setStartDate(previousweek);
                  setEndDate(firstDay);
                }}
              >
                Last 8 days
              </li>
            </ul>
          }
          onDateRangeSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
          defaultStartDate={startDate2}
          defaultEndDate={endDate2}
        ></DateRangeSelector>
      </div>
      <div className="hcl-col-12 mb-9">
        <div className="mb-5">
          With left panel, with default date and events with dotted style
          (mm/dd/yyyy)
        </div>
        <DateRangeSelector
          id="date-selector-id"
          format="mm/dd/yyyy"
          sidePanel={
            <ul className="hcl-dateSelector-sidebar  hcl-dateSelector-sidebar-range">
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay() - 7; // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Last Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Current Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let now = new Date();
                  let prevMonthLastDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                  );
                  let prevMonthFirstDate = new Date(
                    now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
                    (now.getMonth() - 1 + 12) % 12,
                    1
                  );
                  setEndDate(prevMonthLastDate);
                  setStartDate(prevMonthFirstDate);
                }}
              >
                Last Month
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let curr = new Date(); // get current date
                  let first = curr.getDate() - curr.getDay() + 7; // First day is the day of the month - the day of the week
                  let last = first + 6; // last day is the first day + 6

                  let firstday = new Date(curr.setDate(first));
                  let lastday = new Date(curr.setDate(last));
                  setEndDate(lastday);
                  setStartDate(firstday);
                }}
              >
                Next Week
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let date = new Date();
                  let firstDay = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                  );
                  let lastDay = new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  );
                  setEndDate(lastDay);
                  setStartDate(firstDay);
                }}
              >
                Current Month
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let firstDay = new Date();
                  let previousweek = new Date(
                    firstDay.getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                  setStartDate(previousweek);
                  setEndDate(firstDay);
                }}
              >
                Last 8 days
              </li>
            </ul>
          }
          onDateRangeSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
          defaultStartDate={startDate3}
          defaultEndDate={endDate3}
          eventsCategory={{
            category1: {
              range: { min: 1, max: 5 },
              color: 'var(--orange-100)',
              numOfDots: 1
            },
            category2: {
              range: { min: 6, max: 10 },
              color: 'var(--lime-50)',
              numOfDots: 2
            },
            category3: {
              range: { min: 11, max: 15 },
              color: 'var(--green-100)',
              numOfDots: 3
            }
          }}
          eventStyle="both"
          events={[
            { date: new Date('2021', '03', '15'), category: 'category1' },
            { date: new Date('2021', '03', '16'), category: 'category2' },
            { date: new Date('2021', '03', '24'), category: 'category3' }
          ]}
        ></DateRangeSelector>
      </div>
    </div>
  );
};

DateRangeSelectorExample.propTypes = {};

export default DateRangeSelectorExample;
