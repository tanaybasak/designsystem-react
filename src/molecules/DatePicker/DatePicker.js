import React from 'react';
import YearMonthPanel from './YearMonthPanel/YearMonthPanel';
import DatePanel from './DatePanel/DatePanel';
import DateInput from './DateInput';

const DatePicker = () => {
  const style = {display: 'block'};
    return (
      <section className='hcl-datePicker' data-component='datepicker'>
        <div className='hcl-datePicker-container'>
          <DateInput />
          <div className='hcl-datePicker-panel hcl-datePicker-panel-above' style={style}>
            <YearMonthPanel />
            <div className='hcl-datePicker-days' />
            <DatePanel />
          </div>
        </div>
        <div className='hcl-datePicker-error'>
                Invalid date format.
        </div>
      </section>   );
}

DatePicker.propTypes = {

};

DatePicker.defaultProps = {

};

export default DatePicker;