import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Radio from '../../atoms/Radio/Radio';
import RadioGroup from './RadioGroup';
//@update-path-build-end

const orientation = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};

const values = {
  Radio1: 'Radio1',
  Radio2: 'Radio2',
  Radio3: 'Radio3',
};

const props = {
  radio: () => ({
    disabled: boolean('Disabled (disabled in <RadioButton>)', false),
    labelText: text('Label text (labelText in <RadioButton>)',
      'Radio button label'
    ),
  }),
}
storiesOf('RadioButtonGroup', module).add(
  'default',
  () => (
    <RadioGroup
      orientation={select('orientation Type', orientation, 'vertical')}
      onChange={action(event)}
      defaultSelected={select('default Selected', values, 'Radio1')}
    >
      <Radio
        id="radio1"
        name="test"
        value="Radio1"
        {...props.radio()}
      />
      <Radio
        id="radio2"
        name="test"
        value="Radio2"
        {...props.radio()}
      />
      <Radio
        id="radio3"
        name="test"
        value="Radio3"
        {...props.radio()}
      />
    </RadioGroup>
  ),
  {
    info: {
      text: `Description About Radio Component \n

                import { Radio } from '@patron/patron-react/radio' \n
                import { RadioGroup } from '@patron/patron-react/radioGroup'`,
    },
  }
);
