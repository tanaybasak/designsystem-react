import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Slider from './Slider';
//@update-path-build-end

storiesOf('Slider', module).add(
  'default',
  () => (
    <Slider
      max={number('Max', 100)}
      min={number('Min', 0)}
      onChange={action('OnChange')}
      step={number('Step', 1)}
      value={50}
      withInputBox={boolean('With Input Box', true)}
    />
  ),
  {
    info: {
      text: `Description About Slider Component\n
      
      import { Slider } from 'patron-react/slider'
      
      `
    }
  }
);
