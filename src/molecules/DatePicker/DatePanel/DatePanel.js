import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../../settings";

class DatePanel extends React.Component {
    static propTypes = {
        currDateObj: PropTypes.object,
    };

    static defaultProps = {
        currDateObj: null
    };

    constructor(props) {
        super(props);
        this.temp = null;
        this.dateNodeList = [];
        // console.log('this.props.currDateObj', this.props.currDateObj);
        this.DOMstrings = {
            showDateContainer: `${prefix}-datePicker-panel-show`,
            datePicked: `${prefix}-datePicker-date-picked`,
            todayHighlight: `${prefix}-datePicker-dates-today`,
            dateUnSelected: `${prefix}-datePicker-date`,
            showErrorDiv: `${prefix}-datePicker-error-show`,
            addErrorBorder: `${prefix}-datePicker-container-error`,
            inputCalSVG: `.${prefix}-datePicker-container-svg`,
            prevMonth: `.${prefix}-datePicker-month-prev`,
            yearInput: `.${prefix}-datePicker-year-input`,
            nextMonth: `.${prefix}-datePicker-month-next`,
            inputDate: `.${prefix}-datePicker-input`,
            weekDaysPanel: `.${prefix}-datePicker-days`,
            datePanel: `.${prefix}-datePicker-dates`,
            yearIncrease: `.${prefix}-datePicker-up`,
            yearDecrease: `.${prefix}-datePicker-down`,
            monthInput: `.${prefix}-datePicker-curMonth`,
            dateContainer: `.${prefix}-datePicker-panel`,
            errorDiv: `.${prefix}-datePicker-error`,
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
        return (
          <span
            className={`${this.DOMstrings.dateUnSelected} ${type !== 'current' ? this.DOMstrings.fade : ''} ${year === todayDate.getFullYear() &&
                    this.props.currDateObj.month === todayDate.getMonth() && Number(day) === todayDate.getDate() ? this.DOMstrings.todayHighlight : ''}`}
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
            // datePanel.insertAdjacentHTML('beforeend', createDayHTML('previous', i));
            this.dateNodeList.push(this.createDayHTML('previous', i));
        }
        // days from current month
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= numOfDaysInMonth; i++) {
            // datePanel.insertAdjacentHTML('beforeend', this.createDayHTML('current', i));
            this.dateNodeList.push(this.createDayHTML('current', i));
        }
        // days from next month  
        const numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < numOfDaysFromNextMonth; i++) {
            this.dateNodeList.push(this.createDayHTML('next', i));
        }
        // hightlight today's Date
        // let todayDate = new Date();
        // todayDate = `${(`0${todayDate.getMonth() + 1}`).slice(-2)}/${(`0${todayDate.getDate()}`).slice(-2)}/${todayDate.getFullYear()}`;
        // const selector = `[date='${todayDate}']`;
        // this.datePickerElm.querySelector(selector) ? this.datePickerElm.querySelector(selector).classList.add(this.DOMstrings.todayHighlight) : null;

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