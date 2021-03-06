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
  default: 'default',
  medium: 'medium',
  mobile: 'mobile'
};

const grouping = {
  step1: 'step1',
  step2: 'step2',
  step3: 'step3',
  wizard: 'wizard'
};

const status = {
  default: 'default',
  completed: 'completed',
  error: 'error'
};

const iconTypes = {
  icon: 'icon',
  number: 'number',
  noicon: 'noicon'
};

storiesOf('Components/Wizard', module).add(
  'default',
  () => (
    <Wizard
      kind={select('kind', varients, 'default', grouping.wizard)}
      activeIndex={select('activeIndex', formatOptions, 2, grouping.wizard)}
      iconType={select('iconType', iconTypes, 'icon', grouping.wizard)}
    >
      <Step
        status={select('status', status, 'completed', grouping.step1)}
        title={text('title', 'Step 1', grouping.step1)}
        description={text('description', 'Description 1', grouping.step1)}
        onClick={action('Step clicked', grouping.step1)}
      />
      <Step
        status={select('status', status, 'error', grouping.step2)}
        title={text('title', 'Step 2', grouping.step2)}
        description={text('description', 'Description 2', grouping.step2)}
        onClick={action('Step clicked', grouping.step2)}
      />
      <Step
        status={select('status', status, 'default', grouping.step3)}
        title={text('title', 'Step 3', grouping.step3)}
        description={text('description', 'Description 3', grouping.step3)}
        onClick={action('Step clicked', grouping.step3)}
      />
    </Wizard>
  ),
  {
    info: {
      text: `Description About Wizard Component`,
      document: ['Wizard', 'Step']
    }
  }
);
