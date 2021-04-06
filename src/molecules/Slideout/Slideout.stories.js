import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import icons from '../../../.storybook/iconList';
//@update-path-build-start
import Slideout from './Slideout';
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
      <Slideout
        isOpen={this.state.isOpen}
        header={this.state.header}
        footer={this.state.footer}
        type={this.state.type}
        varient={this.state.varient}
        direction={this.state.direction}
        onClose={this.handleClose.bind(this)}
        onOutsideClick={this.handleOutsideClick.bind(this)}
        actions={this.state.modalActions}
        // onEscClose={false}
      >
        hello
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Sidebar']
      }
    }
  )
  .add(
    'large',
    () => (
      <Slideout
        isOpen={this.state.isOpen}
        header={this.state.header}
        footer={this.state.footer}
        type={this.state.type}
        varient={this.state.varient}
        direction={this.state.direction}
        onClose={this.handleClose.bind(this)}
        onOutsideClick={this.handleOutsideClick.bind(this)}
        actions={this.state.modalActions}
        // onEscClose={false}
      >
        hello
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Sidebar']
      }
    }
  );
