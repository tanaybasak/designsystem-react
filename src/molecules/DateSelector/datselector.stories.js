import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text,object } from '@storybook/addon-knobs';
//@update-path-build-start
import DateSelector from './DateSelector';
//@update-path-build-end

// const formatOptions = {
//   'mm/dd/yyyy': 'mm/dd/yyyy',
//   'dd/mm/yyyy': 'dd/mm/yyyy'
// };

const weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
const months = [
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
];

storiesOf('DateSelector', module).add(
  'default',
  () => (
    <DateSelector
      id={text('id', 'date-selector-id')}
      weekDays={object('weekDays', weekDays)}
      months={object('months', months)}
      format="mm/dd/yyyy"
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
