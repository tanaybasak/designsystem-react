import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import LinearProgressBar from './LinearProgressBar';
import CircleProgressBar from './CircleProgressBar';
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

storiesOf('ProgressBar', module)
  .add(
    'linear-determinate',
    () => (
      <LinearProgressBar
        label={text('label', 'Downloading..')}
        progress={number('value', 0)}
        subText={text('subText', 'Subtext')}
        type={'determinate'}
        customContent={<div>70%</div>}
      />
    ),
    {
      info: {
        text: `Description About ProgressBar Component \n
      import { LinearProgressBar } from '@patron/patron-react/progressbar'`
      }
    }
  )
  .add(
    'linear-indeterminate',
    () => <LinearProgressBar type={'indeterminate'} />,
    {
      info: {
        text: `Description About ProgressBar Component \n
      import { LinearProgressBar } from '@patron/patron-react/progressbar'`
      }
    }
  )
  .add(
    'circle-determinate',
    () => (
      <CircleProgressBar
        progress={number('value', 0)}
        label={text('label', 'Downloading..')}
        labelPosition={select('labelPosition', labelOptions, 'left')}
        type={'determinate'}
        progressSize={select('progressSize', sizeOptions, 'default')}
        customContent={<div>0%</div>}
      />
    ),
    {
      info: {
        text: `Description About ProgressBar Component \n
      import { CircleProgressBar } from '@patron/patron-react/progressbar'`
      }
    }
  )
  .add(
    'circle-indeterminate',
    () => <CircleProgressBar type={'indeterminate'} />,
    {
      info: {
        text: `Description About ProgressBar Component \n
      import { CircleProgressBar } from '@patron/patron-react/progressbar'`
      }
    }
  );
