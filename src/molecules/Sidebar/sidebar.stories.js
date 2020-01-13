import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Sidebar from './Sidebar';
import Icon from '../../atoms/Icon';
//@update-path-build-end

const items = [
  {
    childrens: [
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
      <Icon
        alt="alt"
        className="hcl-sidebar-icon"
        onClick={function noRefCheck() {}}
        src={null}
        title="title"
        type="svg"
      >
        <rect
          height="100%"
          rx={3}
          ry={3}
          style={{
            fill: '#fff',
            opacity: 0.5,
            stroke: 'black',
            strokeWidth: 2
          }}
          width="100%"
        />
      </Icon>
    ),
    title: 'Category One'
  },
  {
    childrens: [
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
      <Icon
        alt="alt"
        className="hcl-sidebar-icon"
        onClick={function noRefCheck() {}}
        src={null}
        title="title"
        type="svg"
      >
        <rect
          height="100%"
          rx={3}
          ry={3}
          style={{
            fill: '#fff',
            opacity: 0.5,
            stroke: 'black',
            strokeWidth: 2
          }}
          width="100%"
        />
      </Icon>
    ),
    title: 'Category Two'
  }
];
storiesOf('UI Shell Sidebar', module).add(
  'default',
  () => (
    <Sidebar
      disabled={false}
      icon={
        <Icon
          alt="alt"
          className="hcl-sidebar-title-icon"
          title="title"
          type="svg"
        >
          <circle
            cx="12"
            cy="12"
            fill="var(--white)"
            r="12"
            stroke="var(--blue)"
            strokeWidth="4"
          />
        </Icon>
      }
      items={object('Items', items)}
      onClick={action('Sidebar Click')}
      title={text('Title', 'Default')}
    />
  ),
  {
    info: {
      text: `Description About Sidebar Component
      
      import { Sidebar } from 'patron-react/sidebar'

      `
    }
  }
);
