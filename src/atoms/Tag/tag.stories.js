import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Tag from './Tag';
import Icon from '../../atoms/Icon';
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
      thumbnail={
        <Icon className="hcl-tag-thumbnail" type="svg" alt="alt" title="title">
          <circle
            cx="11"
            cy="11"
            r="11"
            stroke="red"
            strokeWidth="3"
            fill="white"
          />
        </Icon>
      }
      title={text("Title", "")}
      type={select("Type", typeOptions, "primary")}
    >
      {text('Label', 'Sample Tag')}
    </Tag>
  ),
  {
    info: {
      text: `Description About Tag Component

        import { Tag } from '@patron/patron-react/tag'

        `
    }
  }
).add(
    'With Thumbnail Src',
    () => (
      <Tag
        closable={boolean('Closable', false)}
        disabled={boolean('Disabled', false)}
        onClose={action('OnClose')}
        tabIndex={0}
        thumbnailSrc={text("Thumbnail Source", "https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png")}
        title={text("Title", "")}
        type={select("Type", typeOptions, "primary")}
      >
        {text('Label', 'Sample Tag')}
      </Tag>
    ),
    {
      info: {
        text: `Description About Tag Component
  
          import { Tag } from '@patron/patron-react/tag'
  
          `
      }
    }
  );
