import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Slider from './Slider';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Slider', module).add(
  'basic',
  () => (
    <Slider
      max={number('Max', 100)}
      min={number('Min', 1)}
      onChange={action('OnChange')}
      step={number('Step', 1)}
      value={number('Value', 50)}
      withInputBox={boolean('With Input Box', true)}
    />
  ),
  {
    info: {
      text: 'Description About Slider Component'
    }
  }
);
