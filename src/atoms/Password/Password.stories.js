import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Password from './Password';
//@update-path-build-end

storiesOf('Components/Password', module)
  .add(
    'default',
    () => (
      <div className="hcl-form-group">
        <Password
          className=""
          disabled={boolean('Disabled', false)}
          onBlur={action('onBlur')}
          onChange={action('onChange')}
          onClick={action('onClick')}
          onFocus={action('onFocus')}
          placeholder={text('Placeholder', 'Placeholder Text')}
          aria-label="text input"
        />
      </div>
    ),
    {
      info: {
        text: `Description About Password Component`,
        document: ['Password'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  )
  .add(
    'with error',
    () => (
      <div className="hcl-form-group">
        <Password
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
        text: `Description About Password Component`,
        document: ['Password'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  )
  .add(
    'with helpertext',
    () => (
      <div className="hcl-form-group">
        <Password
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
        text: `Description About Password Component`,
        document: ['Password'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  );
