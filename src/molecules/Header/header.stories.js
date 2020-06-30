import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import Header from './index';
import Search from '../../atoms/Search';
//@update-path-build-end

storiesOf('Header', module).add(
  'default',
  () => (
    <Header
      icons={[
        {
          icon: <button className="pi pi-settings" />
        },
        {
          icon: <button className="pi pi-new-relases" />
        },
        {
          icon: <button className="pi pi-logout" />
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

      import { Header } from '@patron/patron-react/header';
    import { Search } from '@patron/patron-react/search';

      `
    }
  }
);
