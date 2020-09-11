import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import icons from '../../../.storybook/iconList';
//@update-path-build-start
import Sidebar from './Sidebar';
import Icon from '../../atoms/Icon';
//@update-path-build-end

const items = [
  {
    children: [
      {
        href: '#',
        title: 'Child Item 1'
      },
      {
        href: '#',
        title: 'Child Item 2'
      },
      {
        href: '#',
        title: 'Child Item 3'
      },
      {
        href: '#',
        title: 'Child Item 4'
      }
    ],
    icon: (
      <i  className={`p-hclsw p-hclsw-${icons[2]}`} />
    ),
    title: 'Category One'
  },
  {
    children: [
      {
        href: '#',
        title: 'Child Item 1'
      },
      {
        href: '#',
        title: 'Child Item 2'
      },
      {
        href: '#',
        title: 'Child Item 3'
      },
      {
        href: '#',
        title: 'Child Item 4'
      }
    ],
    icon: (
      // <Icon type={'svg'} alt={'alt'} title={'title'}>
      //   <rect
      //     rx={3}
      //     ry={3}
      //     width={'100%'}
      //     height={'100%'}
      //     style={{
      //       fill: '#fff',
      //       stroke: 'black',
      //       strokeWidth: 2,
      //       opacity: 0.5
      //     }}
      //   />
      // </Icon>
      <i  className={`p-hclsw p-hclsw-${icons[1]}`} />

    ),
    title: 'Category Two'
  }
];

storiesOf('Sidebar', module).add(
  'default',
  () => (
    <Sidebar
      title={text('Title', 'Default')}
      icon={
        <i
          // style={{ color: 'white' }}
          className={`p-hclsw p-hclsw-${select('Title Icon', icons, 'user')}`}
        />
      }
      expanded={boolean('Expanded', true)}
      items={items}
      onClick={action('link clicked')}
      toggleSidebar={action('Toggle Sidebar')}
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
