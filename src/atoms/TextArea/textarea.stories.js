import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import TextArea from './TextArea';
//@update-path-build-end

storiesOf('TextArea', module).add(
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

      import { TextArea } from '@patron/patron-react/textarea'`
    }
  }
);
