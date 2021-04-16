/* eslint-disable no-console */
import React, { Component } from 'react';
import TimePicker from '../../molecules/TimePicker/TimePicker';

class TimePickerExample extends Component {
  state = {
    errorMessage: '',
    defaultTime: {
      time: '12:24',
      period: 'PM',
      timezone: 'Time zone 3'
    }
  };
  render() {
    return (
      <div className="hcl-row">
        <div className="hcl-col-12 m-5 mb-5">
          <TimePicker
            timeZones={['Time zone 1', 'Time zone 2', 'Time zone 3']}
            label="Select a time"
            helperText="24H time"
            defaultTime={{
              time: '21:15',
              period: 'PM',
              timezone: 'Time zone 2'
            }}
            type="HH"
            onChange={selected => {
              console.log('selected item', selected);
            }}
          />
        </div>
        <div className="hcl-col-12 m-5 mb-5">
          <TimePicker
            timeZones={['Time zone 1', 'Time zone 2', 'Time zone 3']}
            label="Select a time"
            helperText="12H time"
            errorMessage={this.state.errorMessage}
            defaultTime={this.state.defaultTime}
            onChange={selected => {
              console.log('selected item', selected);
              if (!selected.time) {
                this.setState({ errorMessage: 'Invalid Time' });
              }
            }}
          />
        </div>
        <div className="hcl-col-12 m-5 mb-5">
          <TimePicker
            label="Select a time"
            helperText="24H time"
            type="HH"
            defaultTime={{
              time: '08:45',
              period: 'PM',
              timezone: 'Time zone 2'
            }}
            onChange={selected => {
              console.log('selected item', selected);
            }}
          />
        </div>
      </div>
    );
  }
}

export default TimePickerExample;
