import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import TimePicker from './TimePicker';
//@update-path-build-end

const timeZones = ['Time zone 1', 'Time zone 2', 'Time zone 3'];
storiesOf('TimePicker', module)
  .add(
    'default',
    () => (
      <TimePicker
        id="time-picker"
        label={text('Label', 'Select Time')}
        helperText={text('Helper Text', 'optional helper text')}
        disabled={boolean('Disabled', false)}
        onChange={action('Timepicker Onchange')}
        aria-label="Time Picker"
        defaultTime={text('Default Time', '12:05')}
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component \n
      import { TimePicker } from '@patron/patron-react/timepicker';`
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
        aria-label="Time Picker"
        defaultTime={text('Default Time', '21:15')}
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component \n
        import { TimePicker } from '@patron/patron-react/timepicker';`
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
        timeZones={timeZones}
        defaultTime={text('Default Time', '01:00')}
        aria-label="Time Picker"
      />
    ),
    {
      info: {
        text: `Description About TimePicker Component \n
        import { TimePicker } from '@patron/patron-react/timepicker';`
      }
    }
  );
