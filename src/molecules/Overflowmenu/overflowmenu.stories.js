import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Overflowmenu from './Overflowmenu';
import Button from '../../atoms/Button';
import MenuItem from './MenuItem';
//@update-path-build-end

const typeOptions = {
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
  'top-left': 'top-left',
  'top-right': 'top-right'
};

const ellipsisType = {
  Vertical: 'vertical',
  Horizontal: 'horizontal'
};

const listItems = [
  {
    name: 'option 1',
    icon: 'pi pi-View'
  },
  {
    danger: true,
    name: 'option 2',
    icon: 'pi pi-View'
  },
  {
    name: 'option 3',
    separator: true,
    icon: 'pi pi-View'
  },
  {
    disabled: true,
    name: 'option 4',
    icon: 'pi pi-View'
  },
  {
    link: 'https://google.com',
    name: 'option 5',
    icon: 'pi pi-View'
  }
];

storiesOf('OverflowMenu', module)
  .add(
    'default',
    () => (
      <Overflowmenu
        direction={select('Direction', typeOptions, 'bottom-left')}
        ellipsisType={select('Ellipsis Type', ellipsisType, 'vertical')}
        listItems={object('List Items', listItems)}
        onClick={action('Overflow-Click')}
      />
    ),
    {
      info: {
        text: `Description About Overflowmenu Component \n
      import { Overflowmenu } from '@patron/patron-react/overflowmenu';`
      }
    }
  )
  .add(
    'with icon',
    () => (
      <Overflowmenu
        direction={select('Direction', typeOptions, 'bottom-left')}
        onClick={action('Overflow-Click')}
        attachElementToBody
        scrollListner
      >
        {listItems.map((menu, index) => {
          return (
            <MenuItem item={menu} key={`menu${index}`}>
              <i className={menu.icon} />
              {menu.name}
            </MenuItem>
          );
        })}
      </Overflowmenu>
    ),
    {
      info: {
        text: `Description About Overflowmenu Component \n
    import { Overflowmenu } from '@patron/patron-react/overflowmenu';
    import { Button } from '@patron/patron-react/button';`
      }
    }
  )
  .add(
    'custom',
    () => (
      <Overflowmenu
        direction={select('Direction', typeOptions, 'bottom-left')}
        listItems={object('List Items', listItems)}
        onClick={action('Overflow-Click')}
        customTemplate={<button>overflow button</button>}
      />
    ),
    {
      info: {
        text: `Description About Overflowmenu Component \n
    import { Overflowmenu } from '@patron/patron-react/overflowmenu';
    import { Button } from '@patron/patron-react/button';`
      }
    }
  );
