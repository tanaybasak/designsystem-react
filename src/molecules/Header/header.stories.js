import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
/*
 *@ModuleStart
 */
import Header from './Header';
import Search from '../../atoms/Search';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('UI Shell Header', module).add(
  'basic',
  () => (
    <Header
      icons={[
        {
          icon: <span className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span className="hcl-icon-1 bg-white" />
        }
      ]}
      logo={
        <img
          alt="Logo"
          src="https://www.hcl.com/sites/default/files/main-logo-wh.png"
        />
      }
      searchComponent={
        <Search
          className=""
          iconTheme="white"
          onBlur={action('Search OnBlur')}
          onChange={action('Search OnChange')}
          placeholder="Search..."
          size="default"
          theme="default"
          type="clickable"
        />
      }
    />
  ),
  {
    info: {
      text: 'Description About Header Component'
    }
  }
);
