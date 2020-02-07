import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import TextInput from './TextInput';
//@update-path-build-end

const inputTypeOption = {
  text: 'text',
  email: 'email',
  password: 'password',
  search: 'search',
  tel: 'tel',
  url: 'url'
};

storiesOf('TextInput', module).add(
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
      type={select('Type', inputTypeOption, 'text')}
      aria-label="text input"
    />
  ),
  {
    info: {
      text: `Description About TextInput Component \n
      
      import { TextInput } from 'patron-react/textinput'`
    }
  }
);