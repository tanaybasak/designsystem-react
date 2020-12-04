import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import LinearProgressBar from './LinearProgressBar';
import CircleProgressBar from './CircleProgressBar'
//@update-path-build-end

const sizeOptions = {
  round16: "16",
  round48: "48",
  round96: "96"
};

const labelOptions = {
  left :'left',
  right : 'right',
  top : 'top',
  bottom : 'bottom'
}

const typeOptions = {
  determinate : 'determinate',
  interdeterminate : 'interdeterminate'
}


storiesOf('ProgressBar', module)
.add(
  'linear',
  () => (
      <LinearProgressBar
        label={text('label',  'Downloading')}
        value={number('value', 0.3)}
        rightText={text('rightText', '30%')}
        subText={text('subText', 'newELement')}
        type ={select('type', typeOptions, 'determinate')}
      />
  ),
  {
    info: {
      text: `Description About ProgressBar Component \n
      
      import { LinearProgressBar } from '@patron/patron-react/progressbar'`
    }
  }
).add(
  'circle',
  () => (
      <CircleProgressBar
        progress={number('value', 0.7)}
        size={select('circleSize', sizeOptions, '16')}
        label={text('label', 'Downloading..')}
        labelPosition={select('labelPosition',labelOptions, 'left')}
        type ={select('type', typeOptions, 'determinate')}

      />
  ),
  {
    info: {
      text: `Description About ProgressBar Component \n
      
      import { CircleProgressBar } from '@patron/patron-react/progressbar'`
    }
  }
);
