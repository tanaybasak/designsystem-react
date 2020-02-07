import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
//@update-path-build-start
import DatePicker from './DatePicker';
//@update-path-build-end

const typeOptions = {
  Top: 'top',
  Bottom: 'bottom'
};

const formatOptions = {
  'mm/dd/yyyy': 'mm/dd/yyyy',
  'dd/mm/yyyy': 'dd/mm/yyyy'
};

storiesOf('Datepicker', module).add(
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
      open={select('Direction', typeOptions, 'bottom')}
      weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
    />
  ),
  {
    info: {
      text: `Description About Datepicker Component\n
      import { DatePicker } from 'patron-react/datepicker'`
    }
  }
);