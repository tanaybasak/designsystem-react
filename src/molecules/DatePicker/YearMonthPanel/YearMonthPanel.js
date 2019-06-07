import React from 'react';

const YearMonthPanel = () => {
    return (
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
      </div>);

}

YearMonthPanel.propTypes = {

};

YearMonthPanel.defaultProps = {

};

export default YearMonthPanel;