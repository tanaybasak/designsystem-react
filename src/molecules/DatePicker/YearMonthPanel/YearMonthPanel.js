import React from 'react';
import PropTypes from 'prop-types';

class YearMonthPanel extends React.Component {
  static propTypes = {
    months: PropTypes.array.isRequired,
    currDateObj: PropTypes.object.isRequired,
    prevMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    yearIncrease: PropTypes.func.isRequired,
    yearDecrease: PropTypes.func.isRequired,
    yearSelected: PropTypes.number.isRequired,
    onChangeYear: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.year = '';
  }

  render() {
    return (
      <div className="hcl-datePicker-month">
        <span className="hcl-datePicker-month-prev" onClick={this.props.prevMonth}>
          <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
            <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z" />
          </svg>
        </span>
        <div className="hcl-datePicker-select">
          <span className="hcl-datePicker-curMonth">{this.props.months[this.props.currDateObj.month]} </span>
          <div className="hcl-datePicker-year">
            <input
              className="hcl-datePicker-year-input"
              tabIndex="-1"
              aria-label="Year"
              value={this.props.yearSelected}
              onChange={this.props.onChangeYear}
            />
            <div className="hcl-datePicker-arrows">
              <span className="hcl-datePicker-up" onClick={this.props.yearIncrease} />
              <span className="hcl-datePicker-down" onClick={this.props.yearDecrease} />
            </div>
          </div>
        </div>
        <span className="hcl-datePicker-month-next" onClick={this.props.nextMonth}>
          <svg width="8" height="12" viewBox="0 0 8 12" fillRule="evenodd">
            <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z" />
          </svg>
        </span>
      </div>);
  }
}
export default YearMonthPanel;