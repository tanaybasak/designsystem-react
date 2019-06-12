/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import React from 'react';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';
import WeekPanel from './WeekPanel';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.dateObj = '';
    this.selectedDAte = '';
    this.date = new Date();
    this.state = {
      currDateObj: {
        'day': this.date.getDay(),
        'month': this.date.getMonth(),
        'date': this.date.getDate(),
        'year': this.date.getFullYear(),
      },
      dateSelected: '',
      showDateContainer: false,
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
    this.setState({
      dateSelected: event.target.value
    });
  }

  toggleDateContainer = () => {
    this.setState({
      showDateContainer: !this.state.showDateContainer
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
    this.setDateObj(tempDate);
  }

  yearDecrease = () => {
    const tempDate = new Date(this.state.currDateObj.year - 1, this.state.currDateObj.month, 15);
    this.setDateObj(tempDate);
  }

  selectDate = (event) => {
    this.setState({
      dateSelected: event.target.getAttribute('date')
    });
    this.toggleDateContainer();
  };


  isValidDate = (s) => {
    if (s) {
      // eslint-disable-next-line no-useless-escape
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
      <section className='hcl-datePicker' data-component='datepicker'>
        <div className='hcl-datePicker-container'>
          <DateInput dateSelected={this.state.dateSelected} toggleDateContainer={this.toggleDateContainer} onChangeInputDate={this.onChangeInputDate} currDateObj={this.state.currDateObj} />
          {this.state.showDateContainer
            ?
              <div className='hcl-datePicker-panel hcl-datePicker-panel-above' style={{ display: 'block' }}>
                <YearMonthPanel currDateObj={this.state.currDateObj} prevMonth={this.prevMonth} nextMonth={this.nextMonth} yearIncrease={this.yearIncrease} yearDecrease={this.yearDecrease} />
                <WeekPanel />
                <DatePanel currDateObj={this.state.currDateObj} dateSelected={this.state.dateSelected} selectDate={this.selectDate} />
              </div>
            : null}
        </div>
        {
          !this.isValidDate(this.state.dateSelected)
            ?
              <div className='hcl-datePicker-error hcl-datePicker-error-show'>
              Invalid date format.
              </div>
            : null
        }
      </section>);
  }
}
export default DatePicker;