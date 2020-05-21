/* eslint-disable no-console */
import React, { Component } from 'react';
import TimePicker from '../../molecules/TimePicker/TimePicker';

class TimePickerExample extends Component {
  render() {
    return (
      <div className="hcl-col-12 mt-5 mb-5">
        <TimePicker
          timeZones={['Time zone 1', 'Time zone 2', 'Time zone 3']}
          label="Select a time"
          onChange={selected => {
            console.log('selected item', selected);
          }}
        />
      </div>
    );
  }
}

export default TimePickerExample;
