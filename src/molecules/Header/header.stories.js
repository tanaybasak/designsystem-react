import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import Header from './index';
import Search from '../../atoms/Search';
import Button from '../../atoms/Button';
//@update-path-build-end

storiesOf('Components/Header', module).add(
  'default',
  () => (
    <Header
      icons={[
        {
          icon: (
            <Button type="ghost" small title="setting">
              <i className="p-hclsw p-hclsw-setting" />
            </Button>
          )
        },
        {
          icon: (
            <Button type="ghost" small title="notification">
              <i className="p-hclsw p-hclsw-notification" />
            </Button>
          )
        },
        {
          icon: (
            <Button type="ghost" small title="logout">
              <i className="p-hclsw p-hclsw-logout" />
            </Button>
          )
        }
      ]}
      logo={<img alt="Logo" src={require('../../assets/images/logo.png')} />}
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
          ariaLabel="Header Search"
        />
      }
    />
  ),
  {
    info: {
      text: `Description About Header Component`,
      document: ['Header'],
      internal: ['Search']
    }
  }
);
