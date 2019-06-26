import React from 'react';
import PropTypes from 'prop-types';

const YearMonthPanel = ({ months, currDateObj, prevMonth, nextMonth, yearIncrease, yearDecrease, yearSelected, onChangeYear }) => {
  return (
    <div className="hcl-datePicker-month">
      <span className="hcl-datePicker-month-prev" onClick={prevMonth}>
        <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
          <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z" />
        </svg>
      </span>
      <div className="hcl-datePicker-select">
        <span className="hcl-datePicker-curMonth">{months[currDateObj.month]} </span>
        <div className="hcl-datePicker-year">
          <input
            className="hcl-datePicker-year-input"
            tabIndex="-1"
            aria-label="Year"
            value={yearSelected}
            onChange={onChangeYear}
          />
          <div className="hcl-datePicker-arrows">
            <span className="hcl-datePicker-up" onClick={yearIncrease} />
            <span className="hcl-datePicker-down" onClick={yearDecrease} />
          </div>
        </div>
      </div>
      <span className="hcl-datePicker-month-next" onClick={nextMonth}>
        <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
          <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z" />
        </svg>
      </span>
    </div>);
};


YearMonthPanel.propTypes = {
  months: PropTypes.array.isRequired,
  currDateObj: PropTypes.object.isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  yearIncrease: PropTypes.func.isRequired,
  yearDecrease: PropTypes.func.isRequired,
  yearSelected: PropTypes.string.isRequired,
  onChangeYear: PropTypes.func.isRequired,
};
export default YearMonthPanel;