import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import Header from './index';
import Search from '../../atoms/Search';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('UI Shell Header', module).add(
  'basic',
  () => (
    <Header
      icons={[
        {
          icon: <span tabIndex="0" className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span tabIndex="0" className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span tabIndex="0" className="hcl-icon-1 bg-white" />
        },
        {
          icon: <span tabIndex="0" className="hcl-icon-1 bg-white" />
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
          tabIndex="0"
        />
      }
    />
  ),
  {
    info: {
      text: `Description About Header Component
      
      import { Header } from 'patron-react/header'

      `
    }
  }
);
