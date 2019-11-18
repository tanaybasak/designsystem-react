import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import List from './List';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const listItems = [
  {
    child: [
      {
        name: 'List Level 1-1',
        value: 'll-1-1'
      },
      {
        name: 'List Level 1-2',
        value: 'll-1-2'
      }
    ],
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    child: [
      {
        name: 'List 2-1',
        value: 'll-2-1'
      },
      {
        name: 'List 2-2',
        value: 'll-2-2'
      }
    ],
    name: 'List 2',
    value: 'll-2'
  },
  {
    child: [
      {
        name: 'List Level 3-1',
        value: 'll-3-1'
      },
      {
        name: 'List Level 3-2',
        value: 'll-3-2'
      }
    ],
    name: 'List Level 3',
    value: 'll-3'
  }
];

const types = { Ordered: 'ol', Unordered: 'ul' };
storiesOf('List', module).add(
  'basic',
  () => (
    <List
      type={select('Type', types, 'ol')}
      listItems={object('List Item', listItems)}
      onClick={action(event)}
    />
  ),
  {
    info: {
      text: 'Description About List Component'
    }
  }
);
