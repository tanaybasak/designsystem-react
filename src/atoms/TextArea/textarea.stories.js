import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import TextArea from './TextArea';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('TextArea', module).add(
  'basic',
  () => (
    <TextArea
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
      text: 'Description About TextArea Component'
    }
  }
);
