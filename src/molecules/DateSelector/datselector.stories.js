import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
//@update-path-build-start
import DateSelector from './DateSelector';
//@update-path-build-end

const formatOptions = {
  'mm/dd/yyyy': 'mm/dd/yyyy',
  'dd/mm/yyyy': 'dd/mm/yyyy'
};

storiesOf('DateSelector', module).add(
  'default',
  () => (
    <DateSelector
      id={text('id', 'date-selector-id')}
      weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
      months={[
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
      ]}
      format={select('Date Format', formatOptions, 'mm/dd/yyyy')}
      // defaultDate={todayDate}
      sidePanel={
        <ul className="hcl-dateSelector-sidebar">
          <li tabIndex="0">Today</li>
          <li tabIndex="0">Yesterday</li>
          <li tabIndex="0">Tomorrow</li>
          <li tabIndex="0">Last Friday</li>
          <li tabIndex="0">Next Friday</li>
        </ul>
      }
      onDateSelect={action('onDateSelect triggered')}
    ></DateSelector>
  ),
  {
    info: {
      text: `Description About Datepicker Component\n
      import { DateSelector } from '@patron/patron-react/dateselector';`
    }
  }
);
