import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import RichTextEditor from './RichTextEditor';
//@update-path-build-end

const config = [
  { type: 'bold' },
  { type: 'underline' },
  { type: 'italic' },
  { type: 'bulletlist' },
  { type: 'numberlist' },
  { type: 'link' }
];

storiesOf('RichTextEditor', module).add(
  'default',
  () => (
    <RichTextEditor
      value={text('Value', 'Hello World! PrimeReact Editor Rocks.')}
      config={object('Config Items', config)}
      onChange={action('Overflow-Click')}
    />
  ),
  {
    info: {
      text: `Description About RichTextEditor Component \n
      import { RichTextEditor } from '@patron/patron-react/richtexteditor';`
    }
  }
);
