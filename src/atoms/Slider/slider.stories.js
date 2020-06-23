import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, boolean, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Slider from './Slider';
//@update-path-build-end

storiesOf('Slider', module)
  .add(
    'default',
    () => (
      <Slider
        max={number('Max', 100)}
        min={number('Min', 0)}
        onChange={action('OnChange')}
        step={number('Step', 1)}
        id="basic-slider"
        helperText={text(
          'Helper Text',
          'Optional Helper text goes here (max 100 and min 0)'
        )}
        label={text('Label', 'Basic Slider')}
        title="Slider"
        withInputBox={boolean('With Input Box', false)}
      />
    ),
    {
      info: {
        text: `Description About Slider Component\n
      
      import { Slider } from '@patron/patron-react/slider'
      
      `
      }
    }
  )
  .add(
    'with tooltip on hover',
    () => (
      <Slider
        max={number('Max', 1)}
        min={number('Min', 0)}
        onChange={action('OnChange')}
        step={number('Step', 0.1)}
        hover
        id="basic-slider-tooltip"
        helperText={text(
          'Helper Text',
          'Optional Helper text goes here (max 100 and min 0)'
        )}
        label={text('Label', 'Basic Slider with Tooltip on hover')}
        title="Slider"
        withInputBox={boolean('With Input Box', true)}
      />
    ),
    {
      info: {
        text: `Description About Slider Component\n
        
        import { Slider } from '@patron/patron-react/slider'
        
        `
      }
    }
  );
