import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Toggle from './Toggle';
//@update-path-build-end

storiesOf('Components/Toggle', module)
  .add(
    'default',
    () => (
      <Toggle
        disabled={boolean('Disabled', false)}
        id="toggle-element"
        labelOff={text('Label Off', 'Off')}
        labelOn={text('Label On', 'On')}
        onChange={action('Toggle-OnChange')}
        aria-label="Toggle"
      />
    ),
    {
      info: {
        text: `Description About Toggle Component`,
        document: ['Toggle']
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
        aria-label="Toggle"
        small
      />
    ),
    {
      info: {
        text: `Description About Toggle Component`,
        document: ['Toggle']
      }
    }
  );
