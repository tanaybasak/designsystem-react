import React, { useState } from 'react';
import DateSelector from '../../molecules/DateSelector';

const DateSelectorExample = ({}) => {
  const [defaultDate, setDefaultDate] = useState(new Date(2020, 10, 2));

  return (
    <div className="hcl-row">
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">Without left panel</div>
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
          onDateSelect={date => {
            console.log(date);
          }}
          // minDate={new Date(2020, 10, 5)}
          // maxDate={new Date(2065, 10, 22)}
        ></DateSelector>
      </div>
      {/* <div className=" hcl-col-12 mb-9">
        <div className="mb-5">Without left panel and with default date</div>
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
          defaultDate={defaultDate}
          sidePanel={
            <ul className="hcl-dateSelector-sidebar">
              <li
                tabIndex="0"
                onClick={() => {
                  setDefaultDate(new Date());
                }}
              >
                Today
              </li>
              <li tabIndex="0">Yesterday</li>
              <li tabIndex="0">Tomorrow</li>
              <li tabIndex="0">Last Friday</li>
              <li tabIndex="0">Next Friday</li>
            </ul>
          }
          onDateSelect={date => {
            console.log(date);
          }}
        ></DateSelector>
      </div>
      <div className=" hcl-col-12 mb-9">
        <div className="mb-5">With left panel</div>
        <DateSelector
          id="date-selector-id"
          format="dd/mm/yyyy"
          defaultDate={defaultDate}
          sidePanel={
            <ul className="hcl-dateSelector-sidebar">
              <li
                tabIndex="0"
                onClick={() => {
                  setDefaultDate(new Date());
                }}
              >
                Today
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() - 1);
                  setDefaultDate(d);
                }}
              >
                Yesterday
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  let d = new Date();
                  d.setDate(d.getDate() + 1);
                  setDefaultDate(d);
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
                  setDefaultDate(lastFriday);
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
                  setDefaultDate(lastFriday);
                }}
              >
                Next Friday
              </li>
            </ul>
          }
          onDateSelect={date => {
            console.log(date);
          }}
        ></DateSelector>
      </div> */}
    </div>
  );
};

DateSelectorExample.propTypes = {};

export default DateSelectorExample;
