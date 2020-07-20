import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import TextArea from './TextArea';
//@update-path-build-end

storiesOf('TextArea', module)
  .add(
    'default',
    () => (
      <TextArea
        aria-label="comments"
        disabled={boolean('Disabled', false)}
        onBlur={action('onBlur')}
        onChange={action('onChange')}
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        placeholder={text('Placeholder', 'Placeholder Text')}
      />
    ),
    {
      info: {
        text: `Description About TextArea Component \n

      import { TextArea } from '@patron/patron-react/textarea';`
      }
    }
  )
  .add(
    'with error',
    () => (
      <div className="hcl-form-group">
        <TextArea
          aria-label="comments"
          data-invalid="true"
          disabled={boolean('Disabled', false)}
          onBlur={action('onBlur')}
          onChange={action('onChange')}
          onClick={action('onClick')}
          onFocus={action('onFocus')}
          placeholder={text('Placeholder', 'Placeholder Text')}
        />
        <label className="hcl-label" htmlFor="labeltext">
          Label text
        </label>
        <div className="hcl-error-msg">Validation message here</div>
      </div>
    ),
    {
      info: {
        text: `Description About TextArea Component \n
  
        import { TextArea } from '@patron/patron-react/textarea';`
      }
    }
  )
  .add(
    'with helpertext',
    () => (
      <div className="hcl-form-group">
        <TextArea
          aria-label="comments"
          disabled={boolean('Disabled', false)}
          onBlur={action('onBlur')}
          onChange={action('onChange')}
          onClick={action('onClick')}
          onFocus={action('onFocus')}
          placeholder={text('Placeholder', 'Placeholder Text')}
        />
        <label className="hcl-label" htmlFor="labeltext">
          Label text
        </label>
        <div className="hcl-helper-text">Optional Helper text goes here</div>
      </div>
    ),
    {
      info: {
        text: `Description About TextArea Component \n
  
        import { TextArea } from '@patron/patron-react/textarea';`
      }
    }
  );
