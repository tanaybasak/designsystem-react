import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, object } from '@storybook/addon-knobs';
//@update-path-build-start
import TimePicker from './TimePicker';
//@update-path-build-end

const defaultTime = {
  time: '1:24',
  period: 'PM',
  timezone: 'Time zone 2'
};

const timeZones = ['Time zone 1', 'Time zone 2', 'Time zone 3'];
storiesOf('Components/Time Picker', module)
  .add(
    'default',
    () => (
      <TimePicker
        id="time-picker"
        label={text('Label', 'Select Time')}
        helperText={text('Helper Text', 'optional helper text')}
        disabled={boolean('Disabled', false)}
        onChange={action('Timepicker Onchange')}
        errorMessage={text('Error message', '')}
        aria-label="Time Picker"
        defaultTime={object('Default Time', defaultTime)}
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component`,
        document: ['TimePicker']
      }
    }
  )
  .add(
    'with 24 hour clock',
    () => (
      <TimePicker
        id="time-picker"
        label={text('Label', 'Select Time')}
        type="HH"
        labelHH={text('labelHH', '24H')}
        helperText={text('Helper Text', 'optional helper text')}
        disabled={boolean('Disabled', false)}
        onChange={action('Timepicker Onchange')}
        errorMessage={text('Error message', '')}
        aria-label="Time Picker"
        defaultTime={object('Default Time', defaultTime)}
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component`,
        document: ['TimePicker']
      }
    }
  )
  .add(
    'with timezone',
    () => (
      <TimePicker
        id="time-picker"
        label={text('Label', 'Select Time')}
        helperText={text('Helper Text', 'optional helper text')}
        disabled={boolean('Disabled', false)}
        onChange={action('Timepicker Onchange')}
        errorMessage={text('Error message', '')}
        timeZones={timeZones}
        defaultTime={object('Default Time', defaultTime)}
        aria-label="Time Picker"
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component`,
        document: ['TimePicker']
      }
    }
  );
