import React from 'react';
// import PropTypes from 'prop-types';
// import prefix from '../../../../settings';
// import { convertToDateObj } from '../../../../util/utility';
import DateRangeSelector from '../../molecules/DateRangeSelector';

const DateRangeSelectorExample = ({}) => {
  return (
      <DateRangeSelector
        type="rangepicker"
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
      ></DateRangeSelector>
  );
};

DateRangeSelectorExample.propTypes = {};

export default DateRangeSelectorExample;
