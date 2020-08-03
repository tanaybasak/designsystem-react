import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Radio from './Radio';
import RadioGroup from './RadioGroup';
//@update-path-build-end

const props = {
  radio: () => ({
    disabled: boolean('Disabled', false)
  })
};

storiesOf('Radio', module)
  .add(
    'default',
    () => (
      <Radio
        disabled={boolean('Disabled', false)}
        id="radio1"
        labelText={text('Label', 'Radio Label')}
        name="test"
        value="radio1"
      />
    ),
    {
      info: {
        text: `Description About Radio Component \n

                import { Radio } from '@patron/patron-react/radio';`
      }
    }
  )
  .add(
    'vertical',
    () => (
      <RadioGroup
        orientation="vertical"
        onChange={action('RadioGroup-OnChange')}
        defaultSelected="Radio1"
      >
        <Radio
          {...props.radio()}
          id="radio1"
          name="test"
          value="Radio1"
          labelText={text('Label1', 'Radio Label 1')}
        />
        <Radio
          {...props.radio()}
          id="radio2"
          name="test"
          value="Radio2"
          labelText={text('Label2', 'Radio Label 2')}
        />
        <Radio
          {...props.radio()}
          id="radio3"
          name="test"
          labelText={text('Label3', 'Radio Label 3')}
          value="Radio3"
          disabled
        />
      </RadioGroup>
    ),
    {
      info: {
        text: `Description About Radio Group Component \n
  
        import { Radio , RadioGroup} from '@patron/patron-react/radio';`
      }
    }
  )
  .add(
    'horizontal',
    () => (
      <RadioGroup
        onChange={action('Radio Group OnChange')}
        defaultSelected="Radio1"
      >
        <Radio
          {...props.radio()}
          id="radio1"
          name="test"
          value="Radio1"
          labelText={text('Label1', 'Radio Label 1')}
        />
        <Radio
          {...props.radio()}
          id="radio2"
          name="test"
          value="Radio2"
          labelText={text('Label2', 'Radio Label 2')}
        />
        <Radio
          {...props.radio()}
          id="radio3"
          name="test"
          value="Radio3"
          labelText={text('Label3', 'Radio Label 3')}
          disabled
        />
      </RadioGroup>
    ),
    {
      info: {
        text: `Description About Radio Group Component \n
  
        import { Radio , RadioGroup} from '@patron/patron-react/radio';`
      }
    }
  );
