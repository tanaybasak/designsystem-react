/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
//@update-path-build-start
import DatePicker from './DatePicker';
//@update-path-build-end

const formatOptions = {
  'mm/dd/yyyy': 'mm/dd/yyyy',
  'dd/mm/yyyy': 'dd/mm/yyyy'
};

storiesOf('Components/Date Picker', module).add(
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
      text: `Description About Datepicker Component`,
      warning: (
        <>
          This component will soon be deprecated. Please use{' '}
          <a onClick={linkTo('Components/DateSelector')}>Date Selector</a> in
          the place of Date Picker
        </>
      ),
      document: ['DatePicker']
    }
  }
);
