import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
//@update-path-build-start
import DateRangeSelector from './DateRangeSelector';
//@update-path-build-end

const formatOptions = {
  'mm/dd/yyyy': 'mm/dd/yyyy',
  'dd/mm/yyyy': 'dd/mm/yyyy'
};

storiesOf('DateRangeSelector', module).add(
  'default',
  () => (
    <DateRangeSelector
      type="rangepicker"
      format="mm/dd/yyyy"
      sidePanel={
        <ul className="hcl-dateSelector-sidebar">
          <li tabIndex="0">Last Week</li>
          <li tabIndex="0">Last Month</li>
          <li tabIndex="0">Next Week</li>
          <li tabIndex="0">Next Month</li>
          <li tabIndex="0">Next 20 days</li>
          <li tabIndex="0">Custom</li>
        </ul>
      }
      onDateRangeSelect={action('onDateRangeSelect triggered')}
      // defaultStartDate="11/01/2020"
      // defaultEndDate="12/02/2020"
    ></DateRangeSelector>
  ),
  {
    info: {
      text: `Description About DateRangeSelector Component\n
      import { DateRangeSelector } from '@patron/patron-react/daterangeselector';`
    }
  }
);
