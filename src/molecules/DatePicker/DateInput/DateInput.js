import React from 'react';
import PropTypes from 'prop-types';

class DateInput extends React.Component {
  static defaultProps = {
    dateSelected: null,
    toggleDateContainer : () => {},
    onChangeInputDate :() => {},
  
  };

  static propTypes = {
    dateSelected: PropTypes.string,
    toggleDateContainer: PropTypes.func,
    onChangeInputDate: PropTypes.func,
    isDateSelectedValid: PropTypes.bool.isRequired,
    isValidYear: PropTypes.bool.isRequired
  };

  constructor(props){
    super(props);
    this.date = '';
  }

  render(){
      return (
        <React.Fragment>
          <input
            type="text"
            className={`${'hcl-datePicker-input'} ${!(this.props.isDateSelectedValid && this.props.isValidYear) ? 'hcl-datePicker-container-error': ''}`}
            placeholder="mm/dd/yyyy"
            autoComplete="off"
            value={this.props.dateSelected ? this.props.dateSelected : ''}
            onClick={this.props.toggleDateContainer}
            onChange={this.props.onChangeInputDate}
          />
          <svg className="hcl-datePicker-container-svg" width="14" height="16" viewBox="0 0 14 16" onClick={this.props.toggleDateContainer}>
            <path
              d=" M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14
                              2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0
                              .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
              fillRule="nonzero"
            />
          </svg>
        </React.Fragment>);
    }
}


export default DateInput;