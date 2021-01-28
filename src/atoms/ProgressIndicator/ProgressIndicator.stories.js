import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import LinearProgressIndicator from './LinearProgressIndicator';
import CircleProgressIndicator from './CircleProgressIndicator';
//@update-path-build-end

const labelOptions = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom'
};

const sizeOptions = {
  small: 'small',
  large: 'large',
  default: 'default'
};

storiesOf('ProgressIndicator', module)
  .add(
    'default',
    () => (
      <LinearProgressIndicator
        label={text('label', 'Downloading..')}
        progress={number('value', 0.7)}
        subText={text('subText', 'Subtext')}
        type={'determinate'}
        customContent={<div>70%</div>}
      />
    ),
    {
      info: {
        text: `Description About ProgressIndicator Component \n
      import { LinearProgressIndicator } from '@patron/patron-react/progressindicator'`
      }
    }
  )
  .add(
    'linear-indeterminate',
    () => <LinearProgressIndicator type={'indeterminate'} />,
    {
      info: {
        text: `Description About ProgressIndicator Component \n
      import { LinearProgressIndicator } from '@patron/patron-react/progressindicator'`
      }
    }
  )
  .add(
    'circle-determinate',
    () => (
      <CircleProgressIndicator
        progress={number('value', 0.7)}
        label={text('label', 'Downloading..')}
        labelPosition={select('labelPosition', labelOptions, 'left')}
        type={'determinate'}
        progressSize={select('progressSize', sizeOptions, 'default')}
        customContent={<div>70%</div>}
      />
    ),
    {
      info: {
        text: `Description About ProgressIndicator Component \n
      import { CircleProgressIndicator } from '@patron/patron-react/progressindicator'`
      }
    }
  )
  .add(
    'circle-indeterminate',
    () => (
      <CircleProgressIndicator
        type={'indeterminate'}
        progressSize={select('progressSize', sizeOptions, 'default')}
      />
    ),
    {
      info: {
        text: `Description About ProgressIndicator Component \n
      import { CircleProgressIndicator } from '@patron/patron-react/progressindicator'`
      }
    }
  );
