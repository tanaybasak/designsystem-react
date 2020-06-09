import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Radio from './Radio';
//@update-path-build-end

storiesOf('RadioButton', module)
  .add(
    'default',
    () => (
      <Radio
        disabled={boolean('Disabled', false)}
        id="radio1"
        labelText={text('Label', 'Radio Label')}
        name="test"
        value={text('Value', 'standard')}
        checked
      />
    ),
    {
      info: {
        text: `Description About Radio Component \n

                import { Radio } from '@patron/patron-react/radio'`
      }
    }
  )