import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
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

storiesOf('Search', module)
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
        aria-label="Search"
        type="default"
      />
    ),
    {
      info: {
        text: `Description About Search Component \n
        
        import { Search } from '@patron/patron-react/search'

        `
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
        aria-label="Search"
        type="clickable"
      />
    ),
    {
      info: {
        text: `Description About Search Component \n
        
        import { Search } from '@patron/patron-react/search'

        `
      }
    }
  );
