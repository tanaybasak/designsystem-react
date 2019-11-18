import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean, object } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Overflowmenu from './Overflowmenu';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

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
  'basic',
  () => (
    <Overflowmenu
      direction={select('Direction', typeOptions, 'right')}
      ellipsisType={select('ellipsisType', ellipsisType, 'vertical')}
      listItems={object('List Items', listItems)}
      onClick={action('Overflow-Click')}
    />
  ),
  {
    info: {
      text: 'Description About Overflowmenu Component'
    }
  }
);
