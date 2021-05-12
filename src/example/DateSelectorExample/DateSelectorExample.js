import React, { useState } from 'react';
import DateSelector from '../../molecules/DateSelector';

const DateSelectorExample = ({}) => {
  const [defaultDate1, setDefaultDate1] = useState(new Date(2020, 10, 2));
  const [defaultDate2, setDefaultDate2] = useState(new Date(2021, 3, 12));
  const [defaultDate3, setDefaultDate3] = useState(new Date(2021, 3, 14));

  return (
    <div className="hcl-row">
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">Without left panel (mm/dd/yyyy)</div>
        <DateSelector
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
          onDateSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
        ></DateSelector>
      </div>
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">
          Without left panel and with default date(dd/mm/yyyy)
        </div>
        <DateSelector
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
          defaultDate={defaultDate1}
          onDateSelect={dateObj => {
            console.log('dateObj', dateObj);
            setDefaultDate1(dateObj);
          }}
          minDate={new Date(2011, 10, 5)}
          maxDate={new Date(2065, 10, 22)}
        ></DateSelector>
      </div>
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">With left panel</div>
        <DateSelector
          id="date-selector-id"
          format="dd/mm/yyyy"
          defaultDate={defaultDate3}
          sidePanel={
            <ul className="hcl-dateSelector-sidebar">
              <li
                tabIndex="0"
                onClick={() => {
                  setDefaultDate3(new Date());
                }}
              >
                Today
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() - 1);
                  setDefaultDate3(d);
                }}
              >
                Yesterday
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() + 1);
                  setDefaultDate3(d);
                }}
              >
                Tomorrow
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  const t =
                    new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
                  const lastFriday = new Date();
                  lastFriday.setDate(t);
                  setDefaultDate3(lastFriday);
                }}
              >
                Last Friday
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  const t =
                    new Date().getDate() + (6 - new Date().getDay() - 1) + 7;
                  const lastFriday = new Date();
                  lastFriday.setDate(t);
                  setDefaultDate3(lastFriday);
                }}
              >
                Next Friday
              </li>
            </ul>
          }
          onDateSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
        ></DateSelector>
      </div>
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">With left panel and events in border style</div>
        <DateSelector
          id="date-selector-id"
          format="dd/mm/yyyy"
          defaultDate={defaultDate2}
          sidePanel={
            <ul className="hcl-dateSelector-sidebar">
              <li
                tabIndex="0"
                onClick={() => {
                  setDefaultDate2(new Date());
                }}
              >
                Today
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() - 1);
                  setDefaultDate2(d);
                }}
              >
                Yesterday
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() + 1);
                  setDefaultDate2(d);
                }}
              >
                Tomorrow
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  const t =
                    new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
                  const lastFriday = new Date();
                  lastFriday.setDate(t);
                  setDefaultDate2(lastFriday);
                }}
              >
                Last Friday
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  const t =
                    new Date().getDate() + (6 - new Date().getDay() - 1) + 7;
                  const lastFriday = new Date();
                  lastFriday.setDate(t);
                  setDefaultDate2(lastFriday);
                }}
              >
                Next Friday
              </li>
            </ul>
          }
          onDateSelect={dateObj => {
            console.log('dateObj', dateObj);
          }}
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
          eventStyle="border"
          events={[
            { date: new Date('2021', '03', '15'), category: 'category1' },
            { date: new Date('2021', '03', '16'), category: 'category2' },
            { date: new Date('2021', '03', '24'), category: 'category3' }
          ]}
          minDate={new Date(2011, 10, 5)}
          maxDate={new Date(2065, 10, 22)}
        ></DateSelector>
      </div>
    </div>
  );
};

DateSelectorExample.propTypes = {};

export default DateSelectorExample;
