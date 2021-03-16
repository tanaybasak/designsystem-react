import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
//@update-path-build-start
import NumberInput from './NumberInput';
//@update-path-build-end

storiesOf('Components/NumberInput', module).add(
  'default',
  () => (
    <NumberInput
      defaultValue={10}
      disabled={boolean('Disabled', false)}
      helperText={text('Helper Text', 'Optional Helper text goes here')}
      id="number-input1"
      label={text('Label', 'Number Input')}
      max={number('Max', 100)}
      min={number('Min', 0)}
      onChange={action('Number Change')}
      step={number('Step', 1)}
      required={boolean('Required', false)}
    />
  ),
  {
    info: {
      text: `Description About NumberInput Component \n 
      
        import { NumberInput } from '@patron/patron-react/numberinput';

      `,
      className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
    }
  }
);
