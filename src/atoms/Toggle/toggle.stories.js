import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Toggle from './Toggle';
//@update-path-build-end

storiesOf('Toggle', module)
  .add(
    'default',
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
        text: `Description About Toggle Component

        import { Toggle } from '@patron/patron-react/toggle'

        `
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
        small
      />
    ),
    {
      info: {
        text: `Description About Toggle Component

        import { Toggle } from '@patron/patron-react/toggle'

        `
      }
    }
  );
