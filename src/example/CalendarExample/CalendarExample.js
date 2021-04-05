import React, { useState } from 'react';
import DateRangeSelector from '../../molecules/DateRangeSelector';
import SelectPanel from '../../molecules/DateSelector/SelectPanel';

const CalendarExample = ({}) => {

  const date = new Date();
  const [currDateObj, setCurrDateObj] = useState({
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear()
  });

  return (
    <>
      <SelectPanel
        currDateObj={currDateObj}
        setCurrDateObj={setCurrDateObj}
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
        format="mm/dd/yyyy"
        // format={format}
        // onDateSelection={onDateSelection}
        // dateSelected={dateSelected}
        // months={months}
        // weekDays={weekDays}
        minDate={new Date(1000, 0, 1)}
        maxDate={new Date(9999, 12, 31)}
      />
    </>
  );
};

CalendarExample.propTypes = {};

export default CalendarExample;
