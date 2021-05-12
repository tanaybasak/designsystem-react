import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, boolean } from '@storybook/addon-knobs';
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

const eventsCategoryDot = {
  category1: {
    //range: { min: 1, max: 5 },
    color: 'var(--orange-100)',
    numOfDots: 1
  },
  category2: {
    //range: { min: 6, max: 10 },
    color: 'var(--lime-50)',
    numOfDots: 2
  },
  category3: {
    //range: { min: 11, max: 15 },
    color: 'var(--green-100)',
    numOfDots: 3
  }
};

const eventsCategoryBorder = {
  category1: {
    //range: { min: 1, max: 5 },
    color: 'var(--orange-100)'
    //numOfDots: 1
  },
  category2: {
    //range: { min: 6, max: 10 },
    color: 'var(--lime-50)'
    //numOfDots: 2
  },
  category3: {
    //range: { min: 11, max: 15 },
    color: 'var(--green-100)'
    //numOfDots: 3
  }
};

const events = [
  { date: new Date('2021', '03', '15'), category: 'category1' },
  { date: new Date('2021', '03', '16'), category: 'category2' },
  { date: new Date('2021', '03', '24'), category: 'category3' }
];

const infoMessage = (
  <>
    Storybook has a timezone bug, please don&#39;t be alarmed if it shows the
    events one day ahead of the code. This does not happen elsewhere
  </>
);

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
        disabled={boolean('disabled',false)}
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
        eventsCategory={object('Events Category', eventsCategoryBorder)}
        eventStyle={'border'}
        events={object('Events', events)}
        defaultDate={new Date(2021, 3, 12)}
        disabled={boolean('disabled',false)}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector'],
        info: infoMessage
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
        eventsCategory={object('Events Category', eventsCategoryDot)}
        eventStyle={'dot'}
        events={object('Events', events)}
        defaultDate={new Date(2021, 3, 12)}
        disabled={boolean('disabled',false)}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector'],
        info: infoMessage
      }
    }
  )
  .add(
    'DateSelector with events (both styles)',
    () => (
      <DateSelector
        id={text('id', 'date-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        format="mm/dd/yyyy"
        onDateSelect={action('onDateSelect triggered')}
        eventsCategory={object('Events Category', eventsCategoryDot)}
        eventStyle={'both'}
        events={object('Events', events)}
        defaultDate={new Date(2021, 3, 12)}
        disabled={boolean('disabled',false)}
      />
    ),
    {
      info: {
        text: `Description About Datepicker Component`,
        document: ['DateSelector'],
        info: infoMessage
      }
    }
  );
