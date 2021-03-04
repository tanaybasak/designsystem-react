import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
//@update-path-build-start
import DatePicker from './DatePicker';
//@update-path-build-end

const formatOptions = {
  'mm/dd/yyyy': 'mm/dd/yyyy',
  'dd/mm/yyyy': 'dd/mm/yyyy'
};

storiesOf('Components/DatePicker', module).add(
  'default',
  () => (
    <DatePicker
      format={select('Date Format', formatOptions, 'mm/dd/yyyy')}
      months={[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]}
      onDateSelect={action('Date Select')}
      weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
      aria-label="Date picker Input label"
      defaultDate={text('Default Date', '12/30/1990')}
    />
  ),
  {
    info: {
      text: `Description About Datepicker Component\n
      import { DatePicker } from '@patron/patron-react/datepicker';`
    }
  }
);
