import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Overflowmenu from './Overflowmenu';
import MenuItem from './MenuItem';
//@update-path-build-end

const ellipsisType = {
  Vertical: 'vertical',
  Horizontal: 'horizontal'
};
const listItems = [
  {
    name: 'Add',
    icon: 'p-hclsw p-hclsw-add-component'
  },
  {
    danger: true,
    name: 'Delete',
    icon: 'p-hclsw p-hclsw-delete'
  },
  {
    name: 'Copy',
    separator: true,
    icon: 'p-hclsw p-hclsw-copy'
  },
  {
    disabled: true,
    name: 'Paste',
    icon: 'p-hclsw p-hclsw-paste'
  },
  {
    link: 'https://google.com',
    name: 'link',
    icon: 'p-hclsw p-hclsw-link'
  }
];

storiesOf('Components/OverflowMenu', module)
  .add(
    'default',
    () => (
      <Overflowmenu
        ellipsisType={select('Ellipsis Type', ellipsisType, 'vertical')}
        listItems={object('List Items', listItems)}
        onClick={action('Overflow-Click')}
      />
    ),
    {
      info: {
        text: `Description About Overflowmenu Component`,
        document: ['Overflowmenu']
      }
    }
  )
  .add(
    'with custom icon',
    () => (
      <Overflowmenu
        onClick={action('Overflow-Click')}
        customIcon={<i className="p-hclsw p-hclsw-menu" />}
        attachElementToBody
        scrollListner
      >
        {listItems.map((menu, index) => {
          return (
            <MenuItem
              item={menu}
              key={`menu${index}`}
              danger={menu.danger}
              separator={menu.separator}
              disabled={menu.disabled}
              link={menu.link}
            >
              <i
                className={menu.icon}
                style={{
                  display: 'inline-block',
                  paddingRight: '.5rem',
                  verticalAlign: 'middle'
                }}
              />
              {menu.name}
            </MenuItem>
          );
        })}
      </Overflowmenu>
    ),
    {
      info: {
        text: `Description About Overflowmenu Component`,
        document: ['Overflowmenu', 'MenuItem']
      }
    }
  )
  .add(
    'custom template',
    () => (
      <Overflowmenu
        listItems={object('List Items', listItems)}
        onClick={action('Overflow-Click')}
        customTemplate={
          <button className="hcl-btn hcl-primary">overflow button</button>
        }
      />
    ),
    {
      info: {
        text: `Description About Overflowmenu Component`,
        document: ['Overflowmenu']
      }
    }
  );
