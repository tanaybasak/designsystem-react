import React from 'react';
import PropTypes from 'prop-types';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';

class DatePicker extends React.Component {
  static propTypes = {
    weekDays: PropTypes.array,
    months: PropTypes.array,
  };

  static defaultProps = {
    weekDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  };

  constructor(props) {
    super(props);
    this.date = new Date();
    this.isValidYear = true;
    this.isDateSelectedValid = true;
    this.dateSelected = '';
    this.state = {
      currDateObj: {
        'day': this.date.getDay(),
        'month': this.date.getMonth(),
        'date': this.date.getDate(),
        'year': this.date.getFullYear(),
      },
      showDateContainer: false,
      yearSelected: this.date.getFullYear(),
    };
  }

  setDateObj = (date) => {
    this.setState({
      currDateObj: {
        'day': date.getDay(),
        'month': date.getMonth(),
        'date': date.getDate(),
        'year': date.getFullYear(),
      }
    });
  }

  onChangeInputDate = (event) => {
    const isdateValid = this.isValidDate(event.target.value);
    this.dateSelected = event.target.value;
    this.isDateSelectedValid = this.isValidDate(event.target.value);
    if (isdateValid) {
      const dateArray = event.target.value.split('/');
      const tempDate = new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
      this.setState({
        currDateObj: {
          'day': tempDate.getDay(),
          'month': tempDate.getMonth(),
          'date': tempDate.getDate(),
          'year': tempDate.getFullYear(),
        },
        yearSelected: dateArray[2]
      });
    }
  }

  onChangeYear = (event) => {
    if (this.isValidYearFunc(event.target.value)) {
      const tempDate = new Date(Number(event.target.value), this.state.currDateObj.month, 15);
      this.setState({
        yearSelected: Number(event.target.value),
        currDateObj: {
          'day': tempDate.getDay(),
          'month': tempDate.getMonth(),
          'date': tempDate.getDate(),
          'year': tempDate.getFullYear(),
        }
      });
    } else {
      this.setState({
        yearSelected: event.target.value
      });
    }
  }

  toggleDateContainer = () => {
    this.isValidYear = true;
    this.setState({
      showDateContainer: !this.state.showDateContainer,
      yearSelected: this.state.currDateObj.year
    });
  }

  prevMonth = () => {
    const tempDate = new Date(this.state.currDateObj.month === 0 ? this.state.currDateObj.year - 1 : this.state.currDateObj.year, this.state.currDateObj.month === 0 ? 11 : this.state.currDateObj.month - 1, 15);
    this.setDateObj(tempDate);
  }

  nextMonth = () => {
    const tempDate = new Date(this.state.currDateObj.month === 11 ? this.state.currDateObj.year + 1 : this.state.currDateObj.year, this.state.currDateObj.month === 11 ? 0 : this.state.currDateObj.month + 1, 15);
    this.setDateObj(tempDate);
  }

  yearIncrease = () => {
    const tempDate = new Date(this.state.currDateObj.year + 1, this.state.currDateObj.month, 15);
    this.setState({
      currDateObj: {
        'day': tempDate.getDay(),
        'month': tempDate.getMonth(),
        'date': tempDate.getDate(),
        'year': tempDate.getFullYear(),
      },
      yearSelected: this.state.yearSelected + 1,
    });
  }

  yearDecrease = () => {
    const tempDate = new Date(this.state.currDateObj.year - 1, this.state.currDateObj.month, 15);
    this.setState({
      currDateObj: {
        'day': tempDate.getDay(),
        'month': tempDate.getMonth(),
        'date': tempDate.getDate(),
        'year': tempDate.getFullYear(),
      },
      yearSelected: this.state.yearSelected - 1,
    });
  }

  selectDate = (event) => {
    this.dateSelected = event.target.getAttribute('date');
    this.isDateSelectedValid = true;
    this.isValidYear = true;
    this.toggleDateContainer();
  };


  isValidYearFunc = (s) => {
    const regex = /^[1-9]{1}[0-9]{3}$/g;
    this.isValidYear = regex.test(s);
    return this.isValidYear;
  }

  isValidDate = (s) => {
    if (s) {
      const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
      s = s.split('/');
      if (s.length === 3 && (s[0].length === 1 || s[1].length === 1)) {
        s[0].length === 1 ? s[0] = s[0].padStart(2, '0') : null;
        s[1].length === 1 ? s[1] = s[1].padStart(2, '0') : null;
      }
      const d = new Date(s[2], s[0] - 1, s[1]);
      if (d && (d.getMonth() + 1) === Number(s[0]) && regex.test(s.join('/')) && Number(s[2]) > 999) {
        return true;
      }
      return false;
    }
    if (s === '') {
      return true;
    }
    return false;
  }

  render() {
    return (
      <section className="hcl-datePicker" data-component="datepicker">
        <div className="hcl-datePicker-container">
          <DateInput
            dateSelected={this.dateSelected}
            toggleDateContainer={this.toggleDateContainer}
            onChangeInputDate={this.onChangeInputDate}
            currDateObj={this.state.currDateObj}
            isDateSelectedValid={this.isDateSelectedValid}
            isValidYear={this.isValidYear}
          />
          {this.state.showDateContainer
            ?
            <div className="hcl-datePicker-panel hcl-datePicker-panel-above hcl-datePicker-panel-show">
              <YearMonthPanel
                months={this.props.months}
                currDateObj={this.state.currDateObj}
                prevMonth={this.prevMonth}
                nextMonth={this.nextMonth}
                yearIncrease={this.yearIncrease}
                yearDecrease={this.yearDecrease}
                onChangeYear={this.onChangeYear}
                yearSelected={this.state.yearSelected}
              />
              <WeekPanel weekDays={this.props.weekDays} />
              <DatePanel currDateObj={this.state.currDateObj} dateSelected={this.dateSelected} selectDate={this.selectDate} />
            </div>
            : null}
        </div>
        {
          !this.isDateSelectedValid
            ?
            <div className="hcl-datePicker-error hcl-datePicker-error-show">
              Invalid date format.
            </div>
            : null
        }
      </section>);
  }
}
export default DatePicker;