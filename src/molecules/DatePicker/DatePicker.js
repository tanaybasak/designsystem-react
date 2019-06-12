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
      dateSelected: null,
      showDateContainer: false,
    };
    console.log('constrcutor', this.state.currDateObj)
  }


  // dateChangeHAndlen
  // yearchangeHandler
  // toggleDateContainer 

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
    console.log('onChangeHandler', event.target.value)
  }

  toggleDateContainer = () => {
    console.log('toggleDAteContainer');
    this.setState({
      showDateContainer: !this.state.showDateContainer
    });
  }

  prevMonth = () => {
    const tempDate = new Date(this.state.currDateObj.month === 0 ? this.state.currDateObj.year - 1 : this.state.currDateObj.year, this.state.currDateObj.month === 0 ? 11 : this.state.currDateObj.month - 1, 15);
    this.setDateObj(tempDate);
    console.log('prevMonth', this.state.currDateObj)
  }

  nextMonth = () => {
    const tempDate = new Date(this.state.currDateObj.month === 11 ? this.state.currDateObj.year + 1 : this.state.currDateObj.year, this.state.currDateObj.month === 11 ? 0 : this.state.currDateObj.month + 1, 15);
    this.setDateObj(tempDate);
    console.log('nextMonth', this.state.currDateObj)
  }

  yearIncrease = () => {
    const tempDate = new Date(this.state.currDateObj.year + 1, this.state.currDateObj.month, 15);
    this.setDateObj(tempDate);
    console.log('yearIncrease', this.state.currDateObj)
  }

  yearDecrease = () => {
    const tempDate = new Date(this.state.currDateObj.year - 1, this.state.currDateObj.month, 15);
    this.setDateObj(tempDate);
    setTimeout(() => { console.log('yearDecresase', this.state.currDateObj) }, 3000)
  }

  selectDate = (event) => {
    this.setState({
      dateSelected: event.target.getAttribute('date')
    });
    this.toggleDateContainer();
    console.log('date Se;ected', this.state.dateSelected)
  };


  render() {
    return (
      <section className='hcl-datePicker' data-component='datepicker'>
        {/* toggleDateContainer,dateChangeHAndlen will be passed */}
        <div className='hcl-datePicker-container'>
          <DateInput dateSelected={this.state.dateSelected} toggleDateContainer={this.toggleDateContainer} onChangeInputDate={this.onChangeInputDate} currDateObj={this.state.currDateObj} />
          {this.state.showDateContainer
            ?
              <div className='hcl-datePicker-panel hcl-datePicker-panel-above' style={{ display: 'block' }}>
                {/* dateobj,prevMonth,nextMonth will be passed */}
                <YearMonthPanel currDateObj={this.state.currDateObj} prevMonth={this.prevMonth} nextMonth={this.nextMonth} yearIncrease={this.yearIncrease} yearDecrease={this.yearDecrease} />
                <WeekPanel />
                {/* dateobj, selectDAte will be passed */}
                <DatePanel currDateObj={this.state.currDateObj} dateSelected={this.state.dateSelected} selectDate={this.selectDate} />
              </div>
            : null}
        </div>
        <div className='hcl-datePicker-error' style={{ display: 'block' }}>
          Invalid date format.
        </div>
      </section>);
  }
}
export default DatePicker;