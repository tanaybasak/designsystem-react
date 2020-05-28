import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import TimePicker from './TimePicker';
//@update-path-build-end

const timeZones = ['Time zone 1', 'Time zone 2', 'Time zone 3'];
storiesOf('TimePicker', module).add(
  'default',
  () => (
    <TimePicker
      label={text('Label', 'Select Time')}
      helperText={text('Helper Text', 'optional helper text')}
      onChange={action('Timepicker Onchange')}
      timeZones={object('Time Zones', timeZones)}
      aria-label="Time Picker"
    />
  ),
  {
    info: {
      text: `Description About TimePicker Component \n
      import { TimePicker } from '@patron/patron-react/timepicker'`
    }
  }
);
