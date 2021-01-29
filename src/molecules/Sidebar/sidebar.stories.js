import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import icons from '../../../.storybook/iconList';
//@update-path-build-start
import Sidebar from './Sidebar';
//@update-path-build-end

const items = [
  {
    // children: [
    //   {
    //     href: '#1',
    //     title: 'Child Item 1'
    //   },
    //   {
    //     href: '#2',
    //     title: 'Child Item 2'
    //   },
    //   {
    //     href: '#3',
    //     title: 'Child Item 3'
    //   },
    //   {
    //     href: '#4',
    //     title: 'Child Item 4'
    //   }
    // ],
    icon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category One'
  },
  {
    children: [
      {
        href: '#5',
        title: 'Child Item 1'
      },
      {
        href: '#6',
        title: 'Child Item 2'
      },
      {
        href: '#7',
        title: 'Child Item 3'
      },
      {
        href: '#9',
        title: 'Child Item 4'
      }
    ],
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    title: 'Category Two'
  },
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    title: 'Category Three',
    href: '#10'
  }
];

const positionOptions = {
  top: 'top',
  bottom: 'bottom'
};

const headerBranding = {
  default: 'default',
  primary: 'primary'
};

const typeOptions = {
  internal: 'internal',
  default: 'default'
};

storiesOf('Sidebar', module).add(
  'default',
  () => (
    <Sidebar
      title={text('Title', 'Default')}
      icon={
        <i
          className={`p-hclsw p-hclsw-${select('Title Icon', icons, 'user')}`}
        />
      }
      expanded={boolean('Expanded', true)}
      items={items}
      headerVisible={boolean('headerVisible', true)}
      headerPosition={select('headerPosition', positionOptions, 'bottom')}
      headerBranding={select('headerBranding', headerBranding, 'default')}
      onClick={action('link clicked')}
      toggleSidebar={action('Toggle Sidebar')}
      type={select('type', typeOptions, 'default')}
    />
  ),
  {
    info: {
      text: `Description About Sidebar Component

      import { Sidebar } from '@patron/patron-react/sidebar';
    import { Icon } from '@patron/patron-react/icon';

      `
    }
  }
);
