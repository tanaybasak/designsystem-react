import React from 'react';


const DatePicker = () => {

  const style = {display: 'block'};
    return (
      <section className='hcl-datePicker' data-component='datepicker'>
        {/* <label>Date picker label</label> */}
        <div className='hcl-datePicker-container'>
          <input
            type='text'
            className='hcl-datePicker-input'
            placeholder='mm/dd/yyyy'
            autoComplete='off'
          />
          <svg className='hcl-datePicker-container-svg' width='14' height='16' viewBox='0 0 14 16'>
            <path
              d=' M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14
                                2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0
                                .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z'
              fillRule='nonzero'
            />
          </svg>
          <div className='hcl-datePicker-panel hcl-datePicker-panel-above' style={style}>
            <div className='hcl-datePicker-month'>
              <span className='hcl-datePicker-month-prev'>
                <svg width='8' height='12' viewBox='0 0 8 12' fillRule='evenodd'>
                  <path d='M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z' />
                </svg>
              </span>
              <div className='hcl-datePicker-select'>
                <span className='hcl-datePicker-curMonth'>March </span>
                <div className='hcl-datePicker-year'>
                  <input
                    className='hcl-datePicker-year-input'
                    type='text'
                    tabIndex='-1'
                    aria-label='Year'
                    value='2019'
                  />
                  <div className='hcl-datePicker-arrows'>
                    <span className='hcl-datePicker-up' />
                    <span className='hcl-datePicker-down' />
                  </div>
                </div>
              </div>
              <span className='hcl-datePicker-month-next'>
                <svg width='8' height='12' viewBox='0 0 8 12' fillRule='evenodd'>
                  <path d='M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z' />
                </svg>
              </span>
            </div>
            <div className='hcl-datePicker-days' />
            <div className='hcl-datePicker-dates' />
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