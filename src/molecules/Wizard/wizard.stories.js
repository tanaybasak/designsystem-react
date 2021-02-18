import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import { Wizard, Step } from './index';
//@update-path-build-end

const formatOptions = {
  0: 0,
  1: 1,
  2: 2
};

const varients = {
  style1: 'style1',
  style2: 'style2',
  mobile: 'mobile'
};

const status = {
  default: 'default',
  completed: 'completed',
  error: 'error'
};

storiesOf('Wizard', module).add(
  'default',
  () => (
    <Wizard
      kind={select('kind', varients, 'style1')}
      activeIndex={select('activeIndex', formatOptions, 2)}
    >
      <Step
        status={select('status 1', status, 'completed')}
        title={text('Title 1', 'Step 1')}
        description={text('Description 1', 'Description 1')}
        onClick={action('Step clicked')}
      />
      <Step
        status={select('status 2', status, 'error')}
        title={text('Title 2', 'Step 2')}
        description={text('Description 2', 'Description 2')}
        onClick={action('Step clicked')}
      />
      <Step
        status={select('status 3', status, 'default')}
        title={text('Title 3', 'Step 3')}
        description={text('Description 3', 'Description 3')}
        onClick={action('Step clicked')}
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
