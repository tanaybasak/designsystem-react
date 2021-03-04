import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import Header from './index';
import Search from '../../atoms/Search';
//@update-path-build-end

storiesOf('Components/Header', module).add(
  'default',
  () => (
    <Header
      icons={[
        {
          icon: <button className="p-hclsw p-hclsw-setting" title="setting" />
        },
        {
          icon: (
            <button
              className="p-hclsw p-hclsw-notification"
              title="notification"
            />
          )
        },
        {
          icon: <button className="p-hclsw p-hclsw-logout" title="logout" />
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
      text: `Description About Header Component

      import { Header } from '@patron/patron-react/header';
    import { Search } from '@patron/patron-react/search';

      `
    }
  }
);
