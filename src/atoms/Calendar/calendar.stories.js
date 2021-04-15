import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, boolean, text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Calendar from './Calendar';
//@update-path-build-end

const   eventsCategory={
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

const    events=[
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

const eventStyleOptions = {
  border: 'border',
  dot: 'dot',
};

storiesOf('Calendar', module)
  .add(
    'default',
    () => (
      <Calendar
        currDateObj={new Date('2021', '03', '15')}
        onDateSelection={(dateObj, event) => {
          console.log('event =>', event, 'dateObj=>', dateObj);
        }}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={object('Events Category', eventsCategory)}
        // eventStyle="border"
        eventStyle={select('Event Style', eventStyleOptions, 'border')}
        events={object('Events', events)}
        weekDays={object('weekDays', weekDays)}
        months={object('months', months)}
      />
    ),
    {
      info: {
        text: `Description About Calendar Component

      import { Calendar } from '@patron/patron-react/calendar';
      
      `
      }
    }
  );
  
