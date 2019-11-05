import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Checkbox from './Checkbox';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Checkbox', module)
  .add(
    'checked',
    () => (
      <Checkbox
        checked
        disabled={boolean('Disabled', false)}
        id="checkbox1"
        label={text('Label', 'Hello Storybook')}
        name="test"
        onChange={action('checkbox')}
        value={text('Value', 'standard')}
      />
    ),
    {
      info: {
        text: 'Description About Checkbox Component'
      }
    }
  )
  .add(
    'unchecked',
    () => (
      <Checkbox
        disabled={boolean('Disabled', false)}
        id="checkbox1"
        label={text('Label', 'Hello Storybook')}
        name="test"
        onChange={action('checkbox')}
        value={text('Value', 'standard')}
      />
    ),
    {
      info: {
        text: 'Description About Checkbox Component'
      }
    }
  );
