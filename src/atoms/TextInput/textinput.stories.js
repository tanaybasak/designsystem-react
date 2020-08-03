import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import TextInput from './TextInput';
//@update-path-build-end

storiesOf('TextInput', module)
  .add(
    'default',
    () => (
      <TextInput
        className=""
        disabled={boolean('Disabled', false)}
        onBlur={action('onBlur')}
        onChange={action('onChange')}
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        placeholder={text('Placeholder', 'Placeholder Text')}
        aria-label="text input"
      />
    ),
    {
      info: {
        text: `Description About TextInput Component \n
      
      import { TextInput } from '@patron/patron-react/textinput';`
      }
    }
  )
  .add(
    'with error',
    () => (
      <div className="hcl-form-group">
        <TextInput
          className=""
          disabled={boolean('Disabled', false)}
          onBlur={action('onBlur')}
          onChange={action('onChange')}
          onClick={action('onClick')}
          onFocus={action('onFocus')}
          placeholder={text('Placeholder', 'Placeholder Text')}
          aria-label="text input"
          data-invalid="true"
        />
        <label className="hcl-label" htmlFor="labeltext">
          Label text
        </label>
        <div className="hcl-error-msg">Validation message here</div>
      </div>
    ),
    {
      info: {
        text: `Description About TextInput Component \n
        
        import { TextInput } from '@patron/patron-react/textinput';`
      }
    }
  )
  .add(
    'with helpertext',
    () => (
      <div className="hcl-form-group">
        <TextInput
          className=""
          disabled={boolean('Disabled', false)}
          onBlur={action('onBlur')}
          onChange={action('onChange')}
          onClick={action('onClick')}
          onFocus={action('onFocus')}
          placeholder={text('Placeholder', 'Placeholder Text')}
          aria-label="text input"
        />
        <label className="hcl-label" htmlFor="labeltext">
          Label text
        </label>
        <div className="hcl-helper-text">Optional Helper text goes here</div>
      </div>
    ),
    {
      info: {
        text: `Description About TextInput Component \n
        
        import { TextInput } from '@patron/patron-react/textinput';`
      }
    }
  );
