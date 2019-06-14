import React from 'react';
import PropTypes from 'prop-types';
import {prefix} from '../../../settings';

class DatePanel extends React.Component {
    static propTypes = {
        currDateObj: PropTypes.object.isRequired,
        dateSelected: PropTypes.string,
        selectDate : PropTypes.func.isRequired
    };

    static defaultProps = {
        dateSelected:'',
    };

    constructor(props) {
        super(props);
        this.temp = null;
        this.dateNodeList = [];
        this.DOMstrings = {
            datePicked: `${prefix}-datePicker-date-picked`,
            todayHighlight: `${prefix}-datePicker-dates-today`,
            dateUnSelected: `${prefix}-datePicker-date`,
            fade: `${prefix}-datePicker-date-fade`,
        };
    }

    shouldComponentUpdate() {
        this.dateNodeList = [];
        return true;
    };

    createDayHTML = (type, i) => {
        let month; let year;
        const day = (`0${String(i)}`).slice(-2);
        const todayDate = new Date();
        // eslint-disable-next-line default-case
        switch (type) {
            case 'previous':
                month = (`0${this.props.currDateObj.month === 0 ? 12 : this.props.currDateObj.month}`).slice(-2);
                year = this.props.currDateObj.month === 0 ? this.props.currDateObj.year - 1 : this.props.currDateObj.year;
                break;
            case 'current':

                month = (`0${Number(this.props.currDateObj.month) + 1}`).slice(-2);
                year = this.props.currDateObj.year;
                break;
            case 'next':
                month = (`0${Number(this.props.currDateObj.month === 11 ? -1 : this.props.currDateObj.month) + 2}`).slice(-2);
                year = this.props.currDateObj.month === 11 ? this.props.currDateObj.year + 1 : this.props.currDateObj.year;
        }
        const date = `${month}/${day}/${year}`
        return (
          <span
            className={`${this.DOMstrings.dateUnSelected} ${type !== 'current' ? this.DOMstrings.fade : ''} ${year === todayDate.getFullYear() &&
                    this.props.currDateObj.month === todayDate.getMonth() && Number(day) === todayDate.getDate() ? this.DOMstrings.todayHighlight : ''}
                    ${date === this.props.dateSelected ?  this.DOMstrings.datePicked : ''}`}
            date={`${month}/${day}/${year}`}
            onClick={this.props.selectDate}
          >{day}
          </span>);
    };

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    createDateNodelist = () => {
        const numOfDaysInMonth = this.getDaysInMonth(this.props.currDateObj.month + 1, this.props.currDateObj.year);
        let numOfDaysFromPrevMonth = this.props.currDateObj.day - this.props.currDateObj.date % 7;
        numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
        const numOfDaysInPrevMonth = this.getDaysInMonth(this.props.currDateObj.month === 0 ? 12 : this.props.currDateObj.month, this.props.currDateObj.month === 0 ? this.props.currDateObj.year - 1 : this.props.currDateObj.year);
        // days from previous month
        for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
            this.dateNodeList.push(this.createDayHTML('previous', i));
        }
        // days from current month
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= numOfDaysInMonth; i++) {
            this.dateNodeList.push(this.createDayHTML('current', i));
        }
        // days from next month  
        const numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < numOfDaysFromNextMonth; i++) {
            this.dateNodeList.push(this.createDayHTML('next', i));
        }
        return this.dateNodeList;
    };

    render() {
        return (
          <div className='hcl-datePicker-dates'>
            {this.createDateNodelist()}
          </div>);

    }
}
export default DatePanel;