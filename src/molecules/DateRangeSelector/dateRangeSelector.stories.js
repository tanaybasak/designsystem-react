import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text,object } from '@storybook/addon-knobs';
//@update-path-build-start
import DateRangeSelector from './DateRangeSelector';
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

storiesOf('DateRangeSelector', module).add(
  'default',
  () => (
    <DateRangeSelector
      id={text('id', 'date-range-selector-id')}
      weekDays={object('weekDays', weekDays)}
      months={object('months', months)}
      type="rangepicker"
      format="mm/dd/yyyy"
      onDateRangeSelect={action('onDateRangeSelect triggered')}
    ></DateRangeSelector>
  ),
  {
    info: {
      text: `Description About DateRangeSelector Component\n
      import { DateRangeSelector } from '@patron/patron-react/daterangeselector';`
    }
  }
);
