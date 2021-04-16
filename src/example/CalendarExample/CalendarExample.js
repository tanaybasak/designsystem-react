import React, { useState } from 'react';
import Calendar from '../../atoms/Calendar';

const CalendarExample = ({}) => {
  return (
    <>
      <Calendar
        currDateObj={new Date()}
        weekDays={['S', 'M', 'T', 'W', 'Th', 'F', 'S']}
        months={[
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
        ]}
        onDateSelection={(dateObj, event) => {
          console.log('event =>', event, 'dateObj=>', dateObj);
        }}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={{
          category1: {
            color: '#730C0C',
            numOfDots: 1
          },
          category2: {
            color: '#AE6402',
            numOfDots: 2
          },
          category3: {
            color: '#0786CF',
            numOfDots: 3
          }
        }}
        eventStyle="dot"
        events={[
          { date: new Date('2021', '03', '14'), category: 'category1' },
          { date: new Date('2021', '03', '16'), category: 'category2' },
          { date: new Date('2021', '03', '24'), category: 'category3' }
        ]}
      />
      <Calendar
        currDateObj={new Date()}
        onDateSelection={(dateObj, event) => {
          console.log('event =>', event, 'dateObj=>', dateObj);
        }}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
        eventsCategory={{
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
        }}
        eventStyle="border"
        events={[
          { date: new Date('2021', '03', '15'), category: 'category1' },
          { date: new Date('2021', '03', '16'), category: 'category2' },
          { date: new Date('2021', '03', '24'), category: 'category3' }
        ]}
      />
    </>
  );
};

CalendarExample.propTypes = {};

export default CalendarExample;