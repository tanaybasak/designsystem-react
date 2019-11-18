import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
import Tag from './Tag';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary'
};

storiesOf('Tag', module).add(
  'basic',
  () => (
    <Tag
      closable={boolean('Closable', false)}
      disabled={boolean('Disabled', false)}
      onClose={action('OnClose')}
      tabIndex={0}
      thumbnailSrc={text('Thumbnail Src', '')}
      title={text('Title', '')}
      type={select('Type', typeOptions, 'primary')}
    >
      {text('Label', 'Sample Tag')}
    </Tag>
  ),
  {
    info: {
      text: 'Description About Tag Component'
    }
  }
);
