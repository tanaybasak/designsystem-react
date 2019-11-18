import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Toggle from './Toggle';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Toggle', module)
  .add(
    'basic',
    () => (
      <Toggle
        disabled={boolean('Disabled', false)}
        id="toggle-element"
        labelOff={text('Label Off', 'Off')}
        labelOn={text('Label On', 'On')}
        onChange={action('Toggle-OnChange')}
      />
    ),
    {
      info: {
        text: 'Description About Toggle Component'
      }
    }
  )
  .add(
    'small',
    () => (
      <Toggle
        disabled={boolean('Disabled', false)}
        id="toggle-element"
        labelOff={text('Label Off', 'Off')}
        labelOn={text('Label On', 'On')}
        onChange={action('Toggle-OnChange')}
        small="true"
      />
    ),
    {
      info: {
        text: 'Description About Toggle Component'
      }
    }
  );
