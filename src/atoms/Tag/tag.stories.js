/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Tag from './Tag';
import Icon from '../../atoms/Icon';
//@update-path-build-end
import icons from '../../../.storybook/iconList';
const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary'
};

storiesOf('Components/Tag', module)
  .add(
    'default',
    () => (
      <Tag
        closable={boolean('Closable', false)}
        disabled={boolean('Disabled', false)}
        onClose={action('OnClose')}
        tabIndex={0}
        title={text('Title', '')}
        type={select('Type', typeOptions, 'primary')}
      >
        {text('Label', 'Sample Tag')}
      </Tag>
    ),
    {
      info: {
        text: `Description About Tag Component`,
        document: ['Tag']
      }
    }
  )
  .add(
    'with icon',
    () => (
      <Tag
        closable={boolean('Closable', false)}
        disabled={boolean('Disabled', false)}
        onClose={action('OnClose')}
        tabIndex={0}
        icon={
          <i
            tabIndex="0"
            className={`p-hclsw p-hclsw-${select('Icon Class', icons, 'user')}`}
          />
        }
        title={text('Title', '')}
        type={select('Type', typeOptions, 'primary')}
      >
        {text('Label', 'Sample Tag')}
      </Tag>
    ),
    {
      info: {
        text: `Description About Tag Component`,
        document: ['Tag']
      }
    }
  )
  .add(
    'With Thumbnail Src',
    () => (
      <Tag
        closable={boolean('Closable', false)}
        disabled={boolean('Disabled', false)}
        onClose={action('OnClose')}
        tabIndex={0}
        thumbnail={
          <Icon
            type="img"
            src={text(
              'Thumbnail Source',
              'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'
            )}
            alt="alt"
            title="title"
          />
        }
        title={text('Title', '')}
        type={select('Type', typeOptions, 'primary')}
      >
        {text('Label', 'Sample Tag')}
      </Tag>
    ),
    {
      info: {
        text: `Description About Tag Component`,
        document: ['Tag', 'Icon']
      }
    }
  )
  .add(
    'With Thumbnail Src + icon',
    () => (
      <Tag
        closable={boolean('Closable', false)}
        disabled={boolean('Disabled', false)}
        onClose={action('OnClose')}
        tabIndex={0}
        thumbnail={
          <Icon
            type="img"
            src={text(
              'Thumbnail Source',
              'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'
            )}
            alt="alt"
            title="title"
          />
        }
        icon={
          <i
            tabIndex="0"
            className={`p-hclsw p-hclsw-${select('Icon Class', icons, 'link')}`}
          />
        }
        title={text('Title', '')}
        type={select('Type', typeOptions, 'primary')}
      >
        {text('Label', 'Sample Tag')}
      </Tag>
    ),
    {
      info: {
        text: `Description About Tag Component`,
        document: ['Tag', 'Icon']
      }
    }
  );
