import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import prefix from '../../../../settings';
// import { convertToDateObj } from '../../../../util/utility';
import DateSelector from '../../molecules/DateSelector';

const DateSelectorExample = ({}) => {
  const [todayDate, setTodayDate] = useState('');

  return (
    <>
      <div className="hcl-row mt-5">
        <div className=" hcl-col-12 ">
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
            // defaultDate={todayDate}
            sidePanel={
              <ul className="hcl-dateSelector-sidebar">
                <li
                  tabIndex="0"
                  onClick={() => {
                    console.log('today Date change');
                    setTodayDate(new Date());
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
      </div>

      <div className="hcl-row  mt-5">
          {/* <div className="hcl-col-12">
            <DateSelector type="datepicker" format="mm/dd/yyyy"></DateSelector>
          </div> */}
      </div>
    </>
  );
};

DateSelectorExample.propTypes = {};

export default DateSelectorExample;
