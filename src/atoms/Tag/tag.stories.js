import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Tag from './Tag';
//@update-path-build-end

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary'
};

storiesOf('Tag', module).add(
  'default',
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
      text: `Description About Tag Component

        import { Tag } from 'patron-react/tag'

        `
    }
  }
);