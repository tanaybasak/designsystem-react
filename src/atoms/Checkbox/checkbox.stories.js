import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Checkbox from './Checkbox';
//@update-path-build-end

storiesOf('Checkbox', module).add(
  'default',
  () => (
    <Checkbox
      id="checkbox1"
      value={text('Value', 'standard')}
      label={text('Label', 'Checkbox Label')}
      disabled={boolean('Disabled', false)}
      onChange={action(event)}
    />
  ),
  {
    info: {
      text: `Description About Checkbox Component \n

      import { Checkbox } from 'patron-react/checkbox'`
    }
  }
);
