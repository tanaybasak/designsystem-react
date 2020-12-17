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

const typeOptions = {
  determinate: 'determinate',
  interdeterminate: 'interdeterminate'
};

storiesOf('ProgressBar', module)
  .add(
    'linear',
    () => (
      <LinearProgressBar
        label={text('label', 'Downloading..')}
        value={number('value', 0.3)}
        customContent={text('customContent', '70%')}
        subText={text('subText', 'Subtext')}
        type={select('type', typeOptions, 'determinate')}
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
    'circle',
    () => (
      <CircleProgressBar
        progress={number('value', 0.7)}
        label={text('label', 'Downloading..')}
        labelPosition={select('labelPosition', labelOptions, 'left')}
        type={select('type', typeOptions, 'determinate')}
        customContent={text('customContent', '70%')}
      />
    ),
    {
      info: {
        text: `Description About ProgressBar Component \n
      import { CircleProgressBar } from '@patron/patron-react/progressbar'`
      }
    }
  );
