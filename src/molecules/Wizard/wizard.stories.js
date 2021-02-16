import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import { Wizard, Step } from './index';
//@update-path-build-end

storiesOf('Wizard', module).add(
  'default',
  () => (
    <Wizard activeIndex={0}>
      <Step
        title={text('Title 1', 'Step 1')}
        description={text('Description 1', 'Description 1')}
      />
      <Step
        title={text('Title 2', 'Step 2')}
        description={text('Description 2', 'Description 2')}
      />
      <Step
        title={text('Title 3', 'Step 3')}
        description={text('Description 3', 'Description 3')}
      />
    </Wizard>
  ),
  {
    info: {
      text: `Description About Wizard Component \n

      import { Wizard, Step } from '@patron/patron-react/wizard';`
    }
  }
);
