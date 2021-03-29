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

storiesOf('Components/Rich Text Editor', module).add(
  'default',
  () => (
    <RichTextEditor
      value={text('Value', 'Hello World! Patronus Rocks.')}
      config={object('Config Items', config)}
      onChange={action('RTE-Click')}
      visitLinktext={text('VisitLink', 'Visit URL :')}
      linkText={text('URL Text', 'URL :')}
      errorMessage={text('Error message', '')}
    />
  ),
  {
    info: {
      text: `Description About RichTextEditor Component`,
      className: 'hcl-col-12 hcl-col-lg-8',
      document: ['RichTextEditor'],
      install: `npm i quill`
    }
  }
);
