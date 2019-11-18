import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Radio from './Radio';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Radio', module)
  .add(
    'checked',
    () => (
      <Radio
        checked
        disabled={boolean('Disabled', false)}
        id="radio1"
        labelText={text('Label', 'Radio Label')}
        name="test"
        onChange={action(event)}
        value={text('Value', 'standard')}
      />
    ),
    {
      info: {
        text: 'Description About Radio Component'
      }
    }
  )
  .add(
    'un checked',
    () => (
      <Radio
        disabled={boolean('Disabled', false)}
        id="radio1"
        labelText={text('Label', 'Radio Label')}
        name="test"
        onChange={action(event)}
        value={text('Value', 'standard')}
      />
    ),
    {
      info: {
        text: 'Description About Radio Component'
      }
    }
  );
