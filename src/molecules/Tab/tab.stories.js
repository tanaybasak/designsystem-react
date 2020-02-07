import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Tab from './Tab';
import Tabs from './Tabs';
//@update-path-build-end

storiesOf('Tab', module).add(
  'default',
  () => (
    <Tabs activeIndex={1} onChange={action('Tab OnChange')}>
      <Tab
        isDisabled={boolean('Disabled 1', false)}
        label={text('Label 1', 'Tab 1')}
      >
        {text('Content 1', ' Tab 1 content')}
      </Tab>
      <Tab
        isDisabled={boolean('Disabled 2', false)}
        label={text('Label 2', 'Tab 2')}
      >
        {text('Content 2', ' Tab 2 content')}
      </Tab>
      <Tab
        isDisabled={boolean('Disabled 3', false)}
        label={text('Label 3', 'Tab 3')}
      >
        {text('Content 3', ' Tab 3 content')}
      </Tab>
    </Tabs>
  ),
  {
    info: {
      text: `Description About Tab Component \n

      import { Tabs, Tab } from 'patron-react/tab'`
    }
  }
);
