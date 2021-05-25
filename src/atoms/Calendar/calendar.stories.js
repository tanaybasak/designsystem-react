import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';
//@update-path-build-start
import Calendar from './Calendar';
//@update-path-build-end

const eventsCategoryBorder = {
  category1: {
    //range: { min: 1, max: 5 },
    color: 'var(--orange-100)'
  },
  category2: {
    //range: { min: 6, max: 10 },
    color: 'var(--lime-50)'
  },
  category3: {
    //range: { min: 11, max: 15 },
    color: 'var(--green-100)'
  }
};

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

const events = [
  { date: new Date('2021', '03', '15'), category: 'category1' },
  { date: new Date('2021', '03', '16'), category: 'category2' },
  { date: new Date('2021', '03', '24'), category: 'category3' }
];

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

const infoMessage = (
  <>
    Storybook has a timezone bug, please don&#39;t be alarmed if it shows the
    events one day ahead of the code. This does not happen elsewhere
  </>
);

storiesOf('Components/Calendar', module)
  .add(
    'Calendar with border event style',
    () => (
      <Calendar
        currDateObj={new Date('2021', '03', '15')}
        onDateSelection={action('onDateSelection triggered')}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={object('Events Category', eventsCategoryBorder)}
        eventStyle={'border'}
        events={object('Events', events)}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
      />
    ),
    {
      info: {
        text: `Description About Calendar Component `,
        document: ['Calendar'],
        info: infoMessage
      }
    }
  )
  .add(
    'default',
    () => (
      <Calendar
        currDateObj={new Date('2021', '03', '15')}
        onDateSelection={action('onDateSelection triggered')}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={object('Events Category', eventsCategoryDot)}
        eventStyle={'dot'}
        events={object('Events', events)}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
      />
    ),
    {
      info: {
        text: `Description About Calendar Component`,
        document: ['Calendar'],
        info: infoMessage
      }
    }
  )
  .add(
    'Calendar with both event style',
    () => (
      <Calendar
        currDateObj={new Date('2021', '03', '15')}
        onDateSelection={action('onDateSelection triggered')}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={object('Events Category', eventsCategoryDot)}
        eventStyle={'both'}
        events={object('Events', events)}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
      />
    ),
    {
      info: {
        text: `Description About Calendar Component`,
        document: ['Calendar'],
        info: infoMessage
      }
    }
  );
