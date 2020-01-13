import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
//@update-path-build-start
import Slider from './Slider';
//@update-path-build-end

storiesOf('Slider', module)
  .add(
    'default',
    () => (
      <Slider
        max={number('Max', 100)}
        min={number('Min', 1)}
        onChange={action('OnChange')}
        step={number('Step', 1)}
        value={number('Value', 50)}
        withInputBox={false}
      />
    ),
    {
      info: {
        text: `Description About Slider Component\n
      
      import { Slider } from 'patron-react/slider'
      
      `
      }
    }
  )
  .add(
    'with input box',
    () => (
      <Slider
        max={number('Max', 100)}
        min={number('Min', 1)}
        onChange={action('OnChange')}
        step={number('Step', 1)}
        value={number('Value', 50)}
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
