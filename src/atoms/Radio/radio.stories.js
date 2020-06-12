import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Radio from './Radio';
import RadioGroup from './RadioGroup';
//@update-path-build-end

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
      />
    ),
    {
      info: {
        text: `Description About Radio Component \n

                import { Radio } from '@patron/patron-react/radio'`
      }
    }
  )
  .add(
    'vertical',
    () => (
      <RadioGroup
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
          disabled
        />
      </RadioGroup>
    ),
    {
      info: {
        text: `Description About Radio Group Component \n
  
        import { Radio , RadioGroup} from '@patron/patron-react/radio' \n`
      },
    }
  )
  .add(
    'horizontal',
    () => (
      <RadioGroup
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
          disabled
        />
      </RadioGroup>
    ),
    {
      info: {
        text: `Description About Radio Group Component \n
  
        import { Radio , RadioGroup} from '@patron/patron-react/radio' \n`
      },
    }
  );
  