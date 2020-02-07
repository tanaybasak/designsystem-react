import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Overflowmenu from './Overflowmenu';
//@update-path-build-end

const typeOptions = {
  left: 'left',
  right: 'right'
};

const ellipsisType = {
  Vertical: 'vertical',
  Horizontal: 'horizontal'
};

const listItems = [
  {
    name: 'option 1'
  },
  {
    danger: true,
    name: 'option 2'
  },
  {
    name: 'option 3',
    separator: true
  },
  {
    disabled: true,
    name: 'option 4'
  },
  {
    link: 'https://google.com',
    name: 'option 5'
  }
];

storiesOf('Overflowmenu', module).add(
  'default',
  () => (
    <Overflowmenu
      direction={select('Direction', typeOptions, 'left')}
      ellipsisType={select('Ellipsis Type', ellipsisType, 'vertical')}
      listItems={object('List Items', listItems)}
      onClick={action('Overflow-Click')}
      aria-label
    />
  ),
  {
    info: {
      text: `Description About Overflowmenu Component \n
      import { Overflowmenu } from 'patron-react/overflowmenu'`
    }
  }
);
