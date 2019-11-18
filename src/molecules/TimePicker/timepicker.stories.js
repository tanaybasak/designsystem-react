import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import TimePicker from './TimePicker';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const timeZones = ['Time zone 1', 'Time zone 2', 'Time zone 3'];
storiesOf('TimePicker', module).add(
  'basic',
  () => (
    <TimePicker
      label={text('Label', 'Select Time')}
      onChange={action('Timepicker Onchange')}
      timeZones={object('Time Zones', timeZones)}
    />
  ),
  {
    info: {
      text: 'Description About TimePicker Component'
    }
  }
);
