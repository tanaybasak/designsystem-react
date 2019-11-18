import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
import TextInput from './TextInput';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const inputTypeOption = {
  text: 'text',
  email: 'email',
  password: 'password',
  search: 'search',
  tel: 'tel',
  url: 'url'
};

storiesOf('TextInput', module).add(
  'basic',
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
    />
  ),
  {
    info: {
      text: 'Description About TextInput Component'
    }
  }
);
