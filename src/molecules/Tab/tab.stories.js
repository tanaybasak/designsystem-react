import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Tab from './Tab';
import Tabs from './Tabs';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Tab', module).add(
  'basic',
  () => (
    <Tabs activeIndex={1} onChange={action('Tab OnChange')}>
      <Tab
        isDisabled={boolean('Tab 1 Disabled', false)}
        label={text('Tab 1 Label', 'Tab 1')}
      >
        {text('Tab 1 Content', ' Tab 1 content')}
      </Tab>
      <Tab
        isDisabled={boolean('Tab 2 Disabled', false)}
        label={text('Tab 2 Label', 'Tab 2')}
      >
        {text('Tab 2 Content', ' Tab 2 content')}
      </Tab>
      <Tab
        isDisabled={boolean('Tab 3 Disabled', false)}
        label={text('Tab 3 Label', 'Tab 3')}
      >
        {text('Tab 3 Content', ' Tab 3 content')}
      </Tab>
    </Tabs>
  ),
  {
    info: {
      text: 'Description About Tab Component'
    }
  }
);
