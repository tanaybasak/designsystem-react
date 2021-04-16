import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import DateSelector from './DateSelector';
//@update-path-build-end

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

const eventsCategory = {
  category1: {
    range: { min: 1, max: 5 },
    color: 'var(--orange-100)',
    numOfDots: 1
  },
  category2: {
    range: { min: 6, max: 10 },
    color: 'var(--lime-50)',
    numOfDots: 2
  },
  category3: {
    range: { min: 11, max: 15 },
    color: 'var(--green-100)',
    numOfDots: 3
  }
};

const events = [
  { date: new Date('2021', '03', '15'), category: 'category1' },
  { date: new Date('2021', '03', '16'), category: 'category2' },
  { date: new Date('2021', '03', '24'), category: 'category3' }
];

storiesOf('Components/Date Selector', module)
  .add(
    'default',
    () => (
      <DateSelector
        id={text('id', 'date-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        format="mm/dd/yyyy"
        onDateSelect={action('onDateSelect triggered')}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector']
      }
    }
  )
  .add(
    'DateSelector with events (border style)',
    () => (
      <DateSelector
        id={text('id', 'date-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        format="mm/dd/yyyy"
        onDateSelect={action('onDateSelect triggered')}
        eventsCategory={object('Events Category', eventsCategory)}
        eventStyle={'border'}
        events={object('Events', events)}
        defaultDate={new Date(2021, 3, 12)}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector']
      }
    }
  )
  .add(
    'DateSelector with events (dot style)',
    () => (
      <DateSelector
        id={text('id', 'date-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        format="mm/dd/yyyy"
        onDateSelect={action('onDateSelect triggered')}
        eventsCategory={object('Events Category', eventsCategory)}
        eventStyle={'dot'}
        events={object('Events', events)}
        defaultDate={new Date(2021, 3, 12)}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector']
      }
    }
  );