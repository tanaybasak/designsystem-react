import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Search from './Search';
//@update-path-build-end

const sizeOption = {
  Default: 'default',
  Small: 'small'
};

const themeOption = {
  Default: 'default',
  White: 'white'
};

storiesOf('Components/Search', module)
  .add(
    'default',
    () => (
      <Search
        iconTheme={select('Icon Theme', themeOption, 'default')}
        onBlur={action('Blur Event')}
        onChange={action('Change Event')}
        placeholder={text('Placeholder', 'Search...')}
        size={select('Size', sizeOption, 'default')}
        theme={select('Theme', themeOption, 'default')}
        disabled={boolean('Disabled', false)}
        ariaLabel="Search"
        type="default"
      />
    ),
    {
      info: {
        text: `Description About Search Component`,
        document: ['Search'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  )
  .add(
    'clickable',
    () => (
      <Search
        iconTheme={select('Icon Theme', themeOption, 'default')}
        onBlur={action('Blur Event')}
        onChange={action('Change Event')}
        placeholder={text('Placeholder', 'Search...')}
        size={select('Size', sizeOption, 'default')}
        theme={select('Theme', themeOption, 'default')}
        disabled={boolean('Disabled', false)}
        ariaLabel="Search"
        type="clickable"
      />
    ),
    {
      info: {
        text: `Description About Search Component`,
        document: ['Search'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  );
