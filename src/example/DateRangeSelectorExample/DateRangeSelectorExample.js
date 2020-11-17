import React from 'react';
// import PropTypes from 'prop-types';
// import prefix from '../../../../settings';
// import { convertToDateObj } from '../../../../util/utility';
import DateRangeSelector from '../../molecules/DateRangeSelector';

const DateRangeSelectorExample = ({}) => {
  return (
    <>
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
        sidePanel={
          <ul className="hcl-dateSelector-sidebar">
            <li tabIndex="0">Last Week</li>
            <li tabIndex="0">Last Month</li>
            <li tabIndex="0">Next Week</li>
            <li tabIndex="0">Next Month</li>
            <li tabIndex="0">Next 20 days</li>
            <li tabIndex="0">Custom</li>
          </ul>
        }
        onDateRangeSelect={dateRange => {
          console.log('dateRange', dateRange);
        }}
        // defaultStartDate="11/01/2020"
        // defaultEndDate="12/02/2020"
        defaultStartDate={new Date(2020, 10, 15)}
        defaultEndDate={new Date(2020, 11, 15)}
      ></DateRangeSelector>
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
        sidePanel={
          <ul className="hcl-dateSelector-sidebar">
            <li tabIndex="0">Last Week</li>
            <li tabIndex="0">Last Month</li>
            <li tabIndex="0">Next Week</li>
            <li tabIndex="0">Next Month</li>
            <li tabIndex="0">Next 20 days</li>
            <li tabIndex="0">Custom</li>
          </ul>
        }
        onDateRangeSelect={dateRange => {
          console.log('dateRange', dateRange);
        }}
      ></DateRangeSelector>
    </>
  );
};

DateRangeSelectorExample.propTypes = {};

export default DateRangeSelectorExample;
