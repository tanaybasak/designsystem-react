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
    children: [
      {
        href: '#1',
        title: 'Child Item 1'
      },
      {
        href: '#2',
        title: 'Child Item 2'
      },
      {
        href: '#3',
        title: 'Child Item 3'
      },
      {
        href: '#4',
        title: 'Child Item 4'
      }
    ],
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

const disabledItems = [
  {
    children: [
      {
        href: '#1',
        title: 'Child Item 1'
      },
      {
        href: '#2',
        title: 'Child Item 2'
      },
      {
        href: '#3',
        title: 'Child Item 3'
      },
      {
        href: '#4',
        title: 'Child Item 4'
      }
    ],
    icon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category One',
    disabled: true
  },
  {
    children: [
      {
        href: '#5',
        title: 'Child Item 1'
      },
      {
        href: '#6',
        title: 'Child Item 2',
        disabled: true
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

const internalitems = [
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category One'
  },
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category Two'
  },
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category Three',
    href: '#10'
  }
];

const internalActivetems = [
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category One',
    active: true
  },
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
    title: 'Category Two'
  },
  {
    icon: <i className={`p-hclsw p-hclsw-${icons[1]}`} />,
    statusIcon: <i className={`p-hclsw p-hclsw-${icons[2]}`} />,
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

storiesOf('Components/Sidebar', module)
  .add(
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
        responsive={boolean('responsive', true)}
      />
    ),
    {
      info: {
        text: `Description About Sidebar Component`,
        document: ['Sidebar']
      }
    }
  )
  .add(
    'default-nonresponsive',
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
        responsive={boolean('responsive', false)}
        headerPosition={select('headerPosition', positionOptions, 'top')}
        headerBranding={select('headerBranding', headerBranding, 'default')}
        headerVisible={boolean('headerVisible', true)}
      />
    ),
    {
      info: {
        text: `Description About Sidebar Component`,
        document: ['Sidebar']
      }
    }
  )
  .add(
    'internal',
    () => (
      <Sidebar
        title={text('Title', 'Default')}
        icon={
          boolean('Show Header Icon', true) ? (
            <i
              className={`p-hclsw p-hclsw-${select(
                'Title Icon',
                icons,
                'user'
              )}`}
            />
          ) : null
        }
        expanded={boolean('Expanded', true)}
        items={internalitems}
        headerVisible={boolean('headerVisible', true)}
        headerPosition={select('headerPosition', positionOptions, 'top')}
        headerBranding={select('headerBranding', headerBranding, 'primary')}
        onClick={action('link clicked')}
        toggleSidebar={action('Toggle Sidebar')}
        type={select('type', typeOptions, 'internal')}
        responsive={boolean('responsive', true)}
      />
    ),
    {
      info: {
        text: `Description About Sidebar Component`,
        document: ['Sidebar']
      }
    }
  )
  .add(
    'internal-active',
    () => (
      <Sidebar
        title={text('Title', 'Default')}
        icon={
          boolean('Show Header Icon', true) ? (
            <i
              className={`p-hclsw p-hclsw-${select(
                'Title Icon',
                icons,
                'user'
              )}`}
            />
          ) : null
        }
        expanded={boolean('Expanded', true)}
        items={internalActivetems}
        headerVisible={boolean('headerVisible', true)}
        headerPosition={select('headerPosition', positionOptions, 'top')}
        headerBranding={select('headerBranding', headerBranding, 'primary')}
        onClick={action('link clicked')}
        toggleSidebar={action('Toggle Sidebar')}
        type={select('type', typeOptions, 'internal')}
        responsive={boolean('responsive', true)}
      />
    ),
    {
      info: {
        text: `Description About Sidebar Component`,
        document: ['Sidebar']
      }
    }
  )
  .add(
    'disable-sidebar',
    () => (
      <Sidebar
        title={text('Title', 'Default')}
        icon={
          boolean('Show Header Icon', true) ? (
            <i
              className={`p-hclsw p-hclsw-${select(
                'Title Icon',
                icons,
                'user'
              )}`}
            />
          ) : null
        }
        expanded={boolean('Expanded', true)}
        items={disabledItems}
        headerVisible={boolean('headerVisible', true)}
        headerPosition={select('headerPosition', positionOptions, 'top')}
        headerBranding={select('headerBranding', headerBranding, 'primary')}
        onClick={action('link clicked')}
        toggleSidebar={action('Toggle Sidebar')}
        type={select('type', typeOptions, 'internal')}
        responsive={boolean('responsive', true)}
      />
    ),
    {
      info: {
        text: `Description About Sidebar Component`,
        document: ['Sidebar']
      }
    }
  );
