import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
//@update-path-build-start
import InlineEdit from './InlineEdit';
//@update-path-build-end

storiesOf('InlineEdit', module).add(
  'default',
  () => (
    <InlineEdit
      value={text('Value', 'Content')}
      onTextUpdate={action('Inline-TextUpdate')}
      formStatus={boolean('formStatus', false)}
      errorMessage={text('Error message', '')}
      onClose={action('Inline-Close')}
    />
  ),
  {
    info: {
      text: `Description About InlineEdit Component \n 

      import { InlineEdit } from '@patron/patron-react/InlineEdit';`
    }
  }
);
