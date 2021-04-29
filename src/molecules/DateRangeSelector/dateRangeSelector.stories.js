import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
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

storiesOf('Components/Date Range Selector', module)
  .add(
    'default',
    () => (
      <DateRangeSelector
        id={text('id', 'date-range-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        type="rangepicker"
        format="mm/dd/yyyy"
        onDateRangeSelect={action('onDateRangeSelect triggered')}
      />
    ),
    {
      info: {
        text: `Description About DateRangeSelector Component`,
        document: ['DateRangeSelector']
      }
    }
  )
  .add(
    'DateRangeSelector with events with border style',
    () => (
      <DateRangeSelector
        id={text('id', 'date-range-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        type="rangepicker"
        format="mm/dd/yyyy"
        onDateRangeSelect={action('onDateRangeSelect triggered')}
        eventsCategory={object('Events Category', eventsCategoryBorder)}
        eventStyle={'border'}
        events={object('Events', events)}
        defaultStartDate={new Date(2013, 10, 2)}
        defaultEndDate={new Date(2021, 3, 15)}
      />
    ),
    {
      info: {
        text: `Description About DateRangeSelector Component`,
        document: ['DateRangeSelector'],
        info: infoMessage
      }
    }
  )
  .add(
    'DateRangeSelector with events with dot style',
    () => (
      <DateRangeSelector
        id={text('id', 'date-range-selector-id')}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
        type="rangepicker"
        format="mm/dd/yyyy"
        onDateRangeSelect={action('onDateRangeSelect triggered')}
        eventsCategory={object('Events Category', eventsCategoryDot)}
        eventStyle={'dot'}
        events={object('Events', events)}
        defaultStartDate={new Date(2013, 10, 2)}
        defaultEndDate={new Date(2021, 3, 15)}
      />
    ),
    {
      info: {
        text: `Description About DateRangeSelector Component`,
        document: ['DateRangeSelector'],
        info: infoMessage
      }
    }
  );
