import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const YearMonthPanel = ({ months, currDateObj, monthChangeHandler, yearChangeHandler, yearSelected, onChangeYear }) => {
  return (
    <div className={`${prefix}-datePicker-month`}>
      <span className={`${prefix}-datePicker-month-prev`} onClick={monthChangeHandler}>
        <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
          <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z" />
        </svg>
      </span>
      <div className={`${prefix}-datePicker-select`}>
        <span className={`${prefix}-datePicker-curMonth`}>{months[currDateObj.month]} </span>
        <div className={`${prefix}-datePicker-year`}>
          <input
            className={`${prefix}-datePicker-year-input`}
            tabIndex="-1"
            aria-label="Year"
            value={yearSelected}
            onChange={onChangeYear}
          />
          <div className={`${prefix}-datePicker-arrows`}>
            <span className={`${prefix}-datePicker-up`} onClick={yearChangeHandler} />
            <span className={`${prefix}-datePicker-down`} onClick={yearChangeHandler} />
          </div>
        </div>
      </div>
      <span className={`${prefix}-datePicker-month-next`} onClick={monthChangeHandler}>
        <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
          <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z" />
        </svg>
      </span>
    </div>);
};

YearMonthPanel.propTypes = {
  months: PropTypes.array.isRequired,
  currDateObj: PropTypes.object.isRequired,
  monthChangeHandler: PropTypes.func.isRequired,
  yearChangeHandler: PropTypes.func.isRequired,
  yearSelected: PropTypes.string.isRequired,
  onChangeYear: PropTypes.func.isRequired,
};
export default YearMonthPanel;